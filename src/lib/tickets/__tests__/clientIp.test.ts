import test from "node:test";
import assert from "node:assert/strict";

import { getClientIpFromHeaders } from "../clientIp";

test("prefers x-real-ip over user-controlled x-forwarded-for", () => {
  const ip = getClientIpFromHeaders(
    new Headers({
      "x-forwarded-for": "198.51.100.10, 203.0.113.8",
      "x-real-ip": "203.0.113.8",
    }),
  );

  assert.equal(ip, "203.0.113.8");
});

test("falls back to the first forwarded ip when x-real-ip is absent", () => {
  const ip = getClientIpFromHeaders(
    new Headers({
      "x-forwarded-for": "198.51.100.10, 203.0.113.8",
    }),
  );

  assert.equal(ip, "198.51.100.10");
});

test("returns the default ip when both headers are missing", () => {
  const ip = getClientIpFromHeaders(new Headers());

  assert.equal(ip, "0.0.0.0");
});
