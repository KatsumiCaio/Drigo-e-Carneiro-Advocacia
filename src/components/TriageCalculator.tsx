import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OFFICE_CONTACT } from '../data/legalData';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  MessageCircle, 
  Briefcase, 
  Users, 
  ShieldAlert, 
  Scale, 
  Building2,
  FileText,
  Loader2,
  ShieldCheck,
  Lock,
  FileCheck2
} from 'lucide-react';
import { createExecutiveDossier, GeneratedDossier } from '../lib/dossier';
import { DossierPreviewModal } from './DossierPreviewModal';

export const TriageCalculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedArea, setSelectedArea] = useState<string>('trabalhista');
  const [urgency, setUrgency] = useState<'imediata' | 'dias' | 'preventiva'>('imediata');
  const [caseDescription, setCaseDescription] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'call' | 'presencial'>('whatsapp');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [generatedDossier, setGeneratedDossier] = useState<GeneratedDossier | null>(null);
  const [showDossierModal, setShowDossierModal] = useState<boolean>(false);

  const areasList = [
    {
      id: 'trabalhista',
      label: 'Direito do Trabalho',
      icon: <Briefcase className="w-4 h-4" />,
      subOptions: [
        'Demissão recente e cálculo de verbas rescisórias',
        'Horas extras não pagas e jornada abusiva',
        'Assédio moral ou rescisão indireta',
        'Pejotização (trabalhava como PJ com rotina de CLT)',
        'Cargo de confiança / bancário sem horas extras'
      ]
    },
    {
      id: 'familia',
      label: 'Família & Sucessões',
      icon: <Users className="w-4 h-4" />,
      subOptions: [
        'Abertura de Inventário (Cartório ou Judicial)',
        'Divórcio e partilha de patrimônio/bens',
        'Pensão alimentícia e guarda de menores',
        'Planejamento sucessório e proteção de bens familiares'
      ]
    },
    {
      id: 'consumidor',
      label: 'Consumidor & Saúde',
      icon: <ShieldAlert className="w-4 h-4" />,
      subOptions: [
        'Negativa de cirurgia, prótese ou exame pelo plano',
        'Fornecimento de medicamento de alto custo',
        'Golpe financeiro / Fraude eletrônica em banco',
        'Inclusão indevida no SPC/Serasa ou cobrança abusiva'
      ]
    },
    {
      id: 'empresarial',
      label: 'Empresarial & Contratos',
      icon: <Scale className="w-4 h-4" />,
      subOptions: [
        'Cobrança e execução de títulos inadimplidos',
        'Revisão e elaboração de contratos societários',
        'Prevenção de passivos trabalhistas corporativos'
      ]
    },
    {
      id: 'imobiliario',
      label: 'Direito Imobiliário',
      icon: <Building2 className="w-4 h-4" />,
      subOptions: [
        'Atraso na entrega de imóvel na planta / Distrato',
        'Ação de Usucapião e regularização de matrícula',
        'Despejo e contratos de locação comercial'
      ]
    }
  ];

  const currentAreaObj = areasList.find((a) => a.id === selectedArea) || areasList[0];

  const handleGoToStep3 = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setCurrentStep(3);
    }, 380);
  };

  const handleFinishTriage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dossier = createExecutiveDossier({
      clientName: clientName || 'Cliente Interessado',
      area: currentAreaObj.label,
      urgency,
      situationSummary: caseDescription || 'Solicitou análise personalizada com advogado especialista.',
      preferredChannel: preferredContact === 'whatsapp' ? 'WhatsApp Direto' : preferredContact === 'call' ? 'Videoconferência (Meet)' : 'Presencial (Av. Paulista)',
      source: 'triagem',
    });

    setGeneratedDossier(dossier);

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(dossier.whatsappUrl, '_blank');
    }, 450);
  };

  const stepSlideVariants = {
    initial: { opacity: 0, x: 16 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, x: -16, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="triagem" className="py-20 bg-[#120D0B] relative border-b border-[#D4AF37]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#261A15] border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ferramenta de Triagem Rápida</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#FFFFFF]">
            Diagnóstico Jurídico Preliminar
          </h2>
          <p className="text-xs sm:text-sm text-[#A69E96] mt-2">
            Identifique em 3 passos o enquadramento do seu caso e receba orientação inicial prioritária.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-tobacco-card border border-[#D4AF37]/30 rounded-sm p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Progress Bar Line */}
          <div className="relative mb-8 pb-6 border-b border-[#D4AF37]/20">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center gap-2.5">
                  <motion.div
                    animate={{
                      scale: currentStep === step ? 1.08 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold font-cinzel transition-colors ${
                      currentStep === step
                        ? 'bg-gold-gradient text-[#120D0B] ring-4 ring-[#D4AF37]/20 shadow-md'
                        : currentStep > step
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#2A1C16] text-[#A69E96] border border-[#D4AF37]/20'
                    }`}
                  >
                    {currentStep > step ? '✓' : step}
                  </motion.div>
                  <span className="text-xs font-medium hidden sm:inline text-[#E6E0DA]">
                    {step === 1 ? 'Área do Direito' : step === 2 ? 'Situação & Urgência' : 'Estratégia & Contato'}
                  </span>
                </div>
              ))}
            </div>

            {/* Visual Step Fill Bar */}
            <div className="w-full bg-[#1F1410] h-1 mt-4 overflow-hidden rounded-full border border-[#D4AF37]/10">
              <motion.div
                className="h-full bg-gold-gradient"
                initial={{ width: '33.33%' }}
                animate={{
                  width: currentStep === 1 ? '33.33%' : currentStep === 2 ? '66.66%' : '100%',
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>

          {/* Calculating Loading Interstitial */}
          {isCalculating && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
              <div className="space-y-1">
                <p className="text-sm font-cinzel font-bold text-[#FFFFFF]">Processando Diagnóstico...</p>
                <p className="text-xs text-[#A69E96]">Cruzando enquadramento com a matriz decisória do escritório</p>
              </div>
            </div>
          )}

          {/* AnimatePresence for Smooth Step Transitions */}
          {!isCalculating && (
            <AnimatePresence mode="wait">
              {/* STEP 1: Escolha da Área */}
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  variants={stepSlideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <h3 className="text-base sm:text-lg font-cinzel font-semibold text-[#FFFFFF] mb-4">
                    1. Qual é o foco principal da sua necessidade jurídica?
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {areasList.map((area) => (
                      <motion.button
                        key={area.id}
                        type="button"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedArea(area.id)}
                        className={`flex items-center gap-3 p-4 rounded-sm border text-left transition-colors cursor-pointer ${
                          selectedArea === area.id
                            ? 'bg-[#2A1C16] border-[#D4AF37] text-[#FFFFFF] shadow-md'
                            : 'bg-[#150E0C] border-[#D4AF37]/20 text-[#C5BDB7] hover:border-[#D4AF37]/50'
                        }`}
                      >
                        <div className={`p-2 rounded-sm ${selectedArea === area.id ? 'bg-[#D4AF37] text-[#120D0B]' : 'bg-[#261A15] text-[#D4AF37]'}`}>
                          {area.icon}
                        </div>
                        <span className="text-xs sm:text-sm font-semibold">{area.label}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#120D0B] bg-gold-gradient rounded-sm gold-glow-btn cursor-pointer shadow-md"
                    >
                      <span>Avançar para Situação</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Detalhamento do Cenário e Urgência */}
              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  variants={stepSlideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <h3 className="text-base sm:text-lg font-cinzel font-semibold text-[#FFFFFF] mb-2">
                    2. Selecione o cenário que mais se aproxima do seu caso:
                  </h3>
                  <p className="text-xs text-[#A69E96] mb-4">
                    Área selecionada: <strong className="text-[#D4AF37]">{currentAreaObj.label}</strong>
                  </p>

                  <div className="space-y-2 mb-6">
                    {currentAreaObj.subOptions.map((opt, idx) => (
                      <motion.button
                        key={idx}
                        type="button"
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setCaseDescription(opt)}
                        className={`w-full p-3 rounded-sm border text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          caseDescription === opt
                            ? 'bg-[#2A1C16] border-[#D4AF37] text-[#FFFFFF]'
                            : 'bg-[#150E0C] border-[#D4AF37]/15 text-[#C5BDB7] hover:border-[#D4AF37]/40'
                        }`}
                      >
                        <span>{opt}</span>
                        {caseDescription === opt && <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />}
                      </motion.button>
                    ))}
                  </div>

                  <div className="mb-6">
                    <label className="block text-xs font-semibold text-[#E6E0DA] mb-2">
                      Qual é a urgência temporal para solução?
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'imediata', label: 'Imediata (24h)', icon: <Clock className="w-3.5 h-3.5 text-red-400" /> },
                        { id: 'dias', label: 'Esta Semana', icon: <Clock className="w-3.5 h-3.5 text-amber-400" /> },
                        { id: 'preventiva', label: 'Preventiva', icon: <Clock className="w-3.5 h-3.5 text-blue-400" /> },
                      ].map((u) => (
                        <motion.button
                          key={u.id}
                          type="button"
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setUrgency(u.id as any)}
                          className={`p-2.5 rounded-sm border text-center text-xs flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                            urgency === u.id
                              ? 'bg-[#2A1C16] border-[#D4AF37] text-[#FFFFFF]'
                              : 'bg-[#150E0C] border-[#D4AF37]/15 text-[#A69E96]'
                          }`}
                        >
                          {u.icon}
                          <span className="font-medium">{u.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#D4AF37]/15">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="inline-flex items-center gap-1.5 text-xs text-[#A69E96] hover:text-[#FFFFFF] transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Voltar</span>
                    </button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleGoToStep3}
                      className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#120D0B] bg-gold-gradient rounded-sm gold-glow-btn cursor-pointer shadow-md"
                    >
                      <span>Ver Diagnóstico e Conectar</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Diagnóstico e Encaminhamento WhatsApp com prioridade */}
              {currentStep === 3 && (
                <motion.form
                  key="step-3"
                  variants={stepSlideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  onSubmit={handleFinishTriage}
                >
                  <div className="bg-[#150E0C] border border-[#D4AF37]/35 rounded-sm p-4 sm:p-5 mb-6 relative overflow-hidden shadow-lg">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                        <FileCheck2 className="w-4 h-4 text-[#D4AF37]" />
                        <span>Dossiê Pré-Análise DC #2026</span>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-sm border border-emerald-500/30 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Protocolo Prioritário
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#C5BDB7]">
                      <div>Área Técnica: <strong className="text-[#FFFFFF]">{currentAreaObj.label}</strong></div>
                      <div>Classificação: <strong className="text-[#FFFFFF]">{urgency === 'imediata' ? 'Urgência Máxima (24h)' : urgency === 'dias' ? 'Alta Prioridade' : 'Preventiva'}</strong></div>
                      <div className="sm:col-span-2 mt-1">Cenário Informado: <strong className="text-[#E5C378]">{caseDescription || 'Análise personalizada com advogado'}</strong></div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#D4AF37]/15 flex items-center justify-between text-[11px] text-[#A69E96]">
                      <span className="flex items-center gap-1">
                        <Lock className="w-3 h-3 text-[#D4AF37]" />
                        Sigilo Profissional OAB / LGPD
                      </span>
                      <span className="font-mono text-[#D4AF37]">Roteamento Direto aos Sócios</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-xs font-semibold text-[#E6E0DA] mb-1.5">
                        Seu Nome Completo para Emissão do Dossiê *:
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Ex: Carlos Eduardo Silveira"
                        className="w-full px-4 py-3 text-xs sm:text-sm bg-[#180F0C] border border-[#D4AF37]/30 rounded-sm text-[#FFFFFF] placeholder-[#7A7067] focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#E6E0DA] mb-1.5">
                        Canal de Atendimento Preferencial:
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'whatsapp', label: 'WhatsApp Direto' },
                          { id: 'call', label: 'Videoconferência' },
                          { id: 'presencial', label: 'Presencial (Paulista)' },
                        ].map((p) => (
                          <motion.button
                            key={p.id}
                            type="button"
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setPreferredContact(p.id as any)}
                            className={`p-2.5 rounded-sm border text-center text-xs font-medium transition-colors cursor-pointer ${
                              preferredContact === p.id
                                ? 'bg-[#2A1C16] border-[#D4AF37] text-[#FFFFFF]'
                                : 'bg-[#180F0C] border-[#D4AF37]/15 text-[#A69E96]'
                            }`}
                          >
                            {p.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#D4AF37]/15">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="inline-flex items-center gap-1.5 text-xs text-[#A69E96] hover:text-[#FFFFFF] transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Voltar</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#120D0B] bg-gold-gradient rounded-sm gold-glow-btn cursor-pointer shadow-md disabled:opacity-75"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Gerando Dossiê Executivo...</span>
                          </>
                        ) : (
                          <>
                            <MessageCircle className="w-4 h-4 fill-current" />
                            <span>Conectar no WhatsApp com Dossiê</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Dossier Preview Modal */}
      <DossierPreviewModal
        dossier={generatedDossier}
        isOpen={showDossierModal}
        onClose={() => setShowDossierModal(false)}
      />
    </section>
  );
};
