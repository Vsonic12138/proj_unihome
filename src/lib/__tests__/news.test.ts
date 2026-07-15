import assert from "node:assert/strict";
import test from "node:test";

import {
  buildNewsDetailPath,
  buildPublishedNewsWhere,
  clampNewsShowcaseLimit,
  formatNewsDate,
  getNewsPathSuffix,
  getNewsCategoryTranslationKey,
  isNewsCategory,
  isValidNewsSlug,
  normalizeNewsListItem,
  upsertNewsShowcaseBlock,
} from "../news";

test("buildNewsDetailPath always keeps frontend routes locale-prefixed", () => {
  assert.equal(buildNewsDetailPath("en", "launch"), "/en/news/launch");
  assert.equal(buildNewsDetailPath("invalid", "launch"), "/zh/news/launch");
  assert.equal(
    buildNewsDetailPath("ja", "legacy launch"),
    "/ja/news/legacy%20launch",
  );
  assert.equal(getNewsPathSuffix("legacy launch"), "/news/legacy%20launch");
});

test("isValidNewsSlug accepts URL-safe slugs only", () => {
  assert.equal(isValidNewsSlug("product-launch-2026"), true);
  assert.equal(isValidNewsSlug("Product Launch"), false);
  assert.equal(isValidNewsSlug("launch/2026"), false);
  assert.equal(isValidNewsSlug("launch?draft=true"), false);
});

test("clampNewsShowcaseLimit uses the configured 1-6 range", () => {
  assert.equal(clampNewsShowcaseLimit(undefined), 3);
  assert.equal(clampNewsShowcaseLimit("invalid"), 3);
  assert.equal(clampNewsShowcaseLimit(0), 3);
  assert.equal(clampNewsShowcaseLimit(1), 1);
  assert.equal(clampNewsShowcaseLimit("4"), 4);
  assert.equal(clampNewsShowcaseLimit(12), 6);
});

test("news categories expose stable translation keys", () => {
  assert.equal(isNewsCategory("company"), true);
  assert.equal(isNewsCategory("industry"), true);
  assert.equal(isNewsCategory("media"), true);
  assert.equal(isNewsCategory("other"), false);
  assert.equal(getNewsCategoryTranslationKey("company"), "category.company");
  assert.equal(getNewsCategoryTranslationKey("unknown"), "category.generic");
});

test("formatNewsDate formats supported locales and rejects invalid values", () => {
  const value = "2026-07-14T12:00:00.000Z";

  assert.equal(formatNewsDate(value, "zh"), "2026年7月14日");
  assert.equal(formatNewsDate(value, "en"), "July 14, 2026");
  assert.equal(formatNewsDate(value, "ja"), "2026年7月14日");
  assert.equal(formatNewsDate("invalid", "zh"), "");
  assert.equal(formatNewsDate(null, "en"), "");
});

test("formatNewsDate keeps CMS publish dates stable across server timezones", () => {
  assert.equal(
    formatNewsDate("2026-07-13T16:30:00.000Z", "zh"),
    "2026年7月14日",
  );
});

test("buildPublishedNewsWhere combines extra filters with published status", () => {
  assert.deepEqual(buildPublishedNewsWhere({ slug: { equals: "launch" } }), {
    and: [
      { slug: { equals: "launch" } },
      { _status: { equals: "published" } },
    ],
  });
  assert.deepEqual(buildPublishedNewsWhere(), {
    _status: { equals: "published" },
  });
});

test("normalizeNewsListItem maps complete docs and drops incomplete docs", () => {
  assert.deepEqual(
    normalizeNewsListItem({
      id: 1,
      title: " Launch ",
      slug: "launch",
      category: "company",
      summary: "Summary",
      publishDate: "2026-07-14T12:00:00.000Z",
      coverImage: { url: "/media/launch.jpg", alt: "Cover" },
    }),
    {
      id: 1,
      title: "Launch",
      slug: "launch",
      category: "company",
      summary: "Summary",
      publishDate: "2026-07-14T12:00:00.000Z",
      coverImage: { url: "/media/launch.jpg", alt: "Cover" },
    },
  );

  assert.equal(normalizeNewsListItem({ title: "No slug" }), null);
  assert.equal(normalizeNewsListItem({ slug: "no-title" }), null);
});

test("upsertNewsShowcaseBlock inserts after the product area and is idempotent", () => {
  const initial = [
    { blockType: "hero" },
    { blockType: "features" },
    { blockType: "about" },
    { blockType: "contact" },
  ];
  const copy = {
    title: "Latest News",
    description: "Updates",
    limit: 3,
  };

  const first = upsertNewsShowcaseBlock(initial, copy);
  assert.deepEqual(
    first.map((block) => block.blockType),
    ["hero", "features", "newsShowcase", "about", "contact"],
  );

  const second = upsertNewsShowcaseBlock(first, copy);
  assert.equal(
    second.filter((block) => block.blockType === "newsShowcase").length,
    1,
  );
  assert.deepEqual(second, first);
});
