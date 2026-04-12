import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Payload Media（本地开发）
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/media/**",
      },
      // 生产环境请在此追加实际部署域名（protocol: "https", hostname: "yourdomain.com"）
    ],
  },
  // 生产环境禁用 source map，防止源码泄露
  productionBrowserSourceMaps: false,
};

export default withNextIntl(nextConfig);
