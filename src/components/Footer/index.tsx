"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/config";
import { withLocalePath } from "@/i18n/utils";

const QQ_GROUP_QR_SRC = "/images/contact/qq-group-qrcode.jpg" as const;
const WECHAT_OFFICIAL_QR_SRC =
  "/images/contact/weChat-official-account.jpg" as const;

type FooterProps = {
  copy: Dictionary["footer"];
  socialLabel: string;
  homeHref: string;
  locale: Locale;
};

type ContactModalKey = "qq" | "wechat";

const Footer = ({ copy, socialLabel, homeHref, locale }: FooterProps) => {
  const [activeModal, setActiveModal] = useState<ContactModalKey | null>(null);

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
  > = [
    {
      type: "link",
      key: "bilibili",
      icon: "/images/icons/bilibili.svg",
      label: copy.contact.bilibiliLabel,
      tooltip: copy.contact.bilibiliLabel,
      href: copy.contact.bilibiliHref,
    },
    {
      type: "link",
      key: "taobao",
      icon: "/images/icons/taobao.svg",
      label: copy.contact.taobaoLabel,
      tooltip: copy.contact.taobaoLabel,
      href: copy.contact.taobaoHref,
    },
    {
      type: "modal",
      key: "qq",
      icon: "/images/icons/qq.svg",
      label: copy.contact.qq.title,
      tooltip: copy.contact.qq.description,
    },
    {
      type: "modal",
      key: "wechat",
      icon: "/images/icons/wechat.svg",
      label: copy.contact.wechat.title,
      tooltip: copy.contact.wechat.description,
    },
  ];

  const columns = [
    copy.columns.usefulLinks,
    copy.columns.terms,
    copy.columns.support,
  ];

  const telHref = `tel:${copy.contact.phoneNumber.replace(/\s+/g, "")}`;
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
        ? copy.contact.qq
        : copy.contact.wechat;
  const modalImage =
    activeModal === null
      ? null
      : activeModal === "qq"
        ? QQ_GROUP_QR_SRC
        : WECHAT_OFFICIAL_QR_SRC;

  return (
    <footer className="relative z-10 bg-white pt-16 dark:bg-gray-dark md:pt-20 lg:pt-24">
      <div className="container">
        <div className="-mx-4 flex flex-col gap-14 lg:flex-row lg:items-stretch lg:gap-12">
          <div className="w-full px-4 lg:w-[38%] xl:w-[40%]">
            <div className="mb-12 lg:mb-16">
              <Link href={homeHref} className="mb-8 inline-block">
                <Image
                  src="/images/logo/logo-text.svg"
                  alt="logo"
                  width={220}
                  height={72}
                  className="block w-full max-w-[15rem] object-contain dark:hidden"
                  priority
                />
                <Image
                  src="/images/logo/logo-text-inverse.svg"
                  alt="logo"
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
                {copy.description.split("\n").map((line, index) => (
                  <p
                    key={`footer-description-${index}`}
                    className="whitespace-normal"
                  >
                    {line}
                  </p>
                ))}
              </div>
              <div className="mb-8 space-y-3 text-sm text-body-color dark:text-body-color-dark">
                <div>
                  <span className="block text-base font-semibold text-black dark:text-white">
                    {copy.contact.phoneLabel}
                  </span>
                  <a
                    href={telHref}
                    className="text-base font-medium text-body-color transition hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    {copy.contact.phoneNumber}
                  </a>
                  <div className="text-xs text-body-color/80 dark:text-body-color-dark/70">
                    {copy.contact.phoneTip}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                {contactIcons.map((item) => {
                  const aria = `${socialLabel}：${item.label}`;
                  if (item.type === "link") {
                    const href = withLocalePath(locale, item.href);
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
              {columns.map((column) => (
                <div key={column.title} className="space-y-5">
                  <h2 className="text-lg font-semibold text-black dark:text-white">
                    {column.title}
                  </h2>
                  <ul className="space-y-3">
                    {column.items.map((item) => (
                      <li key={`${column.title}-${item.label}`}>
                        <Link
                          href={withLocalePath(locale, item.path)}
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
              aria-label={copy.contact.modalClose}
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
            <p className="mb-4 text-sm text-body-color dark:text-body-color-dark">
              {modalCopy.description}
            </p>
            <div className="mx-auto max-w-[220px] overflow-hidden rounded-2xl border border-body-color/15 bg-white p-3 dark:border-white/15 dark:bg-gray-950">
              <Image
                src={modalImage}
                alt={modalCopy.title}
                width={220}
                height={220}
                className="h-auto w-full rounded-xl"
                priority={false}
                unoptimized
              />
            </div>
          </div>
        </div>
      )}
      <div className="border-t border-body-color/15 py-6 text-center text-sm text-body-color dark:border-white/10 dark:text-body-color-dark">
        版权所有 有你同创智能机器人科技（北京）科技有限公司 京ICP备xxxxxxxx号-x 公安备案号：xxxxxxxxxxxxxx
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
