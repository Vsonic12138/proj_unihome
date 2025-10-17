"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FocusEvent, MutableRefObject } from "react";
import Image from "next/image";
import type { Dictionary } from "@/i18n/config";

type FloatingContactProps = {
  copy: Dictionary["floatingContact"];
};

const WECHAT_TOOLTIP_ID = "floating-contact-wechat-tooltip";
const QQ_GROUP_QR_SRC = "/images/contact/qq-group-qrcode.jpg" as const;
const TAOBAO_LINK =
  "https://4vhhasmxqjt25cg7za43qs6podckjow.taobao.com/shop/view_shop.htm?appUid=RAzN8HWTBLcKSRgwfJESLCpphyAguSqzhXdc1GyTLumi8JFoD49&spm=a21n57.1.hoverItem.1";
const VISITED_STORAGE_KEY = "floatingContactVisited";

const clearTimeoutRef = (
  ref: MutableRefObject<ReturnType<typeof setTimeout> | null>,
) => {
  if (ref.current) {
    clearTimeout(ref.current);
    ref.current = null;
  }
};

export default function FloatingContact({ copy }: FloatingContactProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [copiedQQ, setCopiedQQ] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [offsetForScrollTop, setOffsetForScrollTop] = useState(false);
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const [showWechatTooltip, setShowWechatTooltip] = useState(false);
  const hintTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copiedQQTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copiedPhoneTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasVisitedRef = useRef(false);

  const markVisited = useCallback(() => {
    if (hasVisitedRef.current) {
      setShowHint(false);
      clearTimeoutRef(hintTimeoutRef);
      return;
    }
    hasVisitedRef.current = true;
    setShowHint(false);
    clearTimeoutRef(hintTimeoutRef);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(VISITED_STORAGE_KEY, "true");
      } catch {
        // Ignore unavailability of localStorage (e.g. privacy modes).
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let storedVisited = true;
      try {
        storedVisited = window.localStorage.getItem(VISITED_STORAGE_KEY) === "true";
      } catch {
        storedVisited = false;
      }

      hasVisitedRef.current = storedVisited;

      if (!storedVisited) {
        setShowHint(true);
        hintTimeoutRef.current = setTimeout(() => {
          markVisited();
        }, 5000);
      }
    }

    return () => {
      clearTimeoutRef(hintTimeoutRef);
      clearTimeoutRef(closeTimeoutRef);
      clearTimeoutRef(copiedQQTimeoutRef);
      clearTimeoutRef(copiedPhoneTimeoutRef);
    };
  }, [markVisited]);

  useEffect(() => {
    const updateOffset = () => {
      if (typeof window === "undefined") {
        return;
      }
      if (window.innerWidth >= 768) {
        setOffsetForScrollTop(false);
        return;
      }
      setOffsetForScrollTop(window.pageYOffset > 300);
    };

    updateOffset();
    window.addEventListener("scroll", updateOffset);
    window.addEventListener("resize", updateOffset);
    return () => {
      window.removeEventListener("scroll", updateOffset);
      window.removeEventListener("resize", updateOffset);
    };
  }, []);

  const clearCloseTimeout = () => {
    clearTimeoutRef(closeTimeoutRef);
  };

  const openPanel = () => {
    clearCloseTimeout();
    setIsPanelOpen(true);
    markVisited();
  };

  const closePanel = () => {
    clearCloseTimeout();
    setIsPanelOpen(false);
    setShowWechatTooltip(false);
  };

  const handleMouseEnter = () => {
    clearCloseTimeout();
    openPanel();
  };

  const handleMouseLeave = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      closePanel();
    }, 160);
  };

  const handleDesktopBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      closePanel();
    }
  };

  const handleCopy = async (text: string, type: "qq" | "phone") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "qq") {
        setCopiedQQ(true);
        clearTimeoutRef(copiedQQTimeoutRef);
        copiedQQTimeoutRef.current = setTimeout(() => {
          setCopiedQQ(false);
        }, 2000);
      } else {
        setCopiedPhone(true);
        clearTimeoutRef(copiedPhoneTimeoutRef);
        copiedPhoneTimeoutRef.current = setTimeout(() => {
          setCopiedPhone(false);
        }, 2000);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      {/* Desktop Version - Side Panel */}
      <div className="fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 md:block">
        <div className="flex flex-row-reverse items-start">
          <div
            className={`relative flex flex-col gap-0 overflow-visible rounded-l-lg bg-white shadow-two transition-all duration-300 dark:bg-dark ${
              isPanelOpen ? "translate-x-0" : "translate-x-[calc(100%-48px)]"
            } ${showHint ? "animate-pulse" : ""}`}
            role="complementary"
            aria-label={copy.panelLabel}
            tabIndex={0}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocusCapture={openPanel}
            onBlurCapture={handleDesktopBlur}
          >
            {/* First Visit Hint Badge */}
            {showHint && (
              <div className="absolute -left-2 -top-2 flex h-6 w-6 animate-ping items-center justify-center rounded-full bg-primary opacity-75"></div>
            )}
            {showHint && (
              <div className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                <span className="text-xs font-bold text-white">!</span>
              </div>
            )}

          {/* QQ Group Section */}
          <div className="border-b border-stroke dark:border-stroke-dark">
            <div className="flex items-center gap-3 p-3">
              {/* Icon Area - Always Visible */}
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center" title={copy.qqGroup.tooltip}>
                <Image
                  src="/images/icons/QQ.svg"
                  alt="QQ"
                  width={24}
                  height={24}
                  className="dark:brightness-0 dark:invert dark:[filter:invert(73%)_sepia(11%)_saturate(545%)_hue-rotate(183deg)_brightness(93%)_contrast(87%)]"
                />
              </div>

              {/* Content - Visible when open */}
              <div
                className={`flex-1 transition-opacity duration-300 ${
                  isPanelOpen ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={!isPanelOpen}
              >
                <div className="mb-1 text-sm font-medium text-black dark:text-white">
                  {copy.qqGroup.label}
                </div>
                <div className="mb-2 text-xs text-body-color dark:text-body-color-dark">
                  {copy.qqGroup.number}
                </div>
                <button
                  onClick={() => handleCopy(copy.qqGroup.number, "qq")}
                  className="w-full rounded bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                  aria-label={`${copy.qqGroup.tooltip}: ${copy.qqGroup.number}`}
                >
                  {copiedQQ ? copy.qqGroup.copied : copy.qqGroup.copy}
                </button>
              </div>
            </div>
          </div>

          {/* WeChat Section */}
          <div className="relative flex items-center gap-3 border-b border-stroke p-3 dark:border-stroke-dark">
            {/* Icon Area - Always Visible */}
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center" title={copy.wechat.tooltip}>
              <Image
                src="/images/icons/wechat-fill.svg"
                alt="WeChat"
                width={24}
                height={24}
                className="dark:brightness-0 dark:invert dark:[filter:invert(73%)_sepia(11%)_saturate(545%)_hue-rotate(183deg)_brightness(93%)_contrast(87%)]"
              />
            </div>

            {/* Content - Visible when open */}
            <div
              className={`flex-1 transition-opacity duration-300 ${
                isPanelOpen ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={!isPanelOpen}
            >
              <div className="mb-2 text-sm font-medium text-black dark:text-white">
                {copy.wechat.label}
              </div>
              <button
                onClick={() => setShowWechatTooltip(!showWechatTooltip)}
                className="w-full rounded bg-gray-100 px-3 py-1 text-xs font-medium text-body-color transition-colors hover:bg-gray-200 dark:bg-gray-dark dark:text-body-color-dark dark:hover:bg-gray-700"
                aria-expanded={showWechatTooltip}
                aria-controls={WECHAT_TOOLTIP_ID}
              >
                {copy.wechat.tooltip}
              </button>
              {showWechatTooltip && (
                <div
                  id={WECHAT_TOOLTIP_ID}
                  className="mt-2 rounded bg-gray-50 p-2 text-xs text-body-color dark:bg-gray-800 dark:text-body-color-dark"
                >
                  {copy.wechat.comingSoon}
                </div>
              )}
            </div>
          </div>

          {/* Phone Section */}
          <div className="flex items-center gap-3 border-b border-stroke p-3 dark:border-stroke-dark">
            {/* Icon Area - Always Visible */}
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center" title={copy.phone.tooltip}>
              <Image
                src="/images/icons/phone.svg"
                alt="Phone"
                width={24}
                height={24}
                className="dark:brightness-0 dark:invert dark:[filter:invert(73%)_sepia(11%)_saturate(545%)_hue-rotate(183deg)_brightness(93%)_contrast(87%)]"
              />
            </div>

            {/* Content - Visible when open */}
            <div
              className={`flex-1 transition-opacity duration-300 ${
                isPanelOpen ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={!isPanelOpen}
            >
              <div className="mb-1 text-sm font-medium text-black dark:text-white">
                {copy.phone.label}
              </div>
              <div className="text-xs text-body-color dark:text-body-color-dark">
                {copy.phone.name}
              </div>
              <div className="mb-2 text-xs text-body-color dark:text-body-color-dark">
                {copy.phone.number}
              </div>
              <button
                onClick={() => handleCopy(copy.phone.number, "phone")}
                className="w-full rounded bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                aria-label={`${copy.phone.tooltip}: ${copy.phone.number}`}
              >
                {copiedPhone ? copy.phone.copied : copy.phone.copy}
              </button>
            </div>
          </div>

          {/* Taobao Section */}
          <div className="flex items-center gap-3 p-3">
            {/* Icon Area - Always Visible */}
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center" title={copy.taobao.tooltip}>
              <Image
                src="/images/icons/taobao.svg"
                alt="Taobao"
                width={24}
                height={24}
                className="dark:brightness-0 dark:invert dark:[filter:invert(73%)_sepia(11%)_saturate(545%)_hue-rotate(183deg)_brightness(93%)_contrast(87%)]"
              />
            </div>

            {/* Content - Visible when open */}
            <div
              className={`flex-1 transition-opacity duration-300 ${
                isPanelOpen ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={!isPanelOpen}
            >
              <div className="mb-2 text-sm font-medium text-black dark:text-white">
                {copy.taobao.label}
              </div>
              <a
                href={TAOBAO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded bg-primary/10 px-3 py-1 text-center text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                title={copy.taobao.tooltip}
              >
                {copy.taobao.linkText}
              </a>
            </div>
            </div>
          </div>
          <div
            className={`mr-3 rounded-lg border border-stroke bg-white p-3 shadow-two transition duration-300 dark:border-stroke-dark dark:bg-dark ${
              isPanelOpen
                ? "translate-x-0 opacity-100 pointer-events-auto"
                : "translate-x-2 opacity-0 pointer-events-none"
            }`}
            aria-hidden={!isPanelOpen}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src={QQ_GROUP_QR_SRC}
              alt={copy.qqGroup.label}
              width={200}
              height={200}
              className="rounded"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Mobile Version - FAB + Modal */}
      <div className="md:hidden">
        {/* Floating Action Button */}
        <button
          onClick={() => {
            setMobileModalOpen(true);
            markVisited();
          }}
          aria-label={copy.fabLabel}
          aria-haspopup="dialog"
          aria-expanded={mobileModalOpen}
          className={`fixed ${offsetForScrollTop ? "bottom-24" : "bottom-6"} right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-two transition-transform hover:scale-110 active:scale-95 ${
            showHint ? "animate-pulse" : ""
          }`}
        >
          {showHint && (
            <div className="absolute -right-1 -top-1 flex h-5 w-5 animate-ping items-center justify-center rounded-full bg-white opacity-75"></div>
          )}
          {showHint && (
            <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white">
              <span className="text-xs font-bold text-primary">!</span>
            </div>
          )}
          <svg
            className="h-6 w-6 fill-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z" />
          </svg>
        </button>

        {/* Modal Backdrop & Content */}
        {mobileModalOpen && (
          <div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileModalOpen(false)}
            role="presentation"
          >
            <div
              className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-6 dark:bg-dark"
              role="dialog"
              aria-modal="true"
              aria-label={copy.panelLabel}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setMobileModalOpen(false)}
                className="absolute right-4 top-4 text-body-color hover:text-black dark:text-body-color-dark dark:hover:text-white"
                aria-label={copy.closeLabel}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Contact Content */}
              <div className="space-y-6">
                {/* QQ Group */}
                <div className="border-b border-stroke pb-6 dark:border-stroke-dark">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center">
                      <Image
                        src="/images/icons/QQ.svg"
                        alt="QQ"
                        width={28}
                        height={28}
                        className="dark:brightness-0 dark:invert"
                      />
                    </div>
                    <div>
                      <div className="mb-1 text-base font-semibold text-black dark:text-white">
                        {copy.qqGroup.label}
                      </div>
                      <div className="text-sm text-body-color dark:text-body-color-dark">
                        {copy.qqGroup.number}
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 flex justify-center">
                    <Image
                      src={QQ_GROUP_QR_SRC}
                      alt={copy.qqGroup.label}
                      width={220}
                      height={220}
                      className="rounded-lg"
                      priority
                      unoptimized
                    />
                  </div>
                  <button
                    onClick={() => handleCopy(copy.qqGroup.number, "qq")}
                    className="w-full rounded-lg bg-primary/10 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                    aria-label={`${copy.qqGroup.tooltip}: ${copy.qqGroup.number}`}
                  >
                    {copiedQQ ? copy.qqGroup.copied : copy.qqGroup.copy}
                  </button>
                </div>

                {/* WeChat */}
                <div className="border-b border-stroke pb-6 dark:border-stroke-dark">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center">
                      <Image
                        src="/images/icons/wechat-fill.svg"
                        alt="WeChat"
                        width={28}
                        height={28}
                        className="dark:brightness-0 dark:invert"
                      />
                    </div>
                    <div>
                      <div className="mb-1 text-base font-semibold text-black dark:text-white">
                        {copy.wechat.label}
                      </div>
                      <div className="text-sm text-body-color dark:text-body-color-dark">
                        {copy.wechat.comingSoon}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="border-b border-stroke pb-6 dark:border-stroke-dark">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center">
                      <Image
                        src="/images/icons/phone.svg"
                        alt="Phone"
                        width={28}
                        height={28}
                        className="dark:brightness-0 dark:invert"
                      />
                    </div>
                    <div>
                      <div className="mb-1 text-base font-semibold text-black dark:text-white">
                        {copy.phone.label}
                      </div>
                      <div className="text-sm text-body-color dark:text-body-color-dark">
                        {copy.phone.name}
                      </div>
                      <div className="text-sm text-body-color dark:text-body-color-dark">
                        {copy.phone.number}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(copy.phone.number, "phone")}
                    className="w-full rounded-lg bg-primary/10 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                    aria-label={`${copy.phone.tooltip}: ${copy.phone.number}`}
                  >
                    {copiedPhone ? copy.phone.copied : copy.phone.copy}
                  </button>
                </div>

                {/* Taobao */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center">
                      <Image
                        src="/images/icons/taobao.svg"
                        alt="Taobao"
                        width={28}
                        height={28}
                        className="dark:brightness-0 dark:invert"
                      />
                    </div>
                    <div>
                      <div className="mb-1 text-base font-semibold text-black dark:text-white">
                        {copy.taobao.label}
                      </div>
                    </div>
                  </div>
                  <a
                    href={TAOBAO_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-lg bg-primary/10 py-2 text-center text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                    title={copy.taobao.tooltip}
                  >
                    {copy.taobao.linkText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
