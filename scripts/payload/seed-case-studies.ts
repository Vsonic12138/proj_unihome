import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { getPayload } from "payload";
import crypto from "node:crypto";
import config from "../../payload.config";
import { caseStudiesData } from "./data/case-studies";

type Locale = "zh" | "en" | "ja";
const LOCALES: Locale[] = ["zh", "en", "ja"];

async function main() {
  const payload = await getPayload({ config });
  
  // Cleanup old case studies
  try {
     await payload.delete({
       collection: "caseStudies",
       where: { id: { exists: true } },
       overrideAccess: true,
     });
     console.log("Deleted existing case studies.");
  } catch(e) {}

  const getOrCreateMedia = async (imgPath: string) => {
     const fullPath = path.resolve(process.cwd(), imgPath);
     try {
       const stat = await fs.stat(fullPath);
       const existing = await payload.find({
           collection: "media",
           where: { filename: { equals: path.basename(imgPath) } },
           overrideAccess: true,
           limit: 1
       });
       if (existing.docs.length > 0) return existing.docs[0].id;

       const parsedFilename = path.parse(imgPath).name;
       const fileData = await fs.readFile(fullPath);
       const altText = `Case Study Image - ${parsedFilename}`;

       const doc = await payload.create({
           collection: "media",
           data: {
               alt: altText,
           },
           file: {
               data: fileData,
               mimetype: imgPath.endsWith(".png") ? "image/png" : "image/jpeg",
               name: path.basename(imgPath),
               size: fileData.byteLength,
           },
           overrideAccess: true,
       });
       return doc.id;
     } catch(e) {
       console.log("Image not found or error, skipping:", imgPath);
       return null;
     }
  };

  // Process cases and seed them backwards so that Case 1 is inserted last
  // Payload CMS default sort is createdAt descending, this makes Case 1 appear first.
  for (let idx = caseStudiesData.length - 1; idx >= 0; idx--) {
     const c = caseStudiesData[idx];
     console.log(`Seeding case category: ${c.category} (item ${idx + 1})...`);

     // Resolve cover image
     let coverMediaId: number | null = null;
     const resolvedMainImages: number[] = [];
     for (const imgPath of c.images) {
        const id = await getOrCreateMedia(imgPath);
        if (id) {
           resolvedMainImages.push(id as number);
           if (!coverMediaId) coverMediaId = id as number;
        }
     }

     const baseSlug = crypto.createHash("md5").update(c.locales.zh.title).digest("hex").substring(0, 10);

     try {
       for (const locale of LOCALES) {
         const localeData = c.locales[locale as keyof typeof c.locales];
         
         const contentNodes: any[] = [];
         
         for (const n of localeData.nodes) {
             if (n.type === "h4") {
                 contentNodes.push({
                      type: "heading",
                      tag: "h4",
                      version: 1,
                      format: "",
                      indent: 0,
                      children: [{ type: "text", version: 1, text: n.text, detail: 0, format: 0, mode: "normal", style: "" }]
                 });
             } else if (n.type === "p") {
                 const textLines = n.text.split("\n");
                 const children = textLines.map((line, index) => {
                     const isLast = index === textLines.length - 1;
                     return [
                         { type: "text", version: 1, text: line, detail: 0, format: 0, mode: "normal", style: "" },
                         // basic newline handling for payload lexical
                         ...(isLast ? [] : [{ type: "linebreak", version: 1 }])
                     ]
                 }).flat();
                 
                 contentNodes.push({
                      type: "paragraph",
                      version: 1,
                      format: "",
                      indent: 0,
                      children
                 });
             }
         }

         // Add images
         for (const imgId of resolvedMainImages) {
             contentNodes.push({
                 type: "upload",
                 version: 1,
                 relationTo: "media",
                 value: { id: imgId }
             });
         }

         if (contentNodes.length === 0) {
            contentNodes.push({
              type: "paragraph",
              version: 1,
              format: "",
              indent: 0,
              children: [{ type: "text", version: 1, text: locale === 'zh' ? "暂无详细内容" : locale === 'ja' ? "詳細内容なし" : "No details available", detail: 0, format: 0, mode: "normal", style: "" }],
            });
         }

         const content = {
            root: {
                type: "root",
                version: 1,
                format: "",
                indent: 0,
                direction: "ltr",
                children: contentNodes,
            }
         };

         const exists = await payload.find({
            collection: "caseStudies",
            where: { slug: { equals: baseSlug } },
            limit: 1,
            overrideAccess: true,
         });

         if (exists.docs.length === 0) {
            await payload.create({
               collection: "caseStudies",
               data: {
                  title: localeData.title,
                  slug: baseSlug,
                  category: c.category,
                  coverImage: coverMediaId ?? undefined,
                  content: content as any
               },
               locale,
               overrideAccess: true,
            });
         } else {
            await payload.update({
               collection: "caseStudies",
               id: exists.docs[0].id,
               data: {
                  title: localeData.title,
                  category: c.category,
                  coverImage: coverMediaId ?? undefined,
                  content: content as any
               },
               locale,
               overrideAccess: true,
            });
         }
       }
     } catch (err) {
         console.error(`Failed to create case study ${c.locales.zh.title}`, err);
     }
  }

  console.log("Seeding case studies complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Error running script", err);
  process.exit(1);
});
