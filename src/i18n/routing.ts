export const locales = ['zh', 'en', 'ja'] as const;
export const defaultLocale = 'zh';

export type Locale = (typeof locales)[number];
