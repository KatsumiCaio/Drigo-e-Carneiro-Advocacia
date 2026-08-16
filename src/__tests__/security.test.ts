import { describe, it, expect, beforeEach } from 'vitest';
import { RateLimiter, sanitizeInput, isValidPhone, isValidEmail, isSafeExternalUrl } from '../lib/security';

describe('Security & Rate Limiting Module', () => {
  let limiter: RateLimiter;

  beforeEach(() => {
    limiter = new RateLimiter(3, 1000); // 3 requests per second
  });

  it('allows requests within rate limit and rejects excess', () => {
    const key = 'user_action_1';
    expect(limiter.isAllowed(key)).toBe(true);
    expect(limiter.isAllowed(key)).toBe(true);
    expect(limiter.isAllowed(key)).toBe(true);
    expect(limiter.isAllowed(key)).toBe(false); // 4th request exceeds maxRequests = 3
  });

  it('calculates remaining timeout when rate limited', () => {
    const key = 'user_action_2';
    limiter.isAllowed(key);
    limiter.isAllowed(key);
    limiter.isAllowed(key);
    expect(limiter.isAllowed(key)).toBe(false);
    expect(limiter.getRemainingTime(key)).toBeGreaterThanOrEqual(0);
  });

  it('sanitizes malicious script tags and HTML injection', () => {
    const dirty = '<script>alert("xss")</script><img src="x" onerror="steal()" />';
    const clean = sanitizeInput(dirty);
    expect(clean).not.toContain('<script>');
    expect(clean).toContain('&lt;script&gt;');
    expect(clean).toContain('&lt;img');
  });

  it('validates Brazilian phone numbers correctly', () => {
    expect(isValidPhone('(11) 99876-5432')).toBe(true);
    expect(isValidPhone('11998765432')).toBe(true);
    expect(isValidPhone('(21) 3456-7890')).toBe(true);
    expect(isValidPhone('123')).toBe(false);
    expect(isValidPhone('invalid')).toBe(false);
  });

  it('validates email addresses strictly', () => {
    expect(isValidEmail('contato@drigoecarneiro.com')).toBe(true);
    expect(isValidEmail('cliente.teste+juridico@gmail.com.br')).toBe(true);
    expect(isValidEmail('plainaddress')).toBe(false);
    expect(isValidEmail('@missingusername.com')).toBe(false);
  });

  it('validates safe external URLs against phishing redirects', () => {
    expect(isSafeExternalUrl('https://wa.me/5511998765432')).toBe(true);
    expect(isSafeExternalUrl('https://maps.google.com/?q=Av+Paulista')).toBe(true);
    expect(isSafeExternalUrl('https://evil-phishing-site.com/steal-data')).toBe(false);
    expect(isSafeExternalUrl('not-a-valid-url')).toBe(false);
  });
});
