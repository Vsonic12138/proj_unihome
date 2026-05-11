import "server-only";

import nodemailer from "nodemailer";
import { buildTicketNotificationEmail } from "@/lib/tickets/notificationTemplate";

type TicketNotificationArgs = {
  ticketId: string | number;
  name: string;
  email?: string | null;
  phone: string;
  intention: string;
  message?: string | null;
  ip: string;
  userAgent: string | null;
  requestId: string;
};

type NotificationResult =
  | { sent: true; provider: "webhook" | "smtp" | "resend" }
  | { sent: false; provider: "none" | "webhook" | "smtp" | "resend"; error: string };

function getReplyTo(email?: string | null) {
  if (!email) return undefined;
  const trimmedEmail = email.trim();
  return trimmedEmail.length > 0 ? trimmedEmail : undefined;
}

function redact(value: string) {
  if (!value) return value;
  if (value.length <= 6) return "***";
  return `${value.slice(0, 3)}***${value.slice(-3)}`;
}

async function sendViaWebhook(args: TicketNotificationArgs): Promise<NotificationResult> {
  const url = process.env.TICKET_EMAIL_WEBHOOK_URL;
  if (!url) return { sent: false, provider: "none", error: "TICKET_EMAIL_WEBHOOK_URL is not configured." };

  try {
    const secret = process.env.TICKET_EMAIL_WEBHOOK_SECRET ?? "";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(secret ? { Authorization: `Bearer ${secret}` } : {}),
      },
      body: JSON.stringify({
        type: "ticket.submitted",
        requestId: args.requestId,
        ticketId: args.ticketId,
        replyTo: getReplyTo(args.email) ?? null,
        payload: {
          name: args.name,
          email: args.email ?? null,
          phone: args.phone,
          intention: args.intention,
          message: args.message ?? null,
          ip: args.ip,
          userAgent: args.userAgent ?? null,
        },
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return {
        sent: false,
        provider: "webhook",
        error: `Webhook request failed (status ${res.status}). ${text ? `Body: ${text.slice(0, 200)}` : ""}`.trim(),
      };
    }

    return { sent: true, provider: "webhook" };
  } catch (error: any) {
    return { sent: false, provider: "webhook", error: `Webhook request error: ${error?.message ?? String(error)}` };
  }
}

async function sendViaResend(args: TicketNotificationArgs): Promise<NotificationResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.TICKET_EMAIL_TO;
  const from = process.env.TICKET_EMAIL_FROM;
  if (!apiKey) return { sent: false, provider: "none", error: "RESEND_API_KEY is not configured." };
  if (!to || !from) {
    return {
      sent: false,
      provider: "resend",
      error: "TICKET_EMAIL_TO or TICKET_EMAIL_FROM is not configured.",
    };
  }

  try {
    const email = buildTicketNotificationEmail(args);
    const replyTo = getReplyTo(args.email);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: email.subject,
        text: email.text,
        html: email.html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return {
        sent: false,
        provider: "resend",
        error: `Resend request failed (status ${res.status}). ${text ? `Body: ${text.slice(0, 200)}` : ""}`.trim(),
      };
    }

    return { sent: true, provider: "resend" };
  } catch (error: any) {
    return { sent: false, provider: "resend", error: `Resend request error: ${error?.message ?? String(error)}` };
  }
}

async function sendViaSmtp(args: TicketNotificationArgs): Promise<NotificationResult> {
  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim();
  const from = process.env.TICKET_EMAIL_FROM?.trim();
  const to = process.env.TICKET_EMAIL_TO?.trim();

  if (!host) return { sent: false, provider: "none", error: "SMTP_HOST is not configured." };
  if (!portRaw) return { sent: false, provider: "smtp", error: "SMTP_PORT is not configured." };
  if (!from || !to) {
    return {
      sent: false,
      provider: "smtp",
      error: "TICKET_EMAIL_TO or TICKET_EMAIL_FROM is not configured.",
    };
  }

  const port = Number(portRaw);
  if (!Number.isFinite(port) || port <= 0) {
    return {
      sent: false,
      provider: "smtp",
      error: `Invalid SMTP_PORT value: ${portRaw}.`,
    };
  }

  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const replyTo = getReplyTo(args.email);

  try {
    const email = buildTicketNotificationEmail(args);
    const transport = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: user || pass ? { user, pass } : undefined,
    });

    await transport.sendMail({
      from,
      to,
      subject: email.subject,
      text: email.text,
      html: email.html,
      ...(replyTo ? { replyTo } : {}),
    });

    return { sent: true, provider: "smtp" };
  } catch (error: any) {
    return { sent: false, provider: "smtp", error: `SMTP send error: ${error?.message ?? String(error)}` };
  }
}

export async function notifyTicketSubmitted(args: TicketNotificationArgs): Promise<NotificationResult> {
  // Priority: webhook first (internal relay), then Resend.
  const webhookUrl = process.env.TICKET_EMAIL_WEBHOOK_URL;
  if (webhookUrl) {
    return await sendViaWebhook(args);
  }

  if (process.env.SMTP_HOST) {
    return await sendViaSmtp(args);
  }

  if (process.env.RESEND_API_KEY) {
    return await sendViaResend(args);
  }

  return {
    sent: false,
    provider: "none",
    error:
      "No email provider configured. Set TICKET_EMAIL_WEBHOOK_URL, or SMTP_HOST + SMTP_PORT + TICKET_EMAIL_TO + TICKET_EMAIL_FROM, or RESEND_API_KEY + TICKET_EMAIL_TO + TICKET_EMAIL_FROM.",
  };
}

export function describeNotificationConfigForLogs() {
  const hasWebhook = Boolean(process.env.TICKET_EMAIL_WEBHOOK_URL);
  const hasSmtp = Boolean(process.env.SMTP_HOST);
  const hasResend = Boolean(process.env.RESEND_API_KEY);

  return {
    hasWebhook,
    hasSmtp,
    hasResend,
    webhookUrl: process.env.TICKET_EMAIL_WEBHOOK_URL ? redact(process.env.TICKET_EMAIL_WEBHOOK_URL) : null,
    smtpHost: process.env.SMTP_HOST ? redact(process.env.SMTP_HOST) : null,
    smtpPort: process.env.SMTP_PORT ?? null,
    hasTicketEmailTo: Boolean(process.env.TICKET_EMAIL_TO),
    hasTicketEmailFrom: Boolean(process.env.TICKET_EMAIL_FROM),
  };
}
