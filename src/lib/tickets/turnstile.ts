import "server-only";

type TurnstileSuccess = {
  ok: true;
};

type TurnstileFailure = {
  ok: false;
  code: "captcha_configuration_error" | "missing_captcha_token" | "captcha_verification_failed";
  status: 400 | 503;
  error: string;
  details?: string[];
};

export type { TurnstileFailure };

type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
};

export function isTurnstileRequired() {
  return process.env.NODE_ENV === "production" || Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstileToken(args: {
  token: string | null;
  ip: string;
}): Promise<TurnstileSuccess | TurnstileFailure> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      return {
        ok: false,
        code: "captcha_configuration_error",
        status: 503,
        error:
          "Turnstile verification is required in production, but TURNSTILE_SECRET_KEY is not configured.",
      };
    }

    return { ok: true };
  }

  if (!args.token) {
    return {
      ok: false,
      code: "missing_captcha_token",
      status: 400,
      error: "Missing captcha token.",
    };
  }

  try {
    const formData = new URLSearchParams();
    formData.set("secret", secret);
    formData.set("response", args.token);
    formData.set("remoteip", args.ip);

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      return {
        ok: false,
        code: "captcha_verification_failed",
        status: 503,
        error: `Turnstile verification request failed with status ${response.status}.`,
        details: text ? [text.slice(0, 200)] : undefined,
      };
    }

    const data = (await response.json()) as TurnstileResponse;
    if (!data.success) {
      return {
        ok: false,
        code: "captcha_verification_failed",
        status: 400,
        error: "Captcha verification failed.",
        details: data["error-codes"] ?? [],
      };
    }

    return { ok: true };
  } catch (error: any) {
    return {
      ok: false,
      code: "captcha_verification_failed",
      status: 503,
      error: `Turnstile verification request error: ${error?.message ?? String(error)}`,
    };
  }
}
