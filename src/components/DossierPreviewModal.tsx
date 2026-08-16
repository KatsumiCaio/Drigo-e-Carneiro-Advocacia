import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GeneratedDossier } from '../lib/dossier';
import { LogoMonogram } from './LogoMonogram';
import { 
  X, 
  MessageCircle, 
  Copy, 
  Check, 
  ShieldCheck, 
  FileCheck2, 
  Clock, 
  Lock, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { telemetry } from '../lib/observability';

interface DossierPreviewModalProps {
  dossier: GeneratedDossier | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DossierPreviewModal: React.FC<DossierPreviewModalProps> = ({
  dossier,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!dossier) return null;

  const handleCopyProtocol = () => {
    navigator.clipboard.writeText(dossier.protocol);
    setCopied(true);
    telemetry.trackEvent('dossier_protocol_copied', { protocol: dossier.protocol });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    telemetry.trackEvent('dossier_whatsapp_opened', { protocol: dossier.protocol });
    window.open(dossier.whatsappUrl, '_blank');
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
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#19100C] border border-[#D4AF37]/50 rounded-sm max-w-xl w-full p-6 sm:p-8 shadow-2xl relative text-left"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#A69E96] hover:text-[#FFFFFF] transition-colors cursor-pointer"
              aria-label="Fechar visualização do dossiê"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with Luxury Brand */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#D4AF37]/25">
              <div className="flex items-center gap-3">
                <LogoMonogram size="sm" showText={false} />
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#D4AF37] flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    Atendimento de Alto Padrão
                  </span>
                  <h3 className="text-base sm:text-lg font-cinzel font-bold text-[#FFFFFF]">
                    Dossiê Pré-Análise DC #2026
                  </h3>
                </div>
              </div>

              {/* Status Badge */}
              <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[11px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Protocolado</span>
              </div>
            </div>

            {/* Protocol Golden Highlight Banner */}
            <div className="bg-[#241712] border border-[#D4AF37]/40 rounded-sm p-4 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#A69E96] block font-semibold">
                  Código de Atendimento Prioritário
                </span>
                <div className="font-mono text-sm sm:text-base font-bold text-[#D4AF37] tracking-wider mt-0.5">
                  {dossier.protocol}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleCopyProtocol}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#170E0B] border border-[#D4AF37]/30 text-xs text-[#E6E0DA] hover:text-[#FFFFFF] hover:border-[#D4AF37] transition-all cursor-pointer w-fit"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Copiar Protocolo</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Summary Details Grid */}
            <div className="space-y-3 mb-5 text-xs">
              <div className="p-3.5 rounded-sm bg-[#140D0A] border border-[#D4AF37]/15 space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#C5BDB7]">
                  <div>
                    <span className="text-[#8C827A] block text-[11px]">Titular do Caso:</span>
                    <strong className="text-[#FFFFFF]">{dossier.payload.clientName}</strong>
                  </div>
                  <div>
                    <span className="text-[#8C827A] block text-[11px]">Área Jurídica:</span>
                    <strong className="text-[#D4AF37]">{dossier.areaFormatted}</strong>
                  </div>
                  <div>
                    <span className="text-[#8C827A] block text-[11px]">Enquadramento / Urgência:</span>
                    <span className="text-[#E6E0DA] font-medium">{dossier.urgencyLabel}</span>
                  </div>
                  <div>
                    <span className="text-[#8C827A] block text-[11px]">Data de Emissão:</span>
                    <span className="text-[#A69E96]">{dossier.createdAtFormatted}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#D4AF37]/10">
                  <span className="text-[#8C827A] block text-[11px] mb-0.5">Síntese Fática Registrada:</span>
                  <p className="text-[#E5C378] italic text-xs leading-relaxed">
                    "{dossier.payload.situationSummary}"
                  </p>
                </div>
              </div>

              {/* Confidentiality & OAB Seal */}
              <div className="flex items-start gap-2 text-[11px] text-[#A69E96] bg-[#140D0A]/60 p-2.5 rounded-sm border border-[#D4AF37]/10">
                <Lock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{dossier.confidentialityNotice}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOpenWhatsApp}
                type="button"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#120D0B] bg-gold-gradient rounded-sm gold-glow-btn cursor-pointer shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Conectar no WhatsApp com Dossiê</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
              </motion.button>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3 text-xs text-[#A69E96] hover:text-[#FFFFFF] border border-[#D4AF37]/20 rounded-sm hover:border-[#D4AF37]/50 transition-colors cursor-pointer"
              >
                Concluir
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
