import React from 'react';
import { motion } from 'motion/react';
import { FOUNDING_PARTNERS, OFFICE_CONTACT } from '../data/legalData';
import { Award, GraduationCap, MessageCircle, Quote } from 'lucide-react';

export const FoundersSection: React.FC = () => {
  return (
    <section id="socios" className="py-20 bg-[#19100C] relative border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#261A15] border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Corpo Jurídico e Liderança</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold text-[#FFFFFF]">
            Sócios Fundadores
          </h2>
          <p className="text-sm sm:text-base text-[#BDB5AD] mt-3 leading-relaxed">
            Advogados especialistas com sólida formação acadêmica, atuação nos tribunais estaduais e superiores e compromisso ético inegociável.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {FOUNDING_PARTNERS.map((partner, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, borderColor: '#D4AF37' }}
              className="p-6 sm:p-8 rounded-sm bg-[#221612] border border-[#D4AF37]/30 shadow-xl flex flex-col justify-between relative group transition-colors"
            >
              {/* Gold Top Marker */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

              <div>
                {/* Header with Name and OAB badge */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4 pb-4 border-b border-[#D4AF37]/15">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-[#FFFFFF]">
                      {partner.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-[#E5C378] mt-0.5">
                      {partner.role}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-sm bg-[#150E0C] border border-[#D4AF37]/30 text-[11px] font-bold text-[#D4AF37] tracking-wider">
                    {partner.oab}
                  </span>
                </div>

                {/* Bio text */}
                <p className="text-xs sm:text-sm text-[#C5BDB7] leading-relaxed mb-5">
                  {partner.bio}
                </p>

                {/* Academic credentials */}
                <div className="mb-5 py-3 border-y border-[#D4AF37]/10">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] mb-2">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Qualificação e Especializações</span>
                  </div>
                  <ul className="space-y-1">
                    {partner.academicBackground.map((item, i) => (
                      <li key={i} className="text-xs text-[#A69E96] flex items-start gap-2">
                        <span className="text-[#D4AF37] font-bold mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quote */}
                <div className="mb-5 pl-4 border-l border-[#D4AF37]/40 italic text-xs text-[#8C827A]">
                  "{partner.quote}"
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between">
                <span className="text-[11px] text-[#A69E96]">
                  Atendimento direto e análise prévia
                </span>
                <motion.a
                  whileHover={{ x: 2 }}
                  href={`https://wa.me/${OFFICE_CONTACT.whatsappClean}?text=${encodeURIComponent(`Olá! Gostaria de uma consulta com o ${partner.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Falar com {partner.name.split(' ')[1]}</span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
