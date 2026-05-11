"use client";

import { TICKET_TURNSTILE_ACTION } from "@/lib/tickets/turnstileConfig";
import Script from "next/script";
import { useEffect, useId, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          action?: string;
          theme?: "light" | "dark" | "auto";
        },
      ) => string;
      remove?: (widgetId: string) => void;
      reset?: (widgetId?: string) => void;
    };
  }
}

type TurnstileWidgetProps = {
  siteKey?: string;
  onTokenChange: (token: string | null) => void;
  onStatusChange?: (status: TurnstileStatus) => void;
  resetKey?: string | number;
};

export type TurnstileStatus = "disabled" | "loading" | "ready" | "verified" | "expired" | "error";

export default function TurnstileWidget({
  siteKey,
  onTokenChange,
  onStatusChange,
  resetKey,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const fallbackId = useId();

  useEffect(() => {
    onStatusChange?.(siteKey ? "loading" : "disabled");
  }, [onStatusChange, siteKey]);

  useEffect(() => {
    if (!siteKey || !scriptReady || !containerRef.current || !window.turnstile) return;
    if (widgetIdRef.current) return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: "auto",
      action: TICKET_TURNSTILE_ACTION,
      callback: (token) => {
        onTokenChange(token);
        onStatusChange?.("verified");
      },
      "expired-callback": () => {
        onTokenChange(null);
        onStatusChange?.("expired");
      },
      "error-callback": () => {
        onTokenChange(null);
        onStatusChange?.("error");
      },
    });
    onStatusChange?.("ready");

    return () => {
      if (widgetIdRef.current && window.turnstile?.remove) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, [onStatusChange, onTokenChange, scriptReady, siteKey]);

  useEffect(() => {
    if (!widgetIdRef.current || !window.turnstile?.reset) return;
    window.turnstile.reset(widgetIdRef.current);
    onTokenChange(null);
    onStatusChange?.("ready");
  }, [onStatusChange, onTokenChange, resetKey]);

  if (!siteKey) {
    return null;
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
        onError={() => {
          onTokenChange(null);
          onStatusChange?.("error");
        }}
      />
      <div className="mb-8">
        <div ref={containerRef} id={`turnstile-${fallbackId}`} />
      </div>
    </>
  );
}
