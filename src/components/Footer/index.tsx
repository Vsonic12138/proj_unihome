import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/config";
import { withLocalePath } from "@/i18n/utils";

const socialLinks = [
  {
    href: "https://www.bilibili.com/",
    label: "哔哩哔哩",
    icon: "/images/icons/bilibili.svg",
  },
  {
    href: "https://qm.qq.com/",
    label: "QQ群",
    icon: "/images/icons/qq.svg",
  },
  {
    href: "https://mp.weixin.qq.com/",
    label: "微信公众号",
    icon: "/images/icons/wechat.svg",
  },
];

type FooterProps = {
  copy: Dictionary["footer"];
  socialLabel: string;
  homeHref: string;
  locale: Locale;
};

const Footer = ({ copy, socialLabel, homeHref, locale }: FooterProps) => {
  const columns = [
    copy.columns.usefulLinks,
    copy.columns.terms,
    copy.columns.support,
  ];

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
              <div className="flex items-center">
                {socialLinks.map((link, index) => {
                  const href = withLocalePath(locale, link.href);
                  const aria = `${socialLabel}：${link.label}`;
                  return (
                    <a
                      key={link.label}
                      href={href}
                      aria-label={aria}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary ${
                        index !== socialLinks.length - 1 ? "mr-6" : ""
                      }`}
                    >
                      <span className="inline-flex h-6 w-6 items-center justify-center">
                        <Image
                          src={link.icon}
                          alt={link.label}
                          width={24}
                          height={24}
                          className="h-6 w-6 transition dark:invert dark:brightness-0"
                        />
                      </span>
                    </a>
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
