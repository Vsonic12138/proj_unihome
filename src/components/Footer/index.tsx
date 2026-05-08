"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { RichText as PayloadRichText } from "@payloadcms/richtext-lexical/react";
import CookiePreferencesButton from "@/components/Common/CookiePreferencesButton";

type FooterProps = {
  locale: string;
  footerData?: any | null;
  siteSettings?: any | null;
};

type ContactModalKey = "qq" | "wechat";

type MediaLike =
  | number
  | string
  | null
  | undefined
  | {
      url?: string | null;
      sizes?: Record<string, { url?: string | null } | undefined> | null;
    };

function resolveMediaURL(media: MediaLike): string | null {
  if (!media) return null;
  if (typeof media === "string") return media;
  if (typeof media === "number") return null;

  if (media.url) return media.url;
  if (media.sizes?.hero?.url) return media.sizes.hero.url;
  if (media.sizes?.card?.url) return media.sizes.card.url;
  if (media.sizes?.thumbnail?.url) return media.sizes.thumbnail.url;

  return null;
}

function prefixLocaleHref(currentLocale: string, href: string): string {
  if (!href) return `/${currentLocale}`;
  if (href.startsWith("http://") || href.startsWith("https://")) return href;
  if (href === "/") return `/${currentLocale}`;
  if (href.startsWith("/")) return `/${currentLocale}${href}`;
  return `/${currentLocale}/${href}`;
}

const Footer = ({ locale, footerData, siteSettings }: FooterProps) => {
  const t = useTranslations();
  const currentLocale = useLocale();
  const year = new Date().getFullYear();
  const companyName = String(siteSettings?.companyName ?? "").trim();

  const [activeModal, setActiveModal] = useState<ContactModalKey | null>(null);

  if (!footerData) {
    return null;
  }

  const socialLabel = t('footer.socialLabel');
  const homeHref = `/${currentLocale}`;
  const frontendBranding = siteSettings?.frontendBranding ?? {};
  const footerLogo =
    resolveMediaURL(frontendBranding?.footerLogo) ?? "/images/logo/logo-text.svg";
  const footerLogoInverse =
    resolveMediaURL(frontendBranding?.footerLogoInverse) ?? "/images/logo/logo-text-inverse.svg";

  const contactItems = Array.isArray(footerData?.contactItems)
    ? (footerData.contactItems as Array<{
        key?: "bilibili" | "taobao" | "qq" | "wechat";
        type?: "link" | "qr";
        label?: string;
        href?: string;
        description?: string;
        image?: MediaLike;
      }>)
    : [];

  const getItem = (key: "bilibili" | "taobao" | "qq" | "wechat") => {
    return contactItems.find((item) => item?.key === key) ?? null;
  };

  const bilibili = getItem("bilibili");
  const taobao = getItem("taobao");
  const qq = getItem("qq");
  const wechat = getItem("wechat");

  const qqTitle = String(qq?.label ?? "").trim();
  const wechatTitle = String(wechat?.label ?? "").trim();
  const qqDescription = String(qq?.description ?? "").trim();
  const wechatDescription = String(wechat?.description ?? "").trim();
  const payloadQQImage = resolveMediaURL(qq?.image);
  const payloadWeChatImage = resolveMediaURL(wechat?.image);

  const contactIcons: Array<
    | {
        type: "link";
        key: "bilibili" | "taobao";
        icon: string;
        label: string;
        tooltip: string;
        href: string;
      }
    | {
        type: "modal";
        key: ContactModalKey;
        icon: string;
        label: string;
        tooltip: string;
      }
  > = [];

  const bilibiliHref = String(bilibili?.href ?? "").trim();
  const taobaoHref = String(taobao?.href ?? "").trim();
  const bilibiliLabel = String(bilibili?.label ?? "").trim();
  const taobaoLabel = String(taobao?.label ?? "").trim();

  if (bilibiliHref && bilibiliLabel) {
    contactIcons.push({
      type: "link",
      key: "bilibili",
      icon: "/images/icons/bilibili.svg",
      label: String(bilibiliLabel),
      tooltip: String(bilibiliLabel),
      href: bilibiliHref,
    });
  }

  if (taobaoHref && taobaoLabel) {
    contactIcons.push({
      type: "link",
      key: "taobao",
      icon: "/images/icons/taobao.svg",
      label: String(taobaoLabel),
      tooltip: String(taobaoLabel),
      href: taobaoHref,
    });
  }

  if (qqTitle && payloadQQImage) {
    contactIcons.push({
      type: "modal",
      key: "qq",
      icon: "/images/icons/qq.svg",
      label: qqTitle,
      tooltip: qqTitle,
    });
  }

  if (wechatTitle && payloadWeChatImage) {
    contactIcons.push({
      type: "modal",
      key: "wechat",
      icon: "/images/icons/wechat.svg",
      label: wechatTitle,
      tooltip: wechatTitle,
    });
  }

  const payloadSections = Array.isArray(footerData?.sections)
    ? (footerData.sections as Array<{
        title?: string;
        links?: Array<{ label?: string; href?: string }>;
      }>)
    : [];

  const columnsArray = payloadSections.map((section) => ({
    title: String(section?.title ?? ""),
    items: (section?.links ?? [])
      .map((link) => ({
        label: String(link?.label ?? ""),
        path: String(link?.href ?? ""),
      }))
      .filter((item) => item.label && item.path),
  }));

  const footerContactInfo = (footerData as any)?.contactInfo ?? null;
  const payloadPhone = String(footerContactInfo?.phone ?? siteSettings?.contactInfo?.phone ?? "").trim();
  const payloadEmail = String(footerContactInfo?.email ?? siteSettings?.contactInfo?.email ?? "").trim();
  const payloadAddress = String(footerContactInfo?.address ?? siteSettings?.contactInfo?.address ?? "").trim();
  const phoneNumber = payloadPhone || "";
  const telHref = `tel:${phoneNumber.replace(/\s+/g, "")}`;
  const mailToHref = payloadEmail ? `mailto:${payloadEmail}` : "";
  const modalHeadingId =
    activeModal === "qq"
      ? "footer-contact-qq"
      : activeModal === "wechat"
        ? "footer-contact-wechat"
        : "footer-contact-modal";
  const modalCopy =
    activeModal === null
      ? null
      : activeModal === "qq"
        ? {
            title: qqTitle,
            description: qqDescription,
          }
        : {
            title: wechatTitle,
            description: wechatDescription,
          };

  const modalImage =
    activeModal === null
      ? null
      : activeModal === "qq"
        ? payloadQQImage
        : payloadWeChatImage;

  return (
    <footer className="relative z-10 bg-white pt-16 dark:bg-gray-dark md:pt-20 lg:pt-24">
      <div className="container">
        <div className="-mx-4 flex flex-col gap-14 lg:flex-row lg:items-stretch lg:gap-12">
          <div className="w-full px-4 lg:w-[38%] xl:w-[40%]">
            <div className="mb-12 lg:mb-16">
              <Link href={homeHref} className="mb-8 inline-block">
                <Image
                  src={footerLogo}
                  alt={t('footer.logoAlt')}
                  width={220}
                  height={72}
                  className="block w-full max-w-[15rem] object-contain dark:hidden"
                  priority
                />
                <Image
                  src={footerLogoInverse}
                  alt={t('footer.logoAlt')}
                  width={220}
                  height={72}
                  className="hidden w-full max-w-[15rem] object-contain dark:block"
                  priority
                />
              </Link>
              <div
                className={`mb-10 space-y-3 leading-relaxed text-body-color dark:text-body-color-dark ${
                  locale === "zh" ? "text-sm lg:text-base" : "text-sm"
                }`}
              >
                {footerData?.description ? (
                  <PayloadRichText data={footerData.description as any} />
                ) : null}
              </div>
              <div className="mb-8 space-y-4 text-sm text-body-color dark:text-body-color-dark">
                {phoneNumber && (
                  <div>
                    <span className="block text-base font-semibold text-black dark:text-white">
                      {t('footer.contact.phoneLabel')}
                    </span>
                    <a
                      href={telHref}
                      className="text-base font-medium text-body-color transition hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {phoneNumber}
                    </a>
                    <div className="text-xs mt-1 text-body-color/80 dark:text-body-color-dark/70">
                      {t('footer.contact.phoneTip')}
                    </div>
                  </div>
                )}
                {payloadEmail && (
                  <div>
                    <span className="block text-base font-semibold text-black dark:text-white">
                      {t('footer.contact.emailLabel')} 
                    </span>
                    <a
                      href={mailToHref}
                      className="text-base font-medium text-body-color transition hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {payloadEmail}
                    </a>
                  </div>
                )}
                {payloadAddress && (
                  <div>
                    <span className="block text-base font-semibold text-black dark:text-white">
                      {t('footer.contact.addressLabel')}
                    </span>
                    <div className="text-base font-medium text-body-color dark:text-body-color-dark">
                      {payloadAddress}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-6">
                {contactIcons.map((item) => {
                  const aria = `${socialLabel}：${item.label}`;
                  if (item.type === "link") {
                    const href = prefixLocaleHref(currentLocale, item.href);
                    return (
                      <a
                        key={item.key}
                        href={href}
                        aria-label={aria}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-body-color transition hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                        title={item.tooltip}
                      >
                        <span className="inline-flex h-6 w-6 items-center justify-center">
                          <Image
                            src={item.icon}
                            alt={item.label}
                            width={24}
                            height={24}
                            className="h-6 w-6 transition dark:invert dark:brightness-0"
                          />
                        </span>
                      </a>
                    );
                  }

                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setActiveModal(item.key)}
                      aria-label={aria}
                      className="text-body-color transition hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                      title={item.tooltip}
                    >
                      <span className="inline-flex h-6 w-6 items-center justify-center">
                        <Image
                          src={item.icon}
                          alt={item.label}
                          width={24}
                          height={24}
                          className="h-6 w-6 transition dark:invert dark:brightness-0"
                        />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="hidden lg:flex lg:w-6 lg:flex-none lg:justify-center">
            <span className="h-full w-px bg-body-color/30 dark:bg-white/15" />
          </div>
          <div className="w-full px-4 lg:w-[62%] xl:w-[60%]">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-12">
              {columnsArray.map((column, index) => (
                <div key={`${column.title || "section"}-${index}`} className="space-y-5">
                  <h2 className="text-lg font-semibold text-black dark:text-white">
                    {column.title}
                  </h2>
                  <ul className="space-y-3">
                    {column.items.map((item) => (
                      <li key={`${column.title}-${item.label}`}>
                        <Link
                          href={prefixLocaleHref(currentLocale, item.path)}
                          className="text-base text-body-color transition hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {activeModal && modalCopy && modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          role="presentation"
          onClick={() => setActiveModal(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalHeadingId}
            className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl dark:bg-gray-900"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              aria-label={t('footer.contact.modalClose')}
              className="absolute right-3 top-3 rounded-full p-1 text-body-color transition hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
            <h3
              id={modalHeadingId}
              className="mb-2 text-lg font-semibold text-black dark:text-white"
            >
              {modalCopy.title}
            </h3>
            {modalCopy.description ? (
              <p className="mb-4 text-sm text-body-color dark:text-body-color-dark">
                {modalCopy.description}
              </p>
            ) : null}
            <div className="mx-auto max-w-[220px] overflow-hidden rounded-2xl border border-body-color/15 bg-white p-3 dark:border-white/15 dark:bg-gray-950">
              <Image
                src={modalImage}
                alt={modalCopy.title}
                width={220}
                height={220}
                className="mx-auto h-auto max-h-[220px] w-full max-w-[220px] rounded-xl object-contain"
                priority={false}
                unoptimized
              />
            </div>
          </div>
        </div>
      )}
      <div className="border-t border-body-color/15 py-6 text-center text-sm text-body-color dark:border-white/10 dark:text-body-color-dark">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {String(footerData?.legal?.privacyPolicyLabel ?? "").trim() ? (
              <Link
                href={`/${currentLocale}/privacy-policy`}
                className="text-sm text-body-color transition hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
              >
                {String(footerData.legal.privacyPolicyLabel).trim()}
              </Link>
            ) : null}
            {String(footerData?.legal?.cookieSettingsLabel ?? "").trim() ? (
              <CookiePreferencesButton
                label={String(footerData.legal.cookieSettingsLabel).trim()}
              />
            ) : null}
          </div>
          <div className="flex flex-col items-center gap-3">
            <div>{t("footer.copyright", { year, companyName })}</div>
            {(siteSettings?.icpNumber || siteSettings?.psbNumber) && (
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-body-color/80 dark:text-body-color-dark/70">
                {siteSettings?.icpNumber && (
                  <a
                    href={siteSettings.icpLink || "https://beian.miit.gov.cn/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition"
                  >
                    {siteSettings.icpNumber}
                  </a>
                )}
                {siteSettings?.psbNumber && (
                  <a
                    href="https://beian.mps.gov.cn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition flex items-center justify-center gap-1.5"
                  >
                    {resolveMediaURL(siteSettings.psbIcon) && (
                      <Image
                        src={resolveMediaURL(siteSettings.psbIcon) as string}
                        alt="PSB Icon"
                        width={16}
                        height={16}
                        className="inline-block object-contain"
                        unoptimized
                      />
                    )}
                    {siteSettings.psbNumber}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-14 z-[-1]">
        <svg
          width="55"
          height="99"
          viewBox="0 0 55 99"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle opacity="0.8" cx="49.5" cy="49.5" r="49.5" fill="#959CB1" />
          <mask
            id="mask0_94:899"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="99"
            height="99"
          >
            <circle
              opacity="0.8"
              cx="49.5"
              cy="49.5"
              r="49.5"
              fill="#ff6b35"
            />
          </mask>
          <g mask="url(#mask0_94:899)">
            <circle
              opacity="0.8"
              cx="49.5"
              cy="49.5"
              r="49.5"
              fill="#ff6b35"
            />
          </g>
          <rect
            opacity="0.3"
            x="-41"
            y="26.9426"
            width="66.6675"
            height="66.6675"
            transform="rotate(-22.9007 -41 26.9426)"
            fill="url(#paint0_linear_94:889)"
          />
          <rect
            x="-41"
            y="26.9426"
            width="66.6675"
            height="66.6675"
            transform="rotate(-22.9007 -41 26.9426)"
            stroke="url(#paint1_linear_94:889)"
            strokeWidth="0.7"
          />
          <path
            opacity="0.3"
            d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L77.1885 68.2073L50.5215 7.42229Z"
            fill="url(#paint2_linear_94:889)"
          />
          <path
            d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L76.7963 68.2073L50.5215 7.42229Z"
            stroke="url(#paint3_linear_94:889)"
            strokeWidth="0.7"
          />
          <path
            opacity="0.3"
            d="M17.9721 93.3057L-14.9695 88.2076L46.2077 62.325L77.1885 68.2074L17.9721 93.3057Z"
            fill="url(#paint4_linear_94:889)"
          />
          <path
            d="M17.972 93.3057L-14.1852 88.2076L46.2077 62.325L77.1884 68.2074L17.972 93.3057Z"
            stroke="url(#paint5_linear_94:889)"
            strokeWidth="0.7"
          />
          <defs>
            <linearGradient
              id="paint0_linear_94:889"
              x1="-41"
              y1="21.8445"
              x2="36.9671"
              y2="59.8878"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ff6b35" stopOpacity="0.62" />
              <stop offset="1" stopColor="#ff6b35" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_94:889"
              x1="25.6675"
              y1="95.9631"
              x2="-42.9608"
              y2="20.668"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ff6b35" stopOpacity="0" />
              <stop offset="1" stopColor="#ff6b35" stopOpacity="0.51" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_94:889"
              x1="20.325"
              y1="-3.98039"
              x2="90.6248"
              y2="25.1062"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ff6b35" stopOpacity="0.62" />
              <stop offset="1" stopColor="#ff6b35" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_94:889"
              x1="18.3642"
              y1="-1.59742"
              x2="113.9"
              y2="80.6826"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ff6b35" stopOpacity="0" />
              <stop offset="1" stopColor="#ff6b35" stopOpacity="0.51" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_94:889"
              x1="61.1098"
              y1="62.3249"
              x2="-8.82468"
              y2="58.2156"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ff6b35" stopOpacity="0.62" />
              <stop offset="1" stopColor="#ff6b35" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint5_linear_94:889"
              x1="65.4236"
              y1="65.0701"
              x2="24.0178"
              y2="41.6598"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ff6b35" stopOpacity="0" />
              <stop offset="1" stopColor="#ff6b35" stopOpacity="0.51" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
