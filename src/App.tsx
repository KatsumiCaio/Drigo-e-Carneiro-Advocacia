import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PracticeAreasBento } from './components/PracticeAreasBento';
import { TriageCalculator } from './components/TriageCalculator';
import { DifferentialsSection } from './components/DifferentialsSection';
import { FoundersSection } from './components/FoundersSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ConsultationModal } from './components/ConsultationModal';
import { LegalTermsModal } from './components/LegalTermsModal';
import { CookieBanner } from './components/CookieBanner';
import { ErrorBoundary } from './components/ErrorBoundary';
import { telemetry } from './lib/observability';

export default function App() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [selectedAreaForModal, setSelectedAreaForModal] = useState<string | undefined>(undefined);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'terms' | 'oab'>('privacy');

  useEffect(() => {
    telemetry.init();
  }, []);

  const handleOpenConsultation = (areaTitle?: string) => {
    setSelectedAreaForModal(areaTitle);
    setIsConsultationModalOpen(true);
  };

  const handleOpenLegalModal = (tab: 'privacy' | 'terms' | 'oab' = 'privacy') => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  const handleScrollToTriage = () => {
    const el = document.getElementById('triagem');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#120D0B] text-[#F3EFEA] flex flex-col font-sans-body selection:bg-[#D4AF37]/30 selection:text-[#FFFFFF]">
        {/* Top Header */}
        <Header onOpenConsultation={() => handleOpenConsultation()} />

        {/* Main Content */}
        <main className="flex-grow">
          {/* Hero Section */}
          <Hero
            onOpenConsultation={() => handleOpenConsultation()}
            onScrollToTriage={handleScrollToTriage}
          />

          {/* Dynamic Bento Grid Practice Areas */}
          <PracticeAreasBento onOpenConsultationWithArea={handleOpenConsultation} />

          {/* Interactive Triage & Case Diagnosis Tool */}
          <TriageCalculator />

          {/* Firm Pillars & Differentials (Sand/Off-white contrast) */}
          <DifferentialsSection />

          {/* Founding Partners Profile */}
          <FoundersSection />

          {/* Social Proof / Verified Testimonials */}
          <TestimonialsSection />

          {/* Strategic FAQ Accordion */}
          <FaqSection />

          {/* Full Contact & Office Location */}
          <ContactSection />
        </main>

        {/* Footer with OAB Compliance & Privacy Triggers */}
        <Footer onOpenLegalModal={handleOpenLegalModal} />

        {/* High-conversion Floating WhatsApp Widget */}
        <FloatingWhatsApp />

        {/* Quick Consultation Modal */}
        <ConsultationModal
          isOpen={isConsultationModalOpen}
          onClose={() => setIsConsultationModalOpen(false)}
          preselectedArea={selectedAreaForModal}
        />

        {/* Legal Governance & LGPD Modal */}
        <LegalTermsModal
          isOpen={isLegalModalOpen}
          onClose={() => setIsLegalModalOpen(false)}
          initialTab={legalModalTab}
        />

        {/* LGPD Cookie Consent Banner */}
        <CookieBanner onOpenPrivacyModal={() => handleOpenLegalModal('privacy')} />
      </div>
    </ErrorBoundary>
  );
}
