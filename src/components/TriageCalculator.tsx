import React, { useState } from 'react';
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
  FileText
} from 'lucide-react';

export const TriageCalculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedArea, setSelectedArea] = useState<string>('trabalhista');
  const [urgency, setUrgency] = useState<'imediata' | 'dias' | 'preventiva'>('imediata');
  const [caseDescription, setCaseDescription] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'call' | 'presencial'>('whatsapp');

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

  const handleFinishTriage = (e: React.FormEvent) => {
    e.preventDefault();
    const areaName = currentAreaObj.label;
    const urgencyLabel = urgency === 'imediata' ? 'Urgência Máxima (24h)' : urgency === 'dias' ? 'Nos próximos dias' : 'Consulta Preventiva';
    
    const formattedMsg = `*Diagnóstico Preliminar - Drigo e Carneiro Advocacia*\n\n` +
      `*Nome:* ${clientName || 'Cliente'}\n` +
      `*Área:* ${areaName}\n` +
      `*Prioridade:* ${urgencyLabel}\n` +
      `*Situação Informada:* ${caseDescription || 'Não especificada em texto'}\n` +
      `*Preferência de Atendimento:* ${preferredContact.toUpperCase()}\n\n` +
      `Gostaria de agendar a análise com o advogado especialista.`;

    const whatsappUrl = `https://wa.me/${OFFICE_CONTACT.whatsappClean}?text=${encodeURIComponent(formattedMsg)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="triagem" className="py-20 bg-[#120D0B] relative border-b border-[#D4AF37]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#261A15] border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-3">
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
        <div className="bg-tobacco-card border border-[#D4AF37]/30 rounded-sm p-6 sm:p-10 shadow-2xl relative">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#D4AF37]/20">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold font-cinzel ${
                    currentStep === step
                      ? 'bg-gold-gradient text-[#120D0B] ring-4 ring-[#D4AF37]/20'
                      : currentStep > step
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#2A1C16] text-[#A69E96] border border-[#D4AF37]/20'
                  }`}
                >
                  {currentStep > step ? '✓' : step}
                </div>
                <span className="text-xs font-medium hidden sm:inline text-[#E6E0DA]">
                  {step === 1 ? 'Área do Direito' : step === 2 ? 'Situação & Urgência' : 'Estratégia & Contato'}
                </span>
              </div>
            ))}
          </div>

          {/* STEP 1: Escolha da Área */}
          {currentStep === 1 && (
            <div className="animate-in fade-in duration-200">
              <h3 className="text-base sm:text-lg font-cinzel font-semibold text-[#FFFFFF] mb-4">
                1. Qual é o foco principal da sua necessidade jurídica?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {areasList.map((area) => (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setSelectedArea(area.id)}
                    className={`flex items-center gap-3 p-4 rounded-sm border text-left transition-all ${
                      selectedArea === area.id
                        ? 'bg-[#2A1C16] border-[#D4AF37] text-[#FFFFFF] shadow-md'
                        : 'bg-[#150E0C] border-[#D4AF37]/20 text-[#C5BDB7] hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <div className={`p-2 rounded-sm ${selectedArea === area.id ? 'bg-[#D4AF37] text-[#120D0B]' : 'bg-[#261A15] text-[#D4AF37]'}`}>
                      {area.icon}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold">{area.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#120D0B] bg-gold-gradient rounded-sm gold-glow-btn"
                >
                  <span>Avançar para Situação</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Detalhamento do Cenário e Urgência */}
          {currentStep === 2 && (
            <div className="animate-in fade-in duration-200">
              <h3 className="text-base sm:text-lg font-cinzel font-semibold text-[#FFFFFF] mb-2">
                2. Selecione o cenário que mais se aproxima do seu caso:
              </h3>
              <p className="text-xs text-[#A69E96] mb-4">Área selecionada: <strong className="text-[#D4AF37]">{currentAreaObj.label}</strong></p>

              <div className="space-y-2 mb-6">
                {currentAreaObj.subOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCaseDescription(opt)}
                    className={`w-full p-3 rounded-sm border text-left text-xs flex items-center justify-between transition-all ${
                      caseDescription === opt
                        ? 'bg-[#2A1C16] border-[#D4AF37] text-[#FFFFFF]'
                        : 'bg-[#150E0C] border-[#D4AF37]/15 text-[#C5BDB7] hover:border-[#D4AF37]/40'
                    }`}
                  >
                    <span>{opt}</span>
                    {caseDescription === opt && <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />}
                  </button>
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
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => setUrgency(u.id as any)}
                      className={`p-2.5 rounded-sm border text-center text-xs flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
                        urgency === u.id
                          ? 'bg-[#2A1C16] border-[#D4AF37] text-[#FFFFFF]'
                          : 'bg-[#150E0C] border-[#D4AF37]/15 text-[#A69E96]'
                      }`}
                    >
                      {u.icon}
                      <span className="font-medium">{u.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#D4AF37]/15">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#A69E96] hover:text-[#FFFFFF]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#120D0B] bg-gold-gradient rounded-sm gold-glow-btn"
                >
                  <span>Ver Diagnóstico e Conectar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Diagnóstico e Encaminhamento WhatsApp com prioridade */}
          {currentStep === 3 && (
            <form onSubmit={handleFinishTriage} className="animate-in fade-in duration-200">
              <div className="bg-[#150E0C] border border-[#D4AF37]/30 rounded-sm p-4 sm:p-5 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-2">
                  <FileText className="w-4 h-4" />
                  <span>Resumo do seu Enquadramento Jurídico</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#C5BDB7]">
                  <div>Área: <strong className="text-[#FFFFFF]">{currentAreaObj.label}</strong></div>
                  <div>Urgência: <strong className="text-[#FFFFFF]">{urgency === 'imediata' ? 'Urgente / Liminar' : urgency === 'dias' ? 'Alta prioridade' : 'Preventiva'}</strong></div>
                  <div className="sm:col-span-2 mt-1">Cenário: <strong className="text-[#E5C378]">{caseDescription || 'Análise personalizada com advogado'}</strong></div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-[#E6E0DA] mb-1.5">
                    Seu Nome Completo para Identificação:
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ex: Carlos Eduardo Silveira"
                    className="w-full px-4 py-3 text-xs sm:text-sm bg-[#180F0C] border border-[#D4AF37]/30 rounded-sm text-[#FFFFFF] placeholder-[#7A7067] focus:outline-none focus:border-[#D4AF37]"
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
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPreferredContact(p.id as any)}
                        className={`p-2.5 rounded-sm border text-center text-xs font-medium transition-all ${
                          preferredContact === p.id
                            ? 'bg-[#2A1C16] border-[#D4AF37] text-[#FFFFFF]'
                            : 'bg-[#180F0C] border-[#D4AF37]/15 text-[#A69E96]'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#D4AF37]/15">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#A69E96] hover:text-[#FFFFFF]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#120D0B] bg-gold-gradient rounded-sm gold-glow-btn"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Enviar Diagnóstico e Iniciar Conversa</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </section>
  );
};
