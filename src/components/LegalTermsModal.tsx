import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText, Lock, CheckCircle2 } from 'lucide-react';
import { OFFICE_CONTACT } from '../data/legalData';

interface LegalTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms' | 'oab';
}

export const LegalTermsModal: React.FC<LegalTermsModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
}) => {
  const [activeTab, setActiveTab] = React.useState<'privacy' | 'terms' | 'oab'>(initialTab);

  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl max-h-[90vh] flex flex-col tobacco-bg gold-border shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-[#D4AF37]/20 flex items-center justify-between bg-[#140D0B]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-[#D4AF37] flex items-center justify-center transform rotate-45 bg-[#1F1410] shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#D4AF37] transform -rotate-45" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold block">
                    Compliance & Governança Jurídica
                  </span>
                  <h2 className="text-lg font-cinzel font-bold text-[#FFFFFF]">
                    Termos de Uso, Privacidade e Normas Éticas OAB
                  </h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-[#F3EFEA]/60 hover:text-[#D4AF37] hover:bg-[#1F1410] transition-colors cursor-pointer"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-[#D4AF37]/20 bg-[#120D0B] px-6 gap-6">
              {[
                { id: 'privacy', label: 'Política de Privacidade (LGPD)' },
                { id: 'terms', label: 'Termos de Uso' },
                { id: 'oab', label: 'Provimento OAB 205/2021' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
                    activeTab === t.id
                      ? 'border-[#D4AF37] text-[#D4AF37]'
                      : 'border-transparent text-[#F3EFEA]/60 hover:text-[#F3EFEA]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Modal Body Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#F3EFEA]/80 leading-relaxed font-sans">
              {activeTab === 'privacy' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-4 bg-[#140D0B] gold-border-subtle rounded-sm">
                    <h3 className="text-sm font-cinzel font-bold text-[#FFFFFF] mb-2 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#D4AF37]" />
                      1. Tratamento de Dados Pessoais (Lei nº 13.709/2018 - LGPD)
                    </h3>
                    <p>
                      O escritório <strong>Drigo & Carneiro Sociedade de Advogados</strong>, com sede em São Paulo/SP,
                      trata os dados pessoais fornecidos (como nome, e-mail, telefone e informações preliminares sobre o caso)
                      exclusivamente para viabilizar o contato inicial, agendamento de triagem e prestação de consultoria jurídica solicitada pelo titular.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-[#D4AF37] uppercase text-[11px] tracking-wider">
                      2. Sigilo Profissional e Segurança
                    </h4>
                    <p>
                      Todas as comunicações e documentos compartilhados com nossa equipe são protegidos por estrito dever
                      de sigilo profissional advocatício (Art. 7º, XIX do Estatuto da OAB) e criptografia de ponta a ponta.
                      Não compartilhamos nem comercializamos seus dados com terceiros sob nenhuma hipótese.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-[#D4AF37] uppercase text-[11px] tracking-wider">
                      3. Direitos do Titular (Art. 18 da LGPD)
                    </h4>
                    <p>
                      Você pode requerer a qualquer momento a confirmação da existência de tratamento, acesso aos dados, correção
                      de dados incompletos ou a eliminação definitiva de dados cadastrais enviando solicitação para o e-mail oficial:
                      <span className="text-[#D4AF37] font-semibold ml-1">{OFFICE_CONTACT.email}</span>.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'terms' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-4 bg-[#140D0B] gold-border-subtle rounded-sm">
                    <h3 className="text-sm font-cinzel font-bold text-[#FFFFFF] mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#D4AF37]" />
                      1. Natureza Informativa e Consultiva
                    </h3>
                    <p>
                      As informações disponibilizadas neste portal possuem caráter estritamente institucional e educativo.
                      O envio de formulários ou mensagens via simuladores não constitui, por si só, vínculo contratual de prestação de serviços advocatícios,
                      o qual se aperfeiçoa apenas após a celebração formal do respectivo contrato de honorários.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-[#D4AF37] uppercase text-[11px] tracking-wider">
                      2. Diagnóstico Preliminar Online
                    </h4>
                    <p>
                      A ferramenta de triagem interativa oferece uma estimativa de urgência baseada nas respostas do usuário,
                      não substituindo a consulta técnica personalizada e a análise aprofundada de documentos por advogado habilitado.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'oab' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-4 bg-[#140D0B] gold-border-subtle rounded-sm">
                    <h3 className="text-sm font-cinzel font-bold text-[#FFFFFF] mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                      Conformidade com o Provimento CFOAB nº 205/2021
                    </h3>
                    <p>
                      Esta página atende rigorosamente às diretrizes do Provimento nº 205/2021 do Conselho Federal da Ordem dos Advogados do Brasil,
                      vedando a mercantilização da profissão, a captação indevida de clientela ou a promessa de resultados garantidos.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-[#D4AF37] uppercase text-[11px] tracking-wider">
                      Identificação dos Responsáveis Técnicos
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-[#F3EFEA]/80">
                      <li><strong>Dr. Leonardo Drigo</strong> — OAB/SP 384.921</li>
                      <li><strong>Dra. Helena Carneiro</strong> — OAB/SP 412.780</li>
                      <li>Sociedade Registrada perante a OAB/SP sob nº 34.819</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#D4AF37]/20 bg-[#120D0B] flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#D4AF37] hover:bg-[#E5C378] text-[#120D0B] transition-colors cursor-pointer shadow-md"
              >
                Compreendido e Fechar
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
