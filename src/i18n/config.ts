import { cache } from "react";

const dictionaryLoaders = {
  en: () => import("./locales/en"),
  zh: () => import("./locales/zh"),
  ja: () => import("./locales/ja"),
} as const;

export type Locale = keyof typeof dictionaryLoaders;
export type DictionaryModule = Awaited<ReturnType<(typeof dictionaryLoaders)[Locale]>>;
export type Dictionary = DictionaryModule["dictionary"];

export const LOCALE_COOKIE = "startup-nextjs-language";
export const DEFAULT_LOCALE: Locale = "en";
export const SUPPORTED_LOCALES = Object.keys(dictionaryLoaders) as Locale[];

export const isValidLocale = (value: unknown): value is Locale => {
  return typeof value === "string" && SUPPORTED_LOCALES.includes(value as Locale);
};

export const getDictionary = cache(async (locale: Locale): Promise<Dictionary> => {
  const dictionaryModule = await dictionaryLoaders[locale]();
  return dictionaryModule.dictionary;
});

export const preloadDictionary = (locale: Locale) => dictionaryLoaders[locale]();
