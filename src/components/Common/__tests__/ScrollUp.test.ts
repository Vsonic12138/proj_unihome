import assert from "node:assert/strict";
import test from "node:test";

import { scrollWindowToTop } from "../ScrollUp";

test("scrollWindowToTop falls back when scrollingElement has no scrollTo", () => {
  let fallbackCalled = false;
  const win = {
    document: {
      scrollingElement: {},
      documentElement: {},
    },
    scrollTo(left: number, top: number) {
      assert.equal(left, 0);
      assert.equal(top, 0);
      fallbackCalled = true;
    },
  };

  scrollWindowToTop(win as unknown as Window);

  assert.equal(fallbackCalled, true);
});
