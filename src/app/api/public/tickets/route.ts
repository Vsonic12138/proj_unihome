import { tryGetPayloadClient } from "@/lib/payload";
import { getClientIpFromHeaders } from "@/lib/tickets/clientIp";
import { notifyTicketSubmitted, describeNotificationConfigForLogs } from "@/lib/tickets/notification";
import { checkTicketSpam, type SpamCheckResult } from "@/lib/tickets/spamProtection";
import { verifyTurnstileToken, type TurnstileFailure } from "@/lib/tickets/turnstile";
import crypto from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ErrorPayload = {
  ok: false;
  requestId: string;
  code: string;
  error: string;
  details?: string[];
};

function jsonError(payload: ErrorPayload, status: number, headers?: Record<string, string>) {
  return NextResponse.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

export async function POST(req: Request) {
  const requestId = crypto.randomUUID();
  const ip = getClientIpFromHeaders(req.headers);
  const userAgent = req.headers.get("user-agent");

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return jsonError(
        {
          ok: false,
          requestId,
          code: "invalid_json_body",
          error: "Invalid JSON body.",
        },
        400,
      );
    }

    const name = String((body as any).name ?? "").trim();
    const emailRaw = (body as any).email;
    const email = emailRaw ? String(emailRaw).trim() : null;
    const phone = String((body as any).phone ?? "").trim();
    const intention = String((body as any).intention ?? "").trim();
    const messageRaw = (body as any).message;
    const message = messageRaw ? String(messageRaw).trim() : null;
    const captchaTokenRaw = (body as any).captchaToken;
    const captchaToken = captchaTokenRaw ? String(captchaTokenRaw).trim() : null;

    // Anti-spam fields (optional)
    const website = (body as any).website ? String((body as any).website) : null;
    const formStartedAt =
      typeof (body as any).formStartedAt === "number" ? Number((body as any).formStartedAt) : null;

    if (!name || !phone || !intention) {
      return jsonError(
        {
          ok: false,
          requestId,
          code: "missing_required_fields",
          error: "Missing required fields: name, phone, intention.",
        },
        400,
      );
    }

    const captcha = await verifyTurnstileToken({ token: captchaToken, ip });
    if (!captcha.ok) {
      const captchaFailure = captcha as TurnstileFailure;
      return jsonError(
        {
          ok: false,
          requestId,
          code: captchaFailure.code,
          error: captchaFailure.error,
          details: captchaFailure.details,
        },
        captchaFailure.status,
      );
    }

    const spam = checkTicketSpam({
      ip,
      userAgent,
      payload: { name, email, phone, intention, message },
      honeypotValue: website,
      formStartedAt,
    });

    if (!spam.ok) {
      const spamFailure = spam as Extract<SpamCheckResult, { ok: false }>;
      // Honeypot returns 200: accept silently.
      const headers: Record<string, string> = { "Cache-Control": "no-store" };
      if (spamFailure.status === 429 && spamFailure.retryAfterSeconds) {
        headers["Retry-After"] = String(spamFailure.retryAfterSeconds);
      }

      return NextResponse.json(
        {
          ok: spamFailure.status === 200,
          requestId,
          code:
            spamFailure.code === "duplicate"
              ? "duplicate_submission"
              : spamFailure.code === "rate_limited"
                ? "rate_limited"
                : spamFailure.code === "too_fast"
                  ? "suspected_bot_submission"
                  : spamFailure.code === "invalid_started_at"
                    ? "invalid_submission_timing"
                    : "honeypot_blocked",
          error: spamFailure.message,
        },
        { status: spamFailure.status, headers },
      );
    }

    const payload = await tryGetPayloadClient();
    if (!payload) {
      return jsonError(
        {
          ok: false,
          requestId,
          code: "payload_not_configured",
          error:
            "Ticket submission is not available because Payload is not configured. Please set PAYLOAD_SECRET and DATABASE_URI (or DATABASE_URL).",
        },
        500,
      );
    }

    const created = await payload.create({
      collection: "tickets",
      data: {
        name,
        email: email || undefined,
        phone,
        intention,
        message: message || undefined,
      },
      overrideAccess: true,
    });

    // Fire-and-forget email notification (do not block user on mail failures).
    const notification = await notifyTicketSubmitted({
      ticketId: created.id,
      name,
      email,
      phone,
      intention,
      message,
      ip,
      userAgent,
      requestId,
    });

    if (!notification.sent) {
      const notificationFailure = notification as Extract<typeof notification, { sent: false }>;
      // eslint-disable-next-line no-console
      console.error("[tickets] Notification failed:", {
        requestId,
        ticketId: created.id,
        ip,
        userAgent,
        provider: notificationFailure.provider,
        error: notificationFailure.error,
        config: describeNotificationConfigForLogs(),
      });
    }

    return NextResponse.json(
      {
        ok: true,
        requestId,
        ticketId: created.id,
        emailSent: notification.sent,
      },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error("[tickets] Submission error:", {
      requestId,
      ip,
      userAgent,
      message: error?.message ?? String(error),
      stack: error?.stack,
    });

    return jsonError(
      {
        ok: false,
        requestId,
        code: "unexpected_server_error",
        error: "Unexpected server error. Please contact support with the requestId.",
      },
      500,
    );
  }
}
