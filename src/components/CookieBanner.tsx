import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Cookie } from 'lucide-react';
import { telemetry } from '../lib/observability';

interface CookieBannerProps {
  onOpenPrivacyModal: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPrivacyModal }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('dc_cookie_consent_v1');
    if (!consent) {
      // Delay display slightly to prevent layout shifts on first paint
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('dc_cookie_consent_v1', JSON.stringify({ essential: true, analytics: true, date: new Date().toISOString() }));
    telemetry.addBreadcrumb('user-action', 'Accepted cookie policy');
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('dc_cookie_consent_v1', JSON.stringify({ essential: true, analytics: false, date: new Date().toISOString() }));
    telemetry.addBreadcrumb('user-action', 'Accepted essential cookies only');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Aviso de Privacidade e Cookies"
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-40 p-5 tobacco-bg gold-border shadow-2xl"
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="p-1.5 bg-[#120D0B] border border-[#D4AF37]/30 text-[#D4AF37] shrink-0 mt-0.5">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-cinzel font-bold text-[#FFFFFF] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                Privacidade e Cookies (LGPD)
              </h4>
              <p className="text-[11px] text-[#F3EFEA]/70 leading-relaxed mt-1">
                Utilizamos cookies estritamente necessários e métricas anônimas de desempenho para garantir a melhor navegação e segurança dos seus dados.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#D4AF37]/15">
            <button
              onClick={onOpenPrivacyModal}
              className="text-[10px] text-[#D4AF37] underline hover:text-[#FFFFFF] cursor-pointer"
            >
              Ver Política Completa
            </button>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleEssentialOnly}
                className="px-2.5 py-1.5 text-[10px] uppercase tracking-wider font-semibold text-[#F3EFEA]/70 hover:text-[#F3EFEA] border border-[#D4AF37]/30 hover:border-[#D4AF37] bg-[#120D0B] transition-colors cursor-pointer"
              >
                Apenas Essenciais
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAcceptAll}
                className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold text-[#120D0B] bg-[#D4AF37] hover:bg-[#E5C378] transition-colors cursor-pointer shadow-sm"
              >
                Aceitar Todos
              </motion.button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
