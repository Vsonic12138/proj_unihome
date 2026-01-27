"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FocusEvent, MutableRefObject } from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';

const QQ_GROUP_QR_SRC = "/images/contact/qq-group-qrcode.jpg" as const;
const WECHAT_OFFICIAL_QR_SRC =
  "/images/contact/weChat-official-account.jpg" as const;
const VISITED_STORAGE_KEY = "floatingContactVisited";

const clearTimeoutRef = (
  ref: MutableRefObject<ReturnType<typeof setTimeout> | null>,
) => {
  if (ref.current) {
    clearTimeout(ref.current);
    ref.current = null;
  }
};

export default function FloatingContact() {
  const t = useTranslations();
  const copy = t.raw('floatingContact') as any;
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [copiedQQ, setCopiedQQ] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [offsetForScrollTop, setOffsetForScrollTop] = useState(false);
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
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
      <div
        className="fixed bottom-[15%] right-0 z-[35] hidden translate-y-1/2 md:block"
        onMouseEnter={openPanel}
        onMouseLeave={handleMouseLeave}
        onFocusCapture={openPanel}
        onBlurCapture={handleDesktopBlur}
      >
        <div className="flex items-center">
          {/* Expanded Panel */}
          <div
            className={`flex items-center gap-2 rounded-l-full bg-white p-3 shadow-lg transition-all duration-300 dark:bg-dark ${
              isPanelOpen
                ? "pointer-events-auto translate-x-0 opacity-100"
                : "pointer-events-none translate-x-4 opacity-0"
            }`}
          >
            {/* QQ */}
            <div className="group relative">
              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
                <Image
                  src="/images/icons/qq.svg"
                  alt={copy.qqGroup.label}
                  width={24}
                  height={24}
                  className="dark:invert"
                />
              </div>
              <div className="absolute bottom-full right-1/2 hidden w-48 translate-x-1/2 transform rounded-md bg-white p-3 text-center shadow-lg group-hover:block dark:bg-dark">
                <Image
                  src={QQ_GROUP_QR_SRC}
                  alt={copy.qqGroup.label}
                  width={160}
                  height={160}
                  className="mx-auto rounded"
                />
                <p className="mt-1 text-sm">{copy.qqGroup.number}</p>
                <button
                  onClick={() => handleCopy(copy.qqGroup.number, "qq")}
                  className="mt-2 w-full rounded bg-primary px-2 py-1 text-xs font-semibold text-white"
                >
                  {copiedQQ ? copy.qqGroup.copied : copy.qqGroup.copy}
                </button>
              </div>
            </div>
            {/* WeChat */}
            <div className="group relative">
              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
                <Image
                  src="/images/icons/wechat.svg"
                  alt={copy.wechat.label}
                  width={24}
                  height={24}
                  className="dark:invert"
                />
              </div>
              <div className="absolute bottom-full right-1/2 hidden w-48 translate-x-1/2 transform rounded-md bg-white p-3 text-center shadow-lg group-hover:block dark:bg-dark">
                <Image
                  src={WECHAT_OFFICIAL_QR_SRC}
                  alt={copy.wechat.label}
                  width={160}
                  height={160}
                  className="mx-auto rounded"
                />
                <p className="mt-1 text-xs">{copy.wechat.tooltip}</p>
              </div>
            </div>
            {/* Phone */}
            <div className="group relative">
              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
                <Image
                  src="/images/icons/phone.svg"
                  alt={copy.phone.label}
                  width={24}
                  height={24}
                  className="dark:invert"
                />
              </div>
              <div className="absolute bottom-full right-1/2 hidden w-44 translate-x-1/2 transform rounded-md bg-white p-3 text-center shadow-lg group-hover:block dark:bg-dark">
                <p className="text-sm font-semibold">{copy.phone.name}</p>
                <p className="text-sm">{copy.phone.number}</p>
                <button
                  onClick={() => handleCopy(copy.phone.number, "phone")}
                  className="mt-2 w-full rounded bg-primary px-2 py-1 text-xs font-semibold text-white"
                >
                  {copiedPhone ? copy.phone.copied : copy.phone.copy}
                </button>
              </div>
            </div>
            {/* Bilibili */}
            <a
              href={copy.bilibili.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
              aria-label={copy.bilibili.tooltip}
              title={copy.bilibili.tooltip}
            >
              <Image
                src="/images/icons/bilibili.svg"
                alt={copy.bilibili.label}
                width={24}
                height={24}
                className="dark:invert"
              />
            </a>
            {/* Taobao */}
            <a
              href={copy.taobao.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
              aria-label={copy.taobao.tooltip}
              title={copy.taobao.tooltip}
            >
              <Image
                src="/images/icons/taobao.svg"
                alt={copy.taobao.label}
                width={24}
                height={24}
                className="dark:invert"
              />
            </a>
          </div>

          {/* Collapsed Vertical Tab */}
          <div className="relative flex h-12 w-32 cursor-pointer items-center justify-center rounded-l-full bg-primary shadow-lg">
            {showHint && (
              <div className="absolute -left-1 -top-1 h-5 w-5 animate-ping rounded-full bg-white opacity-75"></div>
            )}
            {showHint && (
              <div className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white">
                <span className="text-xs font-bold text-primary">!</span>
              </div>
            )}
            <span className="whitespace-nowrap text-sm font-semibold text-white">
              {copy.panelLabel}
            </span>
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
          className={`fixed ${offsetForScrollTop ? "bottom-20" : "bottom-4"} right-6 z-[35] flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-two transition-transform hover:scale-110 active:scale-95 ${
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
                        src="/images/icons/qq.svg"
                        alt={copy.qqGroup.label}
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
                      src="/images/icons/wechat.svg"
                        alt={copy.wechat.label}
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
                  <div className="mb-3 flex justify-center">
                    <Image
                      src={WECHAT_OFFICIAL_QR_SRC}
                      alt={copy.wechat.label}
                      width={220}
                      height={220}
                      className="rounded-lg"
                      priority
                      unoptimized
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="border-b border-stroke pb-6 dark:border-stroke-dark">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center">
                      <Image
                        src="/images/icons/phone.svg"
                        alt={copy.phone.label}
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

                {/* Bilibili */}
                <div className="border-b border-stroke pb-6 dark:border-stroke-dark">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center">
                      <Image
                        src="/images/icons/bilibili.svg"
                        alt={copy.bilibili.label}
                        width={28}
                        height={28}
                        className="dark:brightness-0 dark:invert"
                      />
                    </div>
                    <div>
                      <div className="mb-1 text-base font-semibold text-black dark:text-white">
                        {copy.bilibili.label}
                      </div>
                    </div>
                  </div>
                  <a
                    href={copy.bilibili.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-lg bg-primary/10 py-2 text-center text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                    title={copy.bilibili.tooltip}
                  >
                    {copy.bilibili.linkText}
                  </a>
                </div>

                {/* Taobao */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center">
                      <Image
                        src="/images/icons/taobao.svg"
                        alt={copy.taobao.label}
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
                    href={copy.taobao.href}
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
