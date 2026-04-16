import type { MetadataRoute } from "next";
import { getPublicServerUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const serverUrl = getPublicServerUrl({ requireInProduction: true })!;
  const isProduction = process.env.NODE_ENV === "production";

  return {
    rules: [
      {
        userAgent: "*",
        allow: isProduction ? "/" : undefined,
        disallow: isProduction ? ["/api/", "/admin/"] : ["/"],
      },
    ],
    sitemap: `${serverUrl}/sitemap.xml`,
  };
}
