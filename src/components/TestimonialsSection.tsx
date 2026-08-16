import React from 'react';
import { TESTIMONIALS } from '../data/legalData';
import { Star, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="depoimentos" className="py-20 bg-[#120D0B] relative border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#261A15] border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Casos e Experiências Reais</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold text-[#FFFFFF]">
            A Confiança Construída com Resultados
          </h2>
          <p className="text-sm sm:text-base text-[#BDB5AD] mt-3 leading-relaxed">
            Relatos de pessoas e empresas que tiveram seus direitos salvaguardados com determinação, ética e estratégia.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="p-6 sm:p-7 rounded-sm bg-tobacco-card border border-[#D4AF37]/25 shadow-lg flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all"
            >
              <div>
                {/* Header with stars & verified tag */}
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#D4AF37]/15">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Caso Concluído</span>
                  </span>
                </div>

                {/* Testimonial Text */}
                <p className="text-xs sm:text-sm text-[#DCD4CD] italic leading-relaxed mb-5">
                  "{test.comment}"
                </p>

                {/* Outcome Highlight Box */}
                <div className="mb-5 p-3 rounded-sm bg-[#140D0A] border border-[#D4AF37]/20 flex items-center gap-2 text-xs text-[#E5C378]">
                  <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span className="font-medium">Resultado: {test.outcomeHighlight}</span>
                </div>
              </div>

              {/* Author details */}
              <div className="pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-semibold text-[#FFFFFF]">
                    {test.clientName}
                  </h4>
                  <span className="text-[11px] text-[#A69E96]">
                    {test.caseType}
                  </span>
                </div>
                <span className="text-[11px] text-[#A69E96]">
                  {test.city}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-xs text-[#8A8076]">
          * Nomes abreviados em conformidade com o Código de Ética da OAB e a Lei Geral de Proteção de Dados (LGPD).
        </div>

      </div>
    </section>
  );
};
