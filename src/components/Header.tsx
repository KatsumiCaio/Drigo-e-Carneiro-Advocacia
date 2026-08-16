import React, { useState, useEffect } from 'react';
import { LogoMonogram } from './LogoMonogram';
import { OFFICE_CONTACT } from '../data/legalData';
import { Phone, MessageCircle, Menu, X, Shield, Calendar } from 'lucide-react';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Áreas de Atuação', href: '#areas' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Os Sócios', href: '#socios' },
    { label: 'Avaliações', href: '#depoimentos' },
    { label: 'Dúvidas', href: '#faq' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <>
      {/* Top Banner with OAB Compliance & Urgent Hotline */}
      <div className="bg-[#180F0C] border-b border-[#D4AF37]/15 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-[#C5BDB7]">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[#D4AF37] font-medium">
              <Shield className="w-3.5 h-3.5" />
              <span>OAB/SP 42.180</span>
            </span>
            <span className="hidden sm:inline text-[#D4AF37]/40">|</span>
            <span className="hidden sm:inline">Atuação Estratégica em Todo o Brasil</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium">Plantão de Atendimento Ativo</span>
            </div>
            <a
              href={`tel:${OFFICE_CONTACT.phoneClean}`}
              className="hidden md:inline-flex items-center gap-1 text-[#E5C378] hover:underline"
            >
              <Phone className="w-3 h-3" />
              {OFFICE_CONTACT.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#150E0C]/95 backdrop-blur-md shadow-2xl border-b border-[#D4AF37]/20 py-3'
            : 'bg-transparent py-4 sm:py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brandmark */}
          <a href="#" className="group" aria-label="Drigo e Carneiro Advocacia">
            <LogoMonogram size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-7 shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[10px] xl:text-[11px] uppercase tracking-[0.12em] xl:tracking-[0.15em] font-semibold text-[#F3EFEA]/70 hover:text-[#D4AF37] transition-colors relative py-1 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5 xl:gap-3 shrink-0">
            <button
              onClick={onOpenConsultation}
              id="header-schedule-btn"
              className="inline-flex items-center justify-center gap-1.5 xl:gap-2 px-3 xl:px-4 py-2 xl:py-2.5 text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.1em] xl:tracking-[0.12em] text-[#F3EFEA] hover:text-[#D4AF37] border border-[#D4AF37]/40 hover:border-[#D4AF37] bg-[#1F1410]/60 hover:bg-[#1F1410] transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span className="whitespace-nowrap">Agendar Triagem</span>
            </button>

            <a
              href={`https://wa.me/${OFFICE_CONTACT.whatsappClean}?text=${encodeURIComponent(OFFICE_CONTACT.whatsappDefaultMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              id="header-whatsapp-btn"
              className="inline-flex items-center justify-center gap-1.5 xl:gap-2 px-3 xl:px-4 py-2 xl:py-2.5 text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.1em] xl:tracking-[0.12em] text-[#120D0B] bg-gold-gradient hover:brightness-110 transition-all gold-glow-btn cursor-pointer whitespace-nowrap shrink-0 shadow-md"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
              <span className="whitespace-nowrap">Falar no WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={`https://wa.me/${OFFICE_CONTACT.whatsappClean}?text=${encodeURIComponent(OFFICE_CONTACT.whatsappDefaultMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#120D0B] bg-[#D4AF37] rounded-sm"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#F3EFEA] border border-[#D4AF37]/30 rounded-sm hover:border-[#D4AF37]"
              aria-label="Menu Principal"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#120D0B]/95 backdrop-blur-xl flex flex-col pt-4 px-6 pb-8 border-b border-[#D4AF37]/30 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
            <LogoMonogram size="sm" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-[#E6E0DA] hover:text-[#D4AF37]"
              aria-label="Fechar menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-4 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-cinzel text-[#F3EFEA] hover:text-[#D4AF37] py-1 border-b border-[#2A1C16] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 text-center text-sm font-medium uppercase tracking-wider text-[#F3EFEA] border border-[#D4AF37]/40 rounded-sm"
            >
              Agendar Triagem Confidencial
            </button>

            <a
              href={`https://wa.me/${OFFICE_CONTACT.whatsappClean}?text=${encodeURIComponent(OFFICE_CONTACT.whatsappDefaultMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider text-[#120D0B] bg-gold-gradient rounded-sm gold-glow-btn"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Falar com Advogado no WhatsApp
            </a>

            <p className="text-center text-[11px] text-[#A69E96] mt-2">
              Atendimento confidencial e em estrito cumprimento às normas da OAB.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
