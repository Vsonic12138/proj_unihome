import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

function buildRemotePatterns() {
  const patterns = [
    {
      // Payload Media（本地开发）
      protocol: "http",
      hostname: "localhost",
      port: "3000",
      pathname: "/media/**",
    },
  ];

  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
  if (!serverURL) {
    return patterns;
  }

  try {
    const parsed = new URL(serverURL);
    patterns.push({
      protocol: parsed.protocol.replace(":", ""),
      hostname: parsed.hostname,
      port: parsed.port,
      pathname: "/media/**",
    });
  } catch {
    // Ignore invalid deployment URL here and let runtime env validation handle it.
  }

  return patterns;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: buildRemotePatterns(),
  },
  // 生产环境禁用 source map，防止源码泄露
  productionBrowserSourceMaps: false,
};

export default withNextIntl(nextConfig);
