import React from 'react';
import { MessageCircle, ShieldCheck, Scale, CheckCircle2, ArrowRight, Clock, Award, Sparkles } from 'lucide-react';
import { OFFICE_CONTACT, FIRM_STATISTICS } from '../data/legalData';

interface HeroProps {
  onOpenConsultation: () => void;
  onScrollToTriage: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onScrollToTriage }) => {
  return (
    <section className="relative pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden bg-tobacco-hero border-b border-[#D4AF37]/20">
      {/* Subtle luxury background elements - pure geometric & lighting, no AI slop gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#A67C52]/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Main Hero Copy - 7 Columns */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Prestige Tag */}
            <div className="mb-6 inline-flex items-center gap-2.5 px-3 py-1.5 border-l-2 border-[#D4AF37] bg-[#1F1410]/70">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                Boutique Jurídica de Alto Padrão
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#FFFFFF] leading-[1.1] mb-6">
              Excelência Jurídica. <br />
              <span className="italic font-editorial font-normal text-[#E5C378]">Defesa Intransigente</span> do seu Legado.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#F3EFEA]/80 font-normal leading-relaxed mb-8 max-w-2xl">
              Atuamos na intersecção entre o rigor técnico e o pensamento estratégico para garantir a proteção de seus interesses mais vitais com sofisticação e discrição.
            </p>

            {/* Conversion Action Buttons */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <a
                href={`https://wa.me/${OFFICE_CONTACT.whatsappClean}?text=${encodeURIComponent(OFFICE_CONTACT.whatsappDefaultMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-primary-whatsapp-btn"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-[#120D0B] bg-[#D4AF37] hover:bg-[#E5C378] transition-all gold-glow-btn text-center cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Falar com um Especialista</span>
              </a>

              <button
                onClick={onScrollToTriage}
                id="hero-triage-btn"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-[#F3EFEA] hover:text-[#D4AF37] bg-transparent border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all text-center cursor-pointer"
              >
                <span>Avaliar Meu Caso Online</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>

            {/* Trust Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6 border-t border-[#D4AF37]/15 w-full">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#C5BDB7]">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Sigilo e Ética Absolutos</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#C5BDB7]">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Resposta Rápida em 24h</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#C5BDB7]">
                <Scale className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Atuação em Todo o Brasil</span>
              </div>
            </div>
          </div>

          {/* Right Column - Luxury Brand Authority Card (5 Columns) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative p-6 sm:p-7 tobacco-bg gold-border shadow-2xl space-y-4">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold block">
                    Boutique de Alto Padrão
                  </span>
                  <h2 className="text-xl font-cinzel font-bold text-[#FFFFFF] mt-0.5">
                    Drigo & Carneiro
                  </h2>
                </div>
                <div className="w-10 h-10 border border-[#D4AF37] flex items-center justify-center transform rotate-45 bg-[#120D0B]">
                  <span className="transform -rotate-45 font-cinzel text-xs font-bold text-[#D4AF37]">DC</span>
                </div>
              </div>

              {/* Bento Grid Highlights */}
              <div className="space-y-3">
                {/* 01 Item */}
                <div className="p-4 bg-[#140D0B] gold-border">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#D4AF37] serif mb-1">
                    <span>01. ALTO IMPACTO</span>
                    <span className="text-[10px] uppercase tracking-wider text-[#A67C52] font-sans">Estratégico</span>
                  </div>
                  <h3 className="serif text-sm font-bold text-[#FFFFFF] mb-1">Direito do Trabalho Corporativo</h3>
                  <p className="text-xs text-[#F3EFEA]/70 leading-relaxed">
                    Reclamatórias de executivos, remuneração variável, blindagem e passivos de alta complexidade.
                  </p>
                </div>

                {/* 02 & 03 in 2-col mini bento */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 bg-[#140D0B] gold-border">
                    <div className="text-[10px] font-bold text-[#D4AF37] serif mb-1">02. FAMÍLIA</div>
                    <h3 className="serif text-xs font-bold text-[#FFFFFF] mb-1">Patrimônio & Sucessões</h3>
                    <p className="text-[11px] text-[#F3EFEA]/70 leading-snug">
                      Planejamento sucessório, inventários e proteção patrimonial familiar.
                    </p>
                  </div>

                  <div className="p-3.5 bg-[#140D0B] gold-border">
                    <div className="text-[10px] font-bold text-[#D4AF37] serif mb-1">03. CIVIL</div>
                    <h3 className="serif text-xs font-bold text-[#FFFFFF] mb-1">Saúde & Contencioso</h3>
                    <p className="text-[11px] text-[#F3EFEA]/70 leading-snug">
                      Liminares médicas, planos de saúde e reparações estratégicas.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Consultation Action Bar */}
              <div className="p-3.5 bg-[#120D0B] gold-border flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-[#FFFFFF]">Atendimento Direto com os Sócios</p>
                  <p className="text-[10px] text-[#D4AF37] uppercase tracking-wider">Resposta e Parecer em 24h</p>
                </div>
                <button
                  onClick={onOpenConsultation}
                  className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider bg-[#D4AF37] hover:bg-[#E5C378] text-[#120D0B] shrink-0 transition-colors cursor-pointer"
                >
                  Agendar
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#A69E96]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Atuação com sigilo absoluto e conformidade ética OAB</span>
              </div>
            </div>
          </div>

        </div>

        {/* Statistics Bar - Numbers with Solid Track Record */}
        <div className="mt-14 pt-10 border-t border-[#D4AF37]/20 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {FIRM_STATISTICS.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-sm bg-[#1A110D]/60 border border-[#D4AF37]/15 text-center sm:text-left transition-all hover:border-[#D4AF37]/40"
            >
              <div className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-gold-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#FFFFFF] mb-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-[#A69E96]">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
