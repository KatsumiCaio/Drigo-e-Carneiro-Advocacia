import React from 'react';
import { motion } from 'motion/react';
import { FIRM_DIFFERENTIALS } from '../data/legalData';
import { UserCheck, MessageSquareText, Globe, Lock, Shield } from 'lucide-react';

export const DifferentialsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-[#D4AF37]" />;
      case 'MessageSquareText':
        return <MessageSquareText className="w-6 h-6 text-[#D4AF37]" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-[#D4AF37]" />;
      case 'Lock':
        return <Lock className="w-6 h-6 text-[#D4AF37]" />;
      default:
        return <Shield className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="diferenciais" className="py-20 bg-[#FBF9F5] text-[#262626] relative border-b border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Off-White Sand Elegance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#EFE9DF] border border-[#D4AF37]/40 text-xs font-bold uppercase tracking-widest text-[#855D28] mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Padrão de Atendimento</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold text-[#1F1410]">
            Por que confiar seu caso ao Drigo & Carneiro?
          </h2>
          <p className="text-sm sm:text-base text-[#5C534D] mt-3 leading-relaxed">
            Unimos o rigor técnico das grandes bancas jurídicas com o cuidado individualizado e a agilidade que a sua causa exige.
          </p>
        </motion.div>

        {/* Dynamic 4 Differentials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FIRM_DIFFERENTIALS.map((diff, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, borderColor: '#D4AF37' }}
              className="p-6 sm:p-7 rounded-sm bg-[#FFFFFF] border border-[#E5DEC9] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-sm bg-[#1F1410] flex items-center justify-center mb-5 border border-[#D4AF37]/40 shadow-inner">
                  {getIcon(diff.iconName)}
                </div>

                <h3 className="text-base font-cinzel font-bold text-[#1F1410] mb-3">
                  {diff.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5C534D] leading-relaxed">
                  {diff.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EFE9DF] flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#A67C52]">
                <span>Pilar 0{idx + 1} de Excelência</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner inside Light Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-12 p-6 rounded-sm bg-[#1F1410] text-[#F3EFEA] border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-cinzel font-bold text-[#FFFFFF]">
                Transparência e Previsibilidade Financeira
              </h4>
              <p className="text-xs text-[#C5BDB7]">
                Sem custos ocultos ou surpresas. Contratos detalhados com total clareza antes do início de qualquer medida.
              </p>
            </div>
          </div>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#contato"
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#120D0B] bg-gold-gradient rounded-sm gold-glow-btn shrink-0 text-center shadow-md"
          >
            Falar com a Equipe
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
