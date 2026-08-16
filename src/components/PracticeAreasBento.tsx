import React, { useState } from 'react';
import { PRACTICE_AREAS, OFFICE_CONTACT } from '../data/legalData';
import { PracticeArea } from '../types';
import { 
  Briefcase, 
  Users, 
  ShieldAlert, 
  Scale, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  MessageCircle, 
  Info,
  X,
  AlertCircle
} from 'lucide-react';

interface PracticeAreasBentoProps {
  onOpenConsultationWithArea: (areaTitle: string) => void;
}

export const PracticeAreasBento: React.FC<PracticeAreasBentoProps> = ({ onOpenConsultationWithArea }) => {
  const [selectedArea, setSelectedArea] = useState<PracticeArea | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'Users':
        return <Users className="w-5 h-5" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5" />;
      case 'Scale':
        return <Scale className="w-5 h-5" />;
      case 'Building2':
        return <Building2 className="w-5 h-5" />;
      default:
        return <Scale className="w-5 h-5" />;
    }
  };

  const getUrgencyBadge = (urgency: PracticeArea['urgencyLevel']) => {
    switch (urgency) {
      case 'alta':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-red-950/70 text-red-300 border border-red-800/40">
            <AlertCircle className="w-3 h-3" />
            Urgência / Liminares
          </span>
        );
      case 'moderada':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-800/40">
            Resolução Célere
          </span>
        );
      case 'estrategica':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#2A1C16] text-[#E5C378] border border-[#D4AF37]/30">
            Estratégico / Consultivo
          </span>
        );
    }
  };

  const featuredArea = PRACTICE_AREAS.find((a) => a.isFeatured) || PRACTICE_AREAS[0];
  const regularAreas = PRACTICE_AREAS.filter((a) => !a.isFeatured);

  return (
    <section id="areas" className="py-20 bg-[#150E0C] relative border-b border-[#D4AF37]/20">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#D4AF37]/15 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#D4AF37] mb-2">
              <Scale className="w-3.5 h-3.5" />
              <span>Especialidades Jurídicas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold text-[#FFFFFF]">
              Atuação Estratégica e Especializada
            </h2>
            <p className="text-sm sm:text-base text-[#BDB5AD] mt-2 leading-relaxed">
              Cada causa é conduzida com metodologia analítica própria, desenhada especificamente para a complexidade dos seus direitos e a salvaguarda dos seus interesses.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href={`https://wa.me/${OFFICE_CONTACT.whatsappClean}?text=${encodeURIComponent('Olá! Gostaria de consultar se o escritório atende à minha necessidade jurídica.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-[#FFFFFF] transition-colors"
            >
              <span>Não encontrou sua dúvida? Fale conosco</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bento Grid Dynamic Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          
          {/* FEATURED CARD (2 columns span on large screens) - Direito Trabalhista */}
          <div
            className="md:col-span-2 p-6 sm:p-8 tobacco-bg gold-border shadow-xl relative flex flex-col justify-between group hover:border-[#D4AF37] transition-all"
          >
            <div>
              {/* Top Accent Pill */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 bg-[#120D0B] border border-[#D4AF37]/50 text-[#D4AF37]">
                    {getIcon(featuredArea.iconName)}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D4AF37] serif block">
                      01. ALTO IMPACTO
                    </span>
                    <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-[#FFFFFF]">
                      {featuredArea.title}
                    </h3>
                  </div>
                </div>
                {getUrgencyBadge(featuredArea.urgencyLevel)}
              </div>

              <p className="text-sm sm:text-base text-[#DCD4CD] font-medium mb-3">
                {featuredArea.tagline}
              </p>

              <p className="text-xs sm:text-sm text-[#F3EFEA]/70 leading-relaxed mb-6">
                {featuredArea.description}
              </p>

              {/* Key Action Points List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8 bg-[#140D0B] p-4 gold-border">
                {featuredArea.detailedPoints.slice(0, 4).map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#E6E0DA]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions for Featured Card */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#D4AF37]/20">
              <button
                onClick={() => setSelectedArea(featuredArea)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E5C378] hover:text-[#FFFFFF] underline decoration-[#D4AF37]/50 underline-offset-4 cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Ver checklist completo e orientações</span>
              </button>

              <div className="flex items-center gap-2.5">
                <a
                  href={`https://wa.me/${OFFICE_CONTACT.whatsappClean}?text=${encodeURIComponent(featuredArea.whatsappPreset)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#120D0B] bg-[#D4AF37] hover:bg-[#E5C378] transition-all gold-glow-btn cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Consultar sobre Trabalho</span>
                </a>
              </div>
            </div>
          </div>

          {/* Regular Area Cards in Bento format */}
          {regularAreas.map((area, index) => {
            const codeNumbers = ['02. FAMÍLIA', '03. SAÚDE & CONSUMIDOR', '04. EMPRESARIAL', '05. IMOBILIÁRIO'];
            const areaCode = codeNumbers[index] || `0${index + 2}. ESPECIALIDADE`;
            return (
              <div
                key={area.id}
                className="p-6 tobacco-bg gold-border shadow-lg flex flex-col justify-between hover:border-[#D4AF37] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="text-[10px] font-bold text-[#D4AF37] serif tracking-wider">
                      {areaCode}
                    </div>
                    {getUrgencyBadge(area.urgencyLevel)}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-[#120D0B] border border-[#D4AF37]/30 text-[#D4AF37]">
                      {getIcon(area.iconName)}
                    </div>
                    <h3 className="text-lg font-cinzel font-bold text-[#FFFFFF] group-hover:text-[#E5C378] transition-colors">
                      {area.title}
                    </h3>
                  </div>

                  <p className="text-xs font-medium text-[#D4AF37] mb-2">
                    {area.tagline}
                  </p>

                  <p className="text-xs text-[#F3EFEA]/70 leading-relaxed mb-4">
                    {area.description}
                  </p>

                  {/* Sub items */}
                  <div className="space-y-1.5 mb-6">
                    {area.detailedPoints.slice(0, 2).map((item, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#C5BDB7]">
                        <span className="text-[#D4AF37] font-bold">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedArea(area)}
                    className="text-[11px] font-semibold text-[#C5BDB7] hover:text-[#FFFFFF] underline decoration-[#D4AF37]/40 cursor-pointer"
                  >
                    Detalhes
                  </button>

                  <a
                    href={`https://wa.me/${OFFICE_CONTACT.whatsappClean}?text=${encodeURIComponent(area.whatsappPreset)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-[#E5C378] transition-colors cursor-pointer"
                  >
                    <span>Avaliar Caso</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}

        </div>

      </div>

      {/* Area Detailed Modal / Drawer for In-depth Case Guidance */}
      {selectedArea && (
        <div className="fixed inset-0 z-50 bg-[#120D0B]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1C120E] border border-[#D4AF37]/40 rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setSelectedArea(null)}
              className="absolute top-4 right-4 p-2 text-[#A69E96] hover:text-[#FFFFFF] rounded-sm border border-transparent hover:border-[#D4AF37]/30"
              aria-label="Fechar detalhes"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-sm bg-[#120D0B] border border-[#D4AF37]/40 text-[#D4AF37]">
                {getIcon(selectedArea.iconName)}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
                  Diretrizes e Procedimentos
                </span>
                <h3 className="text-xl font-cinzel font-bold text-[#FFFFFF]">
                  {selectedArea.title}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#D2C8C0] mb-6 leading-relaxed">
              {selectedArea.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#E5C378] mb-3">
                Situações Atendidas com Prioridade:
              </h4>
              <ul className="space-y-2">
                {selectedArea.detailedPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#E6E0DA] bg-[#140D0A] p-2.5 rounded-sm border border-[#D4AF37]/15">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#E5C378] mb-2">
                Casos Típicos para Acionamento Imediato:
              </h4>
              <div className="space-y-1.5">
                {selectedArea.commonCases.map((caseItem, idx) => (
                  <div key={idx} className="text-xs text-[#A69E96] pl-3 border-l-2 border-[#D4AF37]/40">
                    {caseItem}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                onClick={() => {
                  const areaTitle = selectedArea.title;
                  setSelectedArea(null);
                  onOpenConsultationWithArea(areaTitle);
                }}
                className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F3EFEA] border border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-sm text-center"
              >
                Agendar Reunião Prévia
              </button>

              <a
                href={`https://wa.me/${OFFICE_CONTACT.whatsappClean}?text=${encodeURIComponent(selectedArea.whatsappPreset)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#120D0B] bg-gold-gradient rounded-sm gold-glow-btn text-center"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Conversar no WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
