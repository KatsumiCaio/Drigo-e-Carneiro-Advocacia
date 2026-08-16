import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LegalTermsModal } from '../components/LegalTermsModal';
import { LogoMonogram } from '../components/LogoMonogram';

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
});
