/**
 * Cookie Consent Management Utilities
 *
 * Handles user consent for cookies in compliance with GDPR/CCPA.
 * Supports multiple cookie categories with extensible architecture for future analytics integration.
 */

/**
 * Cookie categories following GDPR classification
 */
export type CookieCategory =
  | 'necessary'   // Essential for website functionality (e.g., session, security)
  | 'functional'  // Enhance user experience (e.g., language preference)
  | 'analytics'   // Usage statistics (e.g., Google Analytics) - future use
  | 'marketing';  // Advertising and tracking - future use

/**
 * User consent status
 */
export type ConsentStatus = 'accepted' | 'rejected' | null;

/**
 * Cookie consent configuration
 */
const CONSENT_CONFIG = {
  cookieName: 'cookie-consent-status',
  cookieMaxAge: 31536000, // 365 days in seconds
  cookiePath: '/',
  cookieSameSite: 'Strict' as const,
} as const;

/**
 * Get current consent status from cookie
 * @returns 'accepted', 'rejected', or null if not set
 */
export const getConsentStatus = (): ConsentStatus => {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split(';');
  const consentCookie = cookies.find(cookie =>
    cookie.trim().startsWith(`${CONSENT_CONFIG.cookieName}=`)
  );

  if (!consentCookie) return null;

  const value = consentCookie.split('=')[1]?.trim();
  if (value === 'accepted' || value === 'rejected') {
    return value;
  }

  return null;
};

/**
 * Set consent status and save to cookie
 * @param status - User consent decision
 */
export const setConsentStatus = (status: 'accepted' | 'rejected'): void => {
  if (typeof document === 'undefined') return;

  const cookieString = [
    `${CONSENT_CONFIG.cookieName}=${status}`,
    `max-age=${CONSENT_CONFIG.cookieMaxAge}`,
    `path=${CONSENT_CONFIG.cookiePath}`,
    `SameSite=${CONSENT_CONFIG.cookieSameSite}`,
  ].join('; ');

  document.cookie = cookieString;

  // Backup to localStorage in case cookies are disabled
  try {
    localStorage.setItem(CONSENT_CONFIG.cookieName, status);
  } catch (e) {
    console.warn('Failed to save consent to localStorage:', e);
  }
};

/**
 * Reset consent status (useful for testing or allowing users to change their mind)
 */
export const resetConsent = (): void => {
  if (typeof document === 'undefined') return;

  // Delete cookie by setting max-age to 0
  document.cookie = `${CONSENT_CONFIG.cookieName}=; max-age=0; path=${CONSENT_CONFIG.cookiePath}`;

  // Clear localStorage backup
  try {
    localStorage.removeItem(CONSENT_CONFIG.cookieName);
  } catch (e) {
    console.warn('Failed to remove consent from localStorage:', e);
  }
};

/**
 * Check if the consent banner should be displayed
 * @returns true if banner should be shown
 */
export const shouldShowBanner = (): boolean => {
  return getConsentStatus() === null;
};

/**
 * Enable functional cookies (e.g., language preference)
 * This is called when user accepts cookies
 */
export const enableFunctionalCookies = (): void => {
  // Currently, language preference cookie is already enabled
  // This function is here for future extensibility
  console.log('[Cookie Consent] Functional cookies enabled');
};

/**
 * Enable analytics cookies (e.g., Google Analytics)
 * This is called when user accepts cookies
 * Currently a placeholder for future integration
 */
export const enableAnalyticsCookies = (): void => {
  // Placeholder for Google Analytics or other analytics tools
  // Example implementation when GA is added:
  //
  // if (typeof window.gtag !== 'undefined') {
  //   window.gtag('consent', 'update', {
  //     analytics_storage: 'granted'
  //   });
  // }

  console.log('[Cookie Consent] Analytics cookies enabled (placeholder)');
};

/**
 * Disable analytics cookies when user rejects non-essential cookies
 */
export const disableAnalyticsCookies = (): void => {
  // Placeholder for analytics opt-out
  // Example:
  // if (typeof window.gtag !== 'undefined') {
  //   window.gtag('consent', 'update', {
  //     analytics_storage: 'denied'
  //   });
  // }

  console.log('[Cookie Consent] Analytics cookies disabled (placeholder)');
};

/**
 * Get consent for a specific cookie category
 * @param category - Cookie category to check
 * @returns true if category is allowed
 */
export const hasConsentForCategory = (category: CookieCategory): boolean => {
  const status = getConsentStatus();

  // Necessary cookies are always allowed
  if (category === 'necessary') return true;

  // Functional cookies (like language preference) are allowed for both 'accepted' and 'rejected'
  // since they improve user experience without tracking
  if (category === 'functional') return true;

  // Analytics and marketing require explicit acceptance
  return status === 'accepted';
};
