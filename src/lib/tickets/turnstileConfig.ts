type TurnstileConfigInput = {
  mode: string | undefined;
  siteKey: string | undefined;
  secretKey: string | undefined;
};

type TurnstileConfigResult = { ok: true } | { ok: false; error: string };
type TurnstileVerificationInput = {
  success: boolean;
  hostname?: string;
  action?: string;
};
type TurnstileVerificationExpectation = {
  expectedHostname?: string;
  expectedAction?: string;
};

export const TICKET_TURNSTILE_ACTION = "ticket_submit";

export function validateTurnstileConfig(input: TurnstileConfigInput): TurnstileConfigResult {
  const mode = input.mode?.trim() ?? "";
  const siteKey = input.siteKey?.trim() ?? "";
  const secretKey = input.secretKey?.trim() ?? "";
  const hasSiteKey = Boolean(siteKey);
  const hasSecretKey = Boolean(secretKey);

  if (!hasSiteKey && !hasSecretKey) {
    return { ok: true };
  }

  if (hasSiteKey && hasSecretKey) {
    return { ok: true };
  }

  if (mode !== "production") {
    return { ok: true };
  }

  if (!hasSiteKey) {
    return {
      ok: false,
      error:
        "TURNSTILE_SECRET_KEY is configured, but NEXT_PUBLIC_TURNSTILE_SITE_KEY is missing. Production must configure both values together.",
    };
  }

  return {
    ok: false,
    error:
      "NEXT_PUBLIC_TURNSTILE_SITE_KEY is configured, but TURNSTILE_SECRET_KEY is missing. Production must configure both values together.",
  };
}

export function getExpectedTurnstileHostname(origin: string | undefined): string | undefined {
  const value = origin?.trim();
  if (!value) return undefined;

  try {
    return new URL(value).hostname;
  } catch {
    return undefined;
  }
}

export function validateTurnstileVerificationResult(
  input: TurnstileVerificationInput,
  expectation: TurnstileVerificationExpectation,
): TurnstileConfigResult {
  if (!input.success) {
    return {
      ok: false,
      error: "Captcha verification failed.",
    };
  }

  if (expectation.expectedHostname && input.hostname !== expectation.expectedHostname) {
    return {
      ok: false,
      error: `Captcha verification hostname mismatch. Expected ${expectation.expectedHostname}, received ${input.hostname ?? "unknown"}.`,
    };
  }

  if (expectation.expectedAction && input.action !== expectation.expectedAction) {
    return {
      ok: false,
      error: `Captcha verification action mismatch. Expected ${expectation.expectedAction}, received ${input.action ?? "unknown"}.`,
    };
  }

  return { ok: true };
}
