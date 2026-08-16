import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OFFICE_CONTACT } from '../data/legalData';
import { MessageCircle, X, Check, Shield } from 'lucide-react';
import { LogoMonogram } from './LogoMonogram';
import { telemetry } from '../lib/observability';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);

  useEffect(() => {
    // Automatically display subtle greeting popover after 4 seconds
    const timer = setTimeout(() => {
      if (!hasPrompted) {
        setIsOpen(true);
        setHasPrompted(true);
        telemetry.trackEvent('whatsapp_popover_auto_opened', { trigger: 'timer', delayMs: 4000 });
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [hasPrompted]);

  const quickMessages = [
    { label: '⚖️ Direito do Trabalho', msg: 'Olá! Preciso de orientação sobre rescisão / verbas trabalhistas.' },
    { label: '👨‍👩‍👧 Família / Inventário', msg: 'Olá! Gostaria de falar sobre inventário / divórcio.' },
    { label: '🏥 Negativa Plano de Saúde', msg: 'Olá! O plano de saúde negou um procedimento médico urgente.' },
    { label: '💼 Outro Assunto', msg: 'Olá! Gostaria de conversar com um advogado do escritório.' },
  ];

  const handleTriggerClick = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    telemetry.trackEvent('whatsapp_trigger_clicked', {
      targetId: 'floating-whatsapp-trigger',
      action: nextState ? 'opened_popover' : 'closed_popover',
      hasPrompted,
    });
  };

  const handleClosePopover = () => {
    setIsOpen(false);
    telemetry.trackEvent('whatsapp_popover_dismissed', {
      targetId: 'floating-whatsapp-close-btn',
    });
  };

  const handleQuickMessageClick = (item: typeof quickMessages[0]) => {
    telemetry.trackEvent('whatsapp_quick_message_clicked', {
      label: item.label,
      message: item.msg,
      destination: OFFICE_CONTACT.whatsappClean,
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Popover Bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-80 sm:w-88 bg-[#1C120E] border border-[#D4AF37]/40 rounded-sm shadow-2xl overflow-hidden"
          >
            {/* Popover Header */}
            <div className="bg-[#2A1C16] p-3.5 border-b border-[#D4AF37]/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <LogoMonogram size="sm" showText={false} />
                <div>
                  <h4 className="text-xs font-bold text-[#FFFFFF] font-cinzel">
                    Drigo & Carneiro
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Plantão de Atendimento Online</span>
                  </div>
                </div>
              </div>

              <button
                id="floating-whatsapp-close-btn"
                onClick={handleClosePopover}
                className="text-[#A69E96] hover:text-[#FFFFFF] p-1 cursor-pointer transition-colors"
                aria-label="Fechar popover"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Popover Body */}
            <div className="p-4 bg-[#150E0C]">
              <div className="bg-[#221612] p-3 rounded-sm border border-[#D4AF37]/15 text-xs text-[#E6E0DA] mb-3 leading-relaxed">
                Olá! Como podemos ajudar na defesa dos seus direitos hoje? Escolha um tema abaixo para atendimento imediato:
              </div>

              {/* Quick action buttons */}
              <div className="space-y-1.5">
                {quickMessages.map((item, idx) => (
                  <motion.a
                    key={idx}
                    id={`floating-whatsapp-quickmsg-${idx}`}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuickMessageClick(item)}
                    href={`https://wa.me/${OFFICE_CONTACT.whatsappClean}?text=${encodeURIComponent(item.msg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full p-2 text-left text-[11px] font-medium text-[#F3EFEA] bg-[#1F1410] hover:bg-[#2E1F19] border border-[#D4AF37]/20 hover:border-[#D4AF37] rounded-sm transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <Check className="w-3 h-3 text-[#D4AF37] opacity-60" />
                  </motion.a>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-center gap-1 text-[9px] text-[#8A8076]">
                <Shield className="w-2.5 h-2.5 text-[#D4AF37]" />
                <span>Atendimento em conformidade com as normas da OAB</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <div className="flex items-center gap-2">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1C120E]/95 border border-[#D4AF37]/30 text-xs font-semibold text-[#FFFFFF] shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Plantão WhatsApp</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleTriggerClick}
          id="floating-whatsapp-trigger"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl ring-4 ring-[#25D366]/20 relative cursor-pointer"
          aria-label="Atendimento via WhatsApp"
        >
          <MessageCircle className="w-7 h-7 fill-current" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 border-2 border-[#120D0B] rounded-full flex items-center justify-center text-[9px] font-bold">
            1
          </span>
        </motion.button>
      </div>
    </div>
  );
};
