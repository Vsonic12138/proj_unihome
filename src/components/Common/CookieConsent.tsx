"use client";

import { useEffect, useState, useRef } from "react";
import { useLocale } from "next-intl";
import {
  setConsentStatus,
  shouldShowBanner,
  enableFunctionalCookies,
  enableAnalyticsCookies,
  disableAnalyticsCookies,
} from '@/lib/cookieConsent';

const CookieIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Cookie base - large circle */}
    <circle cx="24" cy="24" r="20" opacity="0.95" />

    {/* Bite mark - top right corner */}
    <path
      d="M 38 10 Q 42 8 44 12 Q 46 16 42 18 Q 40 19 38 17 Q 36 15 38 10 Z"
      fill="white"
      opacity="0.15"
    />
    <circle cx="41" cy="13" r="6.5" fill="white" />

    {/* Large chocolate chips */}
    <circle cx="15" cy="16" r="2.2" fill="#3E2723" />
    <circle cx="27" cy="14" r="2.4" fill="#3E2723" />
    <circle cx="21" cy="21" r="2" fill="#3E2723" />
    <circle cx="14" cy="25" r="1.9" fill="#3E2723" />
    <circle cx="26" cy="26" r="2.3" fill="#3E2723" />
    <circle cx="19" cy="30" r="2.1" fill="#3E2723" />
    <circle cx="29" cy="32" r="1.8" fill="#3E2723" />
    <circle cx="22" cy="35" r="2" fill="#3E2723" />
    <circle cx="15" cy="34" r="1.7" fill="#3E2723" />
    <circle cx="11" cy="30" r="1.6" fill="#3E2723" />

    {/* Medium chocolate chips */}
    <circle cx="18" cy="19" r="1.3" fill="#4E342E" />
    <circle cx="24" cy="24" r="1.4" fill="#4E342E" />
    <circle cx="30" cy="23" r="1.2" fill="#4E342E" />
    <circle cx="17" cy="28" r="1.3" fill="#4E342E" />
    <circle cx="25" cy="32" r="1.2" fill="#4E342E" />

    {/* Small texture dots */}
    <circle cx="20" cy="16" r="0.7" opacity="0.35" />
    <circle cx="25" cy="19" r="0.7" opacity="0.35" />
    <circle cx="31" cy="20" r="0.7" opacity="0.35" />
    <circle cx="16" cy="23" r="0.7" opacity="0.35" />
    <circle cx="22" cy="27" r="0.7" opacity="0.35" />
    <circle cx="28" cy="29" r="0.7" opacity="0.35" />
    <circle cx="18" cy="33" r="0.7" opacity="0.35" />

    {/* Bite mark edge detail - crumbs */}
    <circle cx="36" cy="11" r="1" opacity="0.4" />
    <circle cx="38" cy="13" r="0.8" opacity="0.4" />
    <circle cx="40" cy="10" r="0.9" opacity="0.4" />
    <circle cx="42" cy="14" r="0.7" opacity="0.4" />
    <circle cx="39" cy="16" r="1" opacity="0.4" />

    {/* Irregular edge texture - makes it look more realistic */}
    <circle cx="8" cy="18" r="0.5" opacity="0.3" />
    <circle cx="10" cy="12" r="0.5" opacity="0.3" />
    <circle cx="16" cy="8" r="0.5" opacity="0.3" />
    <circle cx="24" cy="6" r="0.5" opacity="0.3" />
    <circle cx="32" cy="7" r="0.5" opacity="0.3" />
    <circle cx="38" cy="20" r="0.5" opacity="0.3" />
    <circle cx="40" cy="28" r="0.5" opacity="0.3" />
    <circle cx="38" cy="35" r="0.5" opacity="0.3" />
    <circle cx="32" cy="40" r="0.5" opacity="0.3" />
    <circle cx="24" cy="42" r="0.5" opacity="0.3" />
    <circle cx="16" cy="41" r="0.5" opacity="0.3" />
    <circle cx="9" cy="38" r="0.5" opacity="0.3" />
    <circle cx="6" cy="30" r="0.5" opacity="0.3" />
    <circle cx="5" cy="24" r="0.5" opacity="0.3" />
  </svg>
);

type CookieConsentProps = {
  siteSettings?: any | null;
};

const CookieConsent = ({ siteSettings }: CookieConsentProps) => {
  const locale = useLocale();
  const payloadCopy = siteSettings?.cookieConsent;
  const copy =
    payloadCopy && typeof payloadCopy === "object" && payloadCopy.ariaLabel && payloadCopy.message
      ? payloadCopy
      : null;
  const rawPrivacyPolicyLink = String(copy?.privacyPolicyLink ?? "/privacy-policy").trim();
  const privacyPolicyLink =
    rawPrivacyPolicyLink.startsWith("http://") || rawPrivacyPolicyLink.startsWith("https://")
      ? rawPrivacyPolicyLink
      : rawPrivacyPolicyLink === "/"
        ? `/${locale}`
        : rawPrivacyPolicyLink.startsWith(`/${locale}/`) || rawPrivacyPolicyLink === `/${locale}`
          ? rawPrivacyPolicyLink
          : rawPrivacyPolicyLink.startsWith("/")
            ? `/${locale}${rawPrivacyPolicyLink}`
            : `/${locale}/${rawPrivacyPolicyLink}`;
  const isExternalPrivacyLink = privacyPolicyLink.startsWith("http://") || privacyPolicyLink.startsWith("https://");

  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  // Use ref to ensure banner never re-appears after user interaction
  const hasDismissedRef = useRef(false);

  useEffect(() => {
    if (!copy) return;
    // Only check once on mount
    if (hasDismissedRef.current) return;

    // Check if we should show the banner after a short delay
    // to prevent layout shift during SSR hydration
    const timer = setTimeout(() => {
      if (!hasDismissedRef.current && shouldShowBanner()) {
        setIsVisible(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [copy]);

  useEffect(() => {
    if (!copy) return;

    const handleOpenPreferences = () => {
      hasDismissedRef.current = false;
      setIsAnimatingOut(false);
      setIsVisible(true);
    };

    window.addEventListener("cookie-consent:open", handleOpenPreferences);
    return () => window.removeEventListener("cookie-consent:open", handleOpenPreferences);
  }, [copy]);

  const handleAccept = () => {
    // Save consent immediately
    setConsentStatus("accepted");
    enableFunctionalCookies();
    enableAnalyticsCookies();

    // Mark as dismissed to prevent re-showing
    hasDismissedRef.current = true;

    // Start exit animation, then hide completely
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  const handleReject = () => {
    // Save consent immediately
    setConsentStatus("rejected");
    enableFunctionalCookies(); // Language preference is always enabled
    disableAnalyticsCookies();

    // Mark as dismissed to prevent re-showing
    hasDismissedRef.current = true;

    // Start exit animation, then hide completely
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  // Don't render anything if:
  // 1. Banner has been dismissed by user
  // 2. Banner is not visible
  if (!copy) return null;
  if (hasDismissedRef.current || !isVisible) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 ${
        isAnimatingOut ? "animate-slideDown" : "animate-slideUp"
      }`}
      role="dialog"
      aria-live="polite"
      aria-label={copy.ariaLabel}
    >
      <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-5">
        <div className="overflow-hidden rounded-lg border border-stroke bg-white shadow-lg dark:border-stroke-dark dark:bg-dark">
          <div className="px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Left section: Icon + Message */}
              <div className="flex items-start gap-3 sm:items-center">
                <div className="flex-shrink-0">
                  <CookieIcon className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-body-color dark:text-body-color-dark sm:text-base">
                    {copy.message}
                    {privacyPolicyLink && copy.learnMore && (
                      <>
                        {' '}
                        <a
                          href={privacyPolicyLink}
                          className="font-medium text-primary underline hover:no-underline"
                          target={isExternalPrivacyLink ? "_blank" : undefined}
                          rel={isExternalPrivacyLink ? "noopener noreferrer" : undefined}
                        >
                          {copy.learnMore}
                        </a>
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Right section: Action buttons */}
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                <button
                  type="button"
                  onClick={handleReject}
                  className="rounded-md border border-stroke bg-transparent px-4 py-2 text-sm font-medium text-body-color transition-colors duration-200 hover:bg-gray-2 dark:border-stroke-dark dark:text-body-color-dark dark:hover:bg-dark-bg sm:px-5 sm:py-2.5"
                >
                  {copy.rejectNonEssential}
                </button>
                <button
                  type="button"
                  onClick={handleAccept}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-btn transition-all duration-200 hover:bg-primary/90 hover:shadow-btn-hover sm:px-5 sm:py-2.5"
                >
                  {copy.acceptAll}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
