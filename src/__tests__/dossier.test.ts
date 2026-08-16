import { describe, it, expect, vi } from 'vitest';
import { getAreaCode, generateProtocolCode, createExecutiveDossier } from '../lib/dossier';
import { telemetry } from '../lib/observability';

describe('Executive Dossier & High-Ticket Protocol Generator', () => {
  it('maps practice areas to precise 4-letter protocol tags', () => {
    expect(getAreaCode('Direito do Trabalho')).toBe('TRAB');
    expect(getAreaCode('Família e Sucessões')).toBe('FAMS');
    expect(getAreaCode('Direito do Consumidor e Saúde')).toBe('CONS');
    expect(getAreaCode('Empresarial & Contratos')).toBe('CORP');
    expect(getAreaCode('Direito Imobiliário')).toBe('IMOB');
    expect(getAreaCode('Golpes Bancários')).toBe('FINA');
    expect(getAreaCode('Outra Demanda')).toBe('EXEC');
  });

  it('generates unique valid DC-2026 protocol codes', () => {
    const code = generateProtocolCode('Direito do Trabalho');
    expect(code).toMatch(/^DC-2026-TRAB-\d{4}$/);
  });

  it('compiles high-ticket executive dossier with protocol, urgency classification and OAB confidentiality', () => {
    const trackSpy = vi.spyOn(telemetry, 'trackEvent');

    const dossier = createExecutiveDossier({
      clientName: 'Dr. Roberto Silveira',
      phone: '(11) 98765-4321',
      email: 'roberto@empresa.com',
      area: 'Direito do Trabalho',
      urgency: 'imediata',
      situationSummary: 'Demissão injusta com supressão de comissões e horas extras de cargo de confiança.',
      preferredChannel: 'Videoconferência (Meet)',
      source: 'triagem',
    });

    expect(dossier.protocol).toMatch(/^DC-2026-TRAB-\d{4}$/);
    expect(dossier.urgencyLabel).toContain('Urgência Máxima');
    expect(dossier.confidentialityNotice).toContain('Lei 8.906/94');
    expect(dossier.whatsappMessage).toContain('DOSSIÊ PRÉ-ANÁLISE EXECUTIVA');
    expect(dossier.whatsappMessage).toContain(dossier.protocol);
    expect(dossier.whatsappMessage).toContain('Dr. Roberto Silveira');
    expect(dossier.whatsappMessage).toContain('(11) 98765-4321');
    expect(dossier.whatsappUrl).toContain('https://wa.me/');
    expect(dossier.whatsappUrl).toContain(encodeURIComponent(dossier.protocol));

    expect(trackSpy).toHaveBeenCalledWith('dossier_generated', expect.objectContaining({
      protocol: dossier.protocol,
      area: 'Direito do Trabalho',
      source: 'triagem',
    }));
  });

  it('sanitizes input and falls back to safe defaults when inputs are minimal', () => {
    const dossier = createExecutiveDossier({
      clientName: '',
      area: 'Família',
      situationSummary: '',
    });

    expect(dossier.payload.clientName).toBe('Titular Interessado');
    expect(dossier.payload.situationSummary).toBe('Não especificada em texto prévio');
    expect(dossier.protocol).toMatch(/^DC-2026-FAMS-\d{4}$/);
  });
});
