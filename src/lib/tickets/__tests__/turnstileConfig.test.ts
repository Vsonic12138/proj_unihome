import test from "node:test";
import assert from "node:assert/strict";

import {
  validateTurnstileConfig,
  validateTurnstileVerificationResult,
  TICKET_TURNSTILE_ACTION,
} from "../turnstileConfig";

test("requires both secret and site key together in production mode", () => {
  const result = validateTurnstileConfig({
    mode: "production",
    siteKey: "",
    secretKey: "secret",
  });

  assert.equal(result.ok, false);
  if (result.ok) {
    assert.fail("expected invalid result");
  }

  assert.match(result.error, /NEXT_PUBLIC_TURNSTILE_SITE_KEY/);
});

test("accepts empty turnstile config outside production", () => {
  const result = validateTurnstileConfig({
    mode: "development",
    siteKey: "",
    secretKey: "",
  });

  assert.deepEqual(result, { ok: true });
});

test("accepts complete turnstile config in production mode", () => {
  const result = validateTurnstileConfig({
    mode: "production",
    siteKey: "site",
    secretKey: "secret",
  });

  assert.deepEqual(result, { ok: true });
});

test("rejects successful turnstile verification when hostname does not match", () => {
  const result = validateTurnstileVerificationResult({
    success: true,
    hostname: "evil.example.com",
    action: TICKET_TURNSTILE_ACTION,
  }, {
    expectedHostname: "unitc.cn",
    expectedAction: TICKET_TURNSTILE_ACTION,
  });

  assert.equal(result.ok, false);
  if (result.ok) {
    assert.fail("expected invalid result");
  }

  assert.match(result.error, /hostname/i);
});

test("rejects successful turnstile verification when action does not match", () => {
  const result = validateTurnstileVerificationResult({
    success: true,
    hostname: "unitc.cn",
    action: "other_action",
  }, {
    expectedHostname: "unitc.cn",
    expectedAction: TICKET_TURNSTILE_ACTION,
  });

  assert.equal(result.ok, false);
  if (result.ok) {
    assert.fail("expected invalid result");
  }

  assert.match(result.error, /action/i);
});

test("accepts successful turnstile verification when hostname and action match", () => {
  const result = validateTurnstileVerificationResult({
    success: true,
    hostname: "unitc.cn",
    action: TICKET_TURNSTILE_ACTION,
  }, {
    expectedHostname: "unitc.cn",
    expectedAction: TICKET_TURNSTILE_ACTION,
  });

  assert.deepEqual(result, { ok: true });
});
