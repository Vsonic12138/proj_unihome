import test from "node:test";
import assert from "node:assert/strict";

import {
  getConsentStatus,
  setConsentStatus,
  shouldShowBanner,
} from "../cookieConsent";

function installBrowserStorage(options?: {
  cookieValue?: string;
  protocol?: string;
}) {
  let cookieValue = options?.cookieValue ?? "";
  let lastCookieWrite = "";
  const storage = new Map<string, string>();

  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: {
      get cookie() {
        return cookieValue;
      },
      set cookie(value: string) {
        lastCookieWrite = value;
        const [nameValue] = value.split(";");
        cookieValue = nameValue ?? "";
      },
    },
  });

  Object.defineProperty(globalThis, "location", {
    configurable: true,
    value: {
      protocol: options?.protocol ?? "https:",
    },
  });

  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => {
        storage.set(key, value);
      },
      removeItem: (key: string) => {
        storage.delete(key);
      },
    },
  });

  return {
    storage,
    getCookieWrite: () => lastCookieWrite,
  };
}

test("setConsentStatus writes a secure cookie on https pages", () => {
  const browser = installBrowserStorage({ protocol: "https:" });

  setConsentStatus("accepted");

  assert.match(browser.getCookieWrite(), /cookie-consent-status=accepted/);
  assert.match(browser.getCookieWrite(), /SameSite=Strict/);
  assert.match(browser.getCookieWrite(), /Secure/);
});

test("getConsentStatus falls back to localStorage when the consent cookie is unavailable", () => {
  const browser = installBrowserStorage();
  browser.storage.set("cookie-consent-status", "rejected");

  assert.equal(getConsentStatus(), "rejected");
  assert.equal(shouldShowBanner(), false);
});
