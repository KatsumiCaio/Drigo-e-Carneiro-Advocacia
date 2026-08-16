import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, ShieldCheck, Scale, ArrowRight, Clock } from 'lucide-react';
import { OFFICE_CONTACT, FIRM_STATISTICS } from '../data/legalData';
import { LogoMonogram } from './LogoMonogram';

interface HeroProps {
  onOpenConsultation: () => void;
  onScrollToTriage: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onScrollToTriage }) => {
  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 bg-[#120D0B] border-b border-[#D4AF37]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center"
        >
          {/* Main Hero Copy - 7 Columns */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Prestige Tag */}
            <motion.div
              variants={itemVariants}
              className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-[#D4AF37]/30 bg-[#19100C]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                Boutique Jurídica de Alto Padrão • São Paulo
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-[3.1rem] font-bold text-[#FFFFFF] leading-[1.15] mb-6"
            >
              Excelência Técnica. <br />
              <span className="font-editorial font-normal italic text-[#E5C378]">Defesa Intransigente</span> do seu Legado.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg text-[#C5BDB7] font-normal leading-relaxed mb-8 max-w-xl"
            >
              Atuamos na intersecção entre o rigor técnico e o pensamento estratégico, garantindo a proteção de seus direitos mais vitais com discrição e atendimento direto pelos sócios.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10"
            >
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`https://wa.me/${OFFICE_CONTACT.whatsappClean}?text=${encodeURIComponent(OFFICE_CONTACT.whatsappDefaultMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-primary-whatsapp-btn"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#120D0B] bg-[#D4AF37] hover:bg-[#E5C378] transition-colors rounded-sm cursor-pointer shadow-sm text-center"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Falar com um Especialista</span>
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onScrollToTriage}
                id="hero-triage-btn"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#F3EFEA] hover:text-[#D4AF37] bg-transparent border border-[#D4AF37]/35 hover:border-[#D4AF37] transition-colors rounded-sm cursor-pointer text-center"
              >
                <span>Avaliar Meu Caso Online</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </motion.button>
            </motion.div>

            {/* Minimal Trust Checkmarks */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#D4AF37]/15 w-full text-xs text-[#A69E96]"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Sigilo Absoluto OAB</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Plantão e Retorno em 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Atuação em Todo o Brasil</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Minimalist Executive Firm Card (5 Columns) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 relative mt-4 lg:mt-0"
          >
            <div className="p-7 sm:p-9 bg-[#170F0C] border border-[#D4AF37]/25 rounded-sm shadow-xl text-left">
              {/* Monogram and Firm Info */}
              <div className="flex items-center justify-between pb-5 border-b border-[#D4AF37]/15">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold block">
                    Banca de Advocacia
                  </span>
                  <h2 className="text-xl font-cinzel font-bold text-[#FFFFFF] mt-0.5">
                    Drigo & Carneiro
                  </h2>
                  <p className="text-[11px] text-[#A69E96]">
                    Av. Paulista, 2073 • Bela Vista, SP
                  </p>
                </div>
                <LogoMonogram size="sm" showText={false} />
              </div>

              {/* Core Executive Commitments */}
              <div className="py-6 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                  <div>
                    <h3 className="text-xs font-semibold text-[#FFFFFF]">
                      Atuação Exclusiva pelos Sócios
                    </h3>
                    <p className="text-[11px] text-[#A69E96] mt-0.5 leading-relaxed">
                      Seu caso é conduzido diretamente por advogados sêniores, sem delegação a estagiários ou terceiros.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                  <div>
                    <h3 className="text-xs font-semibold text-[#FFFFFF]">
                      Parecer Técnico Preliminar
                    </h3>
                    <p className="text-[11px] text-[#A69E96] mt-0.5 leading-relaxed">
                      Triagem detalhada e diagnóstico jurídico fundamentado antes de qualquer contratação.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                  <div>
                    <h3 className="text-xs font-semibold text-[#FFFFFF]">
                      Transparência e Previsibilidade
                    </h3>
                    <p className="text-[11px] text-[#A69E96] mt-0.5 leading-relaxed">
                      Contratos claros com estimativa realista de riscos, prazos e expectativas processuais.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="pt-5 border-t border-[#D4AF37]/15 flex items-center justify-between gap-3">
                <div className="text-[11px] text-[#A69E96]">
                  <span>OAB/SP 42.180</span>
                </div>
                <button
                  onClick={onOpenConsultation}
                  type="button"
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-[#FFFFFF] border border-[#D4AF37]/35 hover:border-[#D4AF37] rounded-sm transition-colors cursor-pointer"
                >
                  Agendar Triagem
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Minimalist Statistics Bar */}
        <div className="mt-14 pt-10 border-t border-[#D4AF37]/15 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {FIRM_STATISTICS.map((stat, idx) => (
            <div
              key={idx}
              className="text-left"
            >
              <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[#E5C378] mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-[#FFFFFF] mb-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-[#8C827A] leading-snug">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
