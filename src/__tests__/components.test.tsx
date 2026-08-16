import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LegalTermsModal } from '../components/LegalTermsModal';
import { LogoMonogram } from '../components/LogoMonogram';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { telemetry } from '../lib/observability';

describe('UI Components Integration', () => {
  it('renders LogoMonogram with 45-degree diamond badge and title', () => {
    render(<LogoMonogram size="md" showText={true} />);
    expect(screen.getByText('DC')).toBeInTheDocument();
    expect(screen.getByText(/DRIGO/i)).toBeInTheDocument();
    expect(screen.getByText(/Advocacia Estratégica/i)).toBeInTheDocument();
  });

  it('renders LegalTermsModal with LGPD, Terms of Use, and OAB tabs', () => {
    const handleClose = vi.fn();
    render(<LegalTermsModal isOpen={true} onClose={handleClose} initialTab="privacy" />);

    expect(screen.getByText(/Termos de Uso, Privacidade e Normas Éticas OAB/i)).toBeInTheDocument();
    expect(screen.getByText(/Lei nº 13.709\/2018 - LGPD/i)).toBeInTheDocument();

    // Click on Terms tab
    const termsTab = screen.getByRole('button', { name: /Termos de Uso/i });
    fireEvent.click(termsTab);
    expect(screen.getByText(/Natureza Informativa e Consultiva/i)).toBeInTheDocument();

    // Click Close button
    const closeBtn = screen.getByRole('button', { name: /Compreendido e Fechar/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('tracks telemetry events when clicking floating WhatsApp trigger and quick message links', () => {
    const trackSpy = vi.spyOn(telemetry, 'trackEvent');

    render(<FloatingWhatsApp />);

    // Click trigger to open popover
    const trigger = screen.getByLabelText(/Atendimento via WhatsApp/i);
    fireEvent.click(trigger);

    expect(trackSpy).toHaveBeenCalledWith('whatsapp_trigger_clicked', expect.objectContaining({
      targetId: 'floating-whatsapp-trigger',
      action: 'opened_popover',
    }));

    // Check that popover appears with quick message links
    const laborOption = screen.getByText(/Direito do Trabalho/i);
    expect(laborOption).toBeInTheDocument();

    // Click quick-message link
    fireEvent.click(laborOption);

    expect(trackSpy).toHaveBeenCalledWith('whatsapp_quick_message_clicked', expect.objectContaining({
      label: expect.stringContaining('Direito do Trabalho'),
    }));
  });
});
