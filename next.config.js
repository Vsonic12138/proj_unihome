/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  // 生产环境禁用 source map，防止源码泄露
  productionBrowserSourceMaps: false,
  // 启用 SWC 压缩（Next.js 默认启用，这里显式声明）
  swcMinify: true,
};

module.exports = nextConfig;
