import "server-only";

import crypto from "crypto";

type TicketPayload = {
  name: string;
  email?: string | null;
  phone: string;
  intention: string;
  message?: string | null;
};

type SpamCheckInput = {
  ip: string;
  userAgent: string | null;
  payload: TicketPayload;
  honeypotValue: string | null;
  formStartedAt: number | null;
  now?: number;
};

type SpamCheckResult =
  | { ok: true; dedupeKey: string }
  | {
      ok: false;
      status: 200 | 400 | 409 | 429;
      code:
        | "honeypot"
        | "too_fast"
        | "invalid_started_at"
        | "rate_limited"
        | "duplicate";
      message: string;
      retryAfterSeconds?: number;
      dedupeKey?: string;
    };

type TokenCheckResult = { ok: true } | { ok: false; retryAfterSeconds: number };

type Bucket = { count: number; resetAt: number };

const WINDOW_10_MIN_MS = 10 * 60 * 1000;
const WINDOW_24_H_MS = 24 * 60 * 60 * 1000;
const MIN_FORM_FILL_MS = 1200;
const CLEANUP_INTERVAL_MS = 60 * 1000;

// In-memory state: best-effort only (per instance).
const buckets10m = new Map<string, Bucket>();
const buckets24h = new Map<string, Bucket>();
const recentDedupe = new Map<string, number>(); // key -> expiresAt
let lastCleanupAt = 0;

function cleanup(now: number) {
  if (now - lastCleanupAt < CLEANUP_INTERVAL_MS) return;
  lastCleanupAt = now;

  for (const [key, bucket] of buckets10m) {
    if (bucket.resetAt <= now) buckets10m.delete(key);
  }
  for (const [key, bucket] of buckets24h) {
    if (bucket.resetAt <= now) buckets24h.delete(key);
  }
  for (const [key, expiresAt] of recentDedupe) {
    if (expiresAt <= now) recentDedupe.delete(key);
  }
}

function takeToken(args: {
  map: Map<string, Bucket>;
  key: string;
  windowMs: number;
  limit: number;
  now: number;
}): TokenCheckResult {
  const { map, key, windowMs, limit, now } = args;
  const existing = map.get(key);

  if (!existing || existing.resetAt <= now) {
    map.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (existing.count >= limit) {
    return { ok: false, retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)) };
  }

  existing.count += 1;
  return { ok: true };
}

function normalizeForHash(value: unknown): string {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

export function checkTicketSpam(input: SpamCheckInput): SpamCheckResult {
  const now = input.now ?? Date.now();
  cleanup(now);

  // Honeypot: if filled, treat as "ok" and do nothing (bots won't learn).
  if (input.honeypotValue && input.honeypotValue.trim().length > 0) {
    return {
      ok: false,
      status: 200,
      code: "honeypot",
      message: "Ignored by anti-spam honeypot.",
    };
  }

  // Timing heuristic: form must take at least MIN_FORM_FILL_MS.
  if (typeof input.formStartedAt === "number") {
    if (!Number.isFinite(input.formStartedAt) || input.formStartedAt <= 0) {
      return {
        ok: false,
        status: 400,
        code: "invalid_started_at",
        message: "Invalid formStartedAt value.",
      };
    }

    const elapsed = now - input.formStartedAt;
    if (elapsed >= 0 && elapsed < MIN_FORM_FILL_MS) {
      return {
        ok: false,
        status: 429,
        code: "too_fast",
        message: "Submission rejected: too fast (suspected bot).",
        retryAfterSeconds: 10,
      };
    }
  }

  const key10m = `tickets:10m:${input.ip}`;
  const key24h = `tickets:24h:${input.ip}`;

  const limit10m = takeToken({
    map: buckets10m,
    key: key10m,
    windowMs: WINDOW_10_MIN_MS,
    limit: 5,
    now,
  });
  if (!limit10m.ok) {
    const rateLimit10m = limit10m as Extract<TokenCheckResult, { ok: false }>;
    return {
      ok: false,
      status: 429,
      code: "rate_limited",
      message: "Too many ticket submissions from this IP. Please try again later.",
      retryAfterSeconds: rateLimit10m.retryAfterSeconds,
    };
  }

  const limit24h = takeToken({
    map: buckets24h,
    key: key24h,
    windowMs: WINDOW_24_H_MS,
    limit: 30,
    now,
  });
  if (!limit24h.ok) {
    const rateLimit24h = limit24h as Extract<TokenCheckResult, { ok: false }>;
    return {
      ok: false,
      status: 429,
      code: "rate_limited",
      message: "Daily ticket submission limit reached. Please try again tomorrow.",
      retryAfterSeconds: rateLimit24h.retryAfterSeconds,
    };
  }

  const fingerprintSource = [
    input.ip,
    normalizeForHash(input.userAgent),
    normalizeForHash(input.payload.name),
    normalizeForHash(input.payload.email),
    normalizeForHash(input.payload.phone),
    normalizeForHash(input.payload.intention),
    normalizeForHash(input.payload.message),
  ].join("|");

  const dedupeKey = crypto.createHash("sha256").update(fingerprintSource).digest("hex");

  const existing = recentDedupe.get(dedupeKey);
  if (existing && existing > now) {
    return {
      ok: false,
      status: 409,
      code: "duplicate",
      message: "Duplicate submission detected. We have already received this ticket recently.",
      retryAfterSeconds: Math.max(1, Math.ceil((existing - now) / 1000)),
      dedupeKey,
    };
  }

  recentDedupe.set(dedupeKey, now + WINDOW_10_MIN_MS);
  return { ok: true, dedupeKey };
}

export type { SpamCheckResult };
