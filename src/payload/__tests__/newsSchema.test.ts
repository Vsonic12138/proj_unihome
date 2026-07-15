import assert from "node:assert/strict";
import test from "node:test";

import { NewsShowcaseBlock } from "../blocks/NewsShowcaseBlock";
import { News } from "../collections/News";

function fieldByName(fields: any[], name: string): any {
  return fields.find((field) => field?.name === name);
}

test("News localizes editorial copy but keeps routing metadata shared", () => {
  const fields = News.fields as any[];

  for (const name of ["title", "summary", "content"]) {
    assert.equal(fieldByName(fields, name)?.localized, true, name);
  }

  for (const name of ["slug", "category", "coverImage", "publishDate"]) {
    assert.notEqual(fieldByName(fields, name)?.localized, true, name);
  }

  assert.equal(typeof fieldByName(fields, "slug")?.validate, "function");

  const seo = fieldByName(fields, "seo");
  assert.equal(fieldByName(seo.fields, "title")?.localized, true);
  assert.equal(fieldByName(seo.fields, "description")?.localized, true);
  assert.equal(
    typeof News.versions === "object" &&
      News.versions !== null &&
      "drafts" in News.versions,
    true,
  );
});

test("News exposes all CMS labels in Chinese, English, and Japanese", () => {
  const labels = News.labels as any;
  assert.ok(labels?.singular?.zh);
  assert.ok(labels?.singular?.en);
  assert.ok(labels?.singular?.ja);

  const category = fieldByName(News.fields as any[], "category");
  assert.deepEqual(
    category.options.map((option: any) => option.value),
    ["company", "industry", "media"],
  );
  for (const option of category.options) {
    assert.ok(option.label.zh);
    assert.ok(option.label.en);
    assert.ok(option.label.ja);
  }
});

test("NewsShowcaseBlock localizes copy and constrains its item count", () => {
  const fields = NewsShowcaseBlock.fields as any[];
  assert.equal(fieldByName(fields, "title")?.localized, true);
  assert.equal(fieldByName(fields, "description")?.localized, true);

  const limit = fieldByName(fields, "limit");
  assert.equal(limit.defaultValue, 3);
  assert.equal(limit.min, 1);
  assert.equal(limit.max, 6);
});
