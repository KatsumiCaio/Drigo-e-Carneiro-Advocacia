import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OFFICE_CONTACT, PRACTICE_AREAS } from '../data/legalData';
import { X, MessageCircle, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';
import { LogoMonogram } from './LogoMonogram';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedArea?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  preselectedArea
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState(preselectedArea || 'Direito do Trabalho');
  const [preferredFormat, setPreferredFormat] = useState('Online via Google Meet');
  const [preferredDate, setPreferredDate] = useState('');
  const [briefSummary, setBriefSummary] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message = `*Solicitação de Agendamento de Triagem*\n\n` +
      `*Nome:* ${name}\n` +
      `*Telefone:* ${phone}\n` +
      `*Área:* ${area}\n` +
      `*Formato Desejado:* ${preferredFormat}\n` +
      `*Data/Horário Preferencial:* ${preferredDate || 'A combinar'}\n` +
      `*Resumo Prévio:* ${briefSummary || 'Não informado'}\n\n` +
      `Gostaria de confirmar a disponibilidade para a consulta.`;

    const whatsappUrl = `https://wa.me/${OFFICE_CONTACT.whatsappClean}?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      onClose();
      setSubmitted(false);
    }, 900);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-[#120D0B]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#1C120E] border border-[#D4AF37]/40 rounded-sm max-w-lg w-full p-6 sm:p-8 shadow-2xl relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#A69E96] hover:text-[#FFFFFF] rounded-sm transition-colors cursor-pointer"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#D4AF37]/20">
              <LogoMonogram size="sm" showText={false} />
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
                  Atendimento Jurídico
                </span>
                <h3 className="text-lg font-cinzel font-bold text-[#FFFFFF]">
                  Agendar Triagem Inicial
                </h3>
              </div>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-cinzel font-bold text-[#FFFFFF]">
                    Redirecionando para o WhatsApp...
                  </h4>
                  <p className="text-xs text-[#C5BDB7]">
                    Sua solicitação foi preparada e você falará diretamente com nossa equipe.
                  </p>
                </div>
                <Loader2 className="w-4 h-4 text-[#D4AF37] animate-spin mx-auto mt-2" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#E6E0DA] mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#140D0A] border border-[#D4AF37]/25 rounded-sm text-[#FFFFFF] placeholder-[#6E645B] focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#E6E0DA] mb-1">
                      WhatsApp / Celular *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#140D0A] border border-[#D4AF37]/25 rounded-sm text-[#FFFFFF] placeholder-[#6E645B] focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#E6E0DA] mb-1">
                      Área do Caso
                    </label>
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#140D0A] border border-[#D4AF37]/25 rounded-sm text-[#FFFFFF] focus:outline-none focus:border-[#D4AF37] transition-colors"
                    >
                      {PRACTICE_AREAS.map((a) => (
                        <option key={a.id} value={a.title} className="bg-[#140D0A] text-[#FFFFFF]">
                          {a.title}
                        </option>
                      ))}
                      <option value="Outra Demanda" className="bg-[#140D0A] text-[#FFFFFF]">Outra Demanda</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#E6E0DA] mb-1">
                      Formato de Reunião
                    </label>
                    <select
                      value={preferredFormat}
                      onChange={(e) => setPreferredFormat(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#140D0A] border border-[#D4AF37]/25 rounded-sm text-[#FFFFFF] focus:outline-none focus:border-[#D4AF37] transition-colors"
                    >
                      <option value="Online via Google Meet" className="bg-[#140D0A]">Online (Google Meet/Zoom)</option>
                      <option value="WhatsApp Mensagens/Áudio" className="bg-[#140D0A]">WhatsApp</option>
                      <option value="Presencial (Av. Paulista)" className="bg-[#140D0A]">Presencial (Av. Paulista)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#E6E0DA] mb-1">
                      Data/Horário Preferencial
                    </label>
                    <input
                      type="text"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      placeholder="Ex: Amanhã às 14h"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#140D0A] border border-[#D4AF37]/25 rounded-sm text-[#FFFFFF] placeholder-[#6E645B] focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#E6E0DA] mb-1">
                    Breve Descrição (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={briefSummary}
                    onChange={(e) => setBriefSummary(e.target.value)}
                    placeholder="Ex: Fui demitido e gostaria de calcular horas extras..."
                    className="w-full px-3.5 py-2 text-xs bg-[#140D0A] border border-[#D4AF37]/25 rounded-sm text-[#FFFFFF] placeholder-[#6E645B] focus:outline-none focus:border-[#D4AF37] resize-none transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3.5 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#120D0B] bg-gold-gradient rounded-sm gold-glow-btn cursor-pointer shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Confirmar e Iniciar no WhatsApp</span>
                  </motion.button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#8A8076] text-center">
                  <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                  <span>Garantia de sigilo profissional e proteção total de dados.</span>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
