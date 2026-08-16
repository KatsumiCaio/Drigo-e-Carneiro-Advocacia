import { describe, it, expect } from 'vitest';
import { PRACTICE_AREAS, OFFICE_CONTACT, FOUNDING_PARTNERS, FAQ_ITEMS, TESTIMONIALS } from '../data/legalData';

describe('Legal Domain Data Integrity & Triage Matrix', () => {
  it('contains all essential practice areas with OAB compliance attributes', () => {
    expect(PRACTICE_AREAS.length).toBeGreaterThanOrEqual(4);
    
    const laborArea = PRACTICE_AREAS.find((a) => a.id === 'trabalhista');
    expect(laborArea).toBeDefined();
    expect(laborArea?.isFeatured).toBe(true);
    expect(laborArea?.urgencyLevel).toBe('alta');
    expect(laborArea?.whatsappPreset).toContain('Direito do Trabalho');
  });

  it('contains verified founding lawyers data with valid OAB numbers', () => {
    expect(FOUNDING_PARTNERS.length).toBe(2);
    for (const lawyer of FOUNDING_PARTNERS) {
      expect(lawyer.name).toBeDefined();
      expect(lawyer.oab).toContain('OAB/SP');
      expect(lawyer.specialties.length).toBeGreaterThan(0);
    }
  });

  it('contains complete office contact and address details', () => {
    expect(OFFICE_CONTACT.phone).toBeDefined();
    expect(OFFICE_CONTACT.whatsappClean).toMatch(/^\d+$/);
    expect(OFFICE_CONTACT.email).toContain('@');
    expect(OFFICE_CONTACT.address).toContain('São Paulo');
  });

  it('has populated FAQ items and client testimonials', () => {
    expect(FAQ_ITEMS.length).toBeGreaterThanOrEqual(4);
    expect(TESTIMONIALS.length).toBeGreaterThanOrEqual(3);
  });
});
