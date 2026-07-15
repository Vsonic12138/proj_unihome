"use client";

import { useEffect } from "react";

export function scrollWindowToTop(win: Window) {
  const target = win.document.scrollingElement ?? win.document.documentElement;

  if (typeof target?.scrollTo === "function") {
    target.scrollTo(0, 0);
    return;
  }

  win.scrollTo(0, 0);
}

export default function ScrollUp() {
  useEffect(() => scrollWindowToTop(window), []);

  return null;
}
