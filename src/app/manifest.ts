import { tryGetGlobals, tryGetPayloadClient } from "@/lib/payload";
import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const payload = await tryGetPayloadClient();
  let companyName = "UniTech";
  let description = "Advanced Robotics Solutions";

  if (payload) {
    const globals = await tryGetGlobals({
      payload,
      // fallback onto en as base language for PWA metadata
      locale: "en",
      depth: 1,
    });
    
    if (globals?.siteSettings?.companyName) {
      companyName = globals.siteSettings.companyName;
    }
    if (globals?.siteSettings?.seoDefaults?.description) {
      description = globals.siteSettings.seoDefaults.description;
    }
  }

  return {
    name: companyName,
    short_name: companyName,
    description: description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
