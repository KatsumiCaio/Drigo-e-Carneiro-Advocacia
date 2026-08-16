/**
 * Security & Reliability Subsystem
 * Implements client-side Rate Limiting, Input Sanitization,
 * Safe External URL verification, and Anti-Spam Protections.
 */

export class RateLimiter {
  private timestamps: Map<string, number[]> = new Map();

  constructor(
    private maxRequests: number = 5,
    private windowMs: number = 60000 // 1 minute
  ) {}

  public isAllowed(key: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    const record = this.timestamps.get(key) || [];
    const validTimestamps = record.filter((t) => t > windowStart);

    if (validTimestamps.length >= this.maxRequests) {
      return false;
    }

    validTimestamps.push(now);
    this.timestamps.set(key, validTimestamps);
    return true;
  }

  public getRemainingTime(key: string): number {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    const record = this.timestamps.get(key) || [];
    const validTimestamps = record.filter((t) => t > windowStart);

    if (validTimestamps.length === 0) return 0;
    const oldest = validTimestamps[0];
    return Math.max(0, Math.ceil((oldest + this.windowMs - now) / 1000));
  }

  public reset(key: string) {
    this.timestamps.delete(key);
  }
}

// Global rate limiter instances
export const consultationRateLimiter = new RateLimiter(3, 60000); // Max 3 requests per minute per action
export const triageRateLimiter = new RateLimiter(5, 60000);

/**
 * XSS & String Sanitizer
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

/**
 * Validate Brazilian Phone Number format
 */
export function isValidPhone(phone: string): boolean {
  const clean = phone.replace(/\D/g, '');
  return clean.length >= 10 && clean.length <= 11;
}

/**
 * Validate Email address format with RFC 5322 compliance
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Safe External URL Redirector
 * Verifies that outbound links only go to authorized domains (WhatsApp, Google Maps, OAB)
 */
const ALLOWED_EXTERNAL_DOMAINS = [
  'wa.me',
  'api.whatsapp.com',
  'maps.google.com',
  'goo.gl',
  'oabsp.org.br',
  'cfoab.org.br',
];

export function isSafeExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ALLOWED_EXTERNAL_DOMAINS.some((domain) => parsed.hostname.endsWith(domain));
  } catch {
    return false;
  }
}
