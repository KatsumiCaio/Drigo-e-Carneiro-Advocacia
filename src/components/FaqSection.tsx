import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_ITEMS, OFFICE_CONTACT } from '../data/legalData';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const filteredFaqs = activeCategory === 'todos'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter((f) => f.category === activeCategory);

  return (
    <section id="faq" className="py-20 bg-[#160E0B] relative border-b border-[#D4AF37]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#261A15] border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Dúvidas Frequentes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold text-[#FFFFFF]">
            Perguntas e Respostas Claras
          </h2>
          <p className="text-sm sm:text-base text-[#BDB5AD] mt-3 leading-relaxed">
            Entenda como funciona nosso atendimento, honorários, prazos e a documentação necessária para a análise do seu caso.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'todos', label: 'Todas as Dúvidas' },
            { id: 'atendimento', label: 'Atendimento & Online' },
            { id: 'honorarios', label: 'Honorários & Custos' },
            { id: 'prazos', label: 'Prazos Processuais' },
            { id: 'documentos', label: 'Documentação' },
          ].map((cat) => (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-medium transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gold-gradient text-[#120D0B] font-bold shadow-sm'
                  : 'bg-[#221612] text-[#C5BDB7] hover:text-[#FFFFFF] border border-[#D4AF37]/20'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Accordion List with Layout Animation */}
        <div className="space-y-3 mb-10">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <motion.div
                key={faq.id}
                layout
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-sm border transition-colors ${
                  isOpen
                    ? 'bg-[#221612] border-[#D4AF37]/60 shadow-md'
                    : 'bg-[#1A110D] border-[#D4AF37]/20 hover:border-[#D4AF37]/40'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-xs sm:text-sm font-cinzel font-bold text-[#FFFFFF]">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="shrink-0 text-[#D4AF37]"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-[#C5BDB7] leading-relaxed border-t border-[#D4AF37]/15 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Extra Contact Helper */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="p-6 rounded-sm bg-[#221612] border border-[#D4AF37]/30 text-center flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="text-left">
            <h4 className="text-sm font-cinzel font-bold text-[#FFFFFF]">
              Tem uma situação específica não listada aqui?
            </h4>
            <p className="text-xs text-[#A69E96] mt-0.5">
              Nossa equipe analisa diretamente sua dúvida pelo canal direto.
            </p>
          </div>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={`https://wa.me/${OFFICE_CONTACT.whatsappClean}?text=${encodeURIComponent('Olá! Tenho uma dúvida específica que gostaria de esclarecer com um advogado.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#120D0B] bg-gold-gradient rounded-sm gold-glow-btn shrink-0 shadow-md"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>Tirar Dúvida Agora</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
