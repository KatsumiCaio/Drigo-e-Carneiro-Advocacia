import React from 'react';
import { LogoMonogram } from './LogoMonogram';
import { OFFICE_CONTACT } from '../data/legalData';
import { Shield, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenLegalModal?: (tab?: 'privacy' | 'terms' | 'oab') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegalModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0807] border-t border-[#D4AF37]/20 text-[#A69E96] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1F1410]">
          
          {/* Col 1: Brand & Identity (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <LogoMonogram size="md" />
            
            <p className="text-xs text-[#8A8076] leading-relaxed max-w-md pt-2">
              Escritório de advocacia pautado pela excelência técnica, ética intransigente e dedicação integral na defesa dos direitos trabalhistas, cíveis, familiares e empresariais de seus clientes.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-semibold pt-1">
              <Shield className="w-4 h-4" />
              <span>{OFFICE_CONTACT.oabRegistration}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Navegação
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#areas" className="hover:text-[#D4AF37] transition-colors">
                  Áreas de Atuação
                </a>
              </li>
              <li>
                <a href="#triagem" className="hover:text-[#D4AF37] transition-colors">
                  Diagnóstico Preliminar
                </a>
              </li>
              <li>
                <a href="#diferenciais" className="hover:text-[#D4AF37] transition-colors">
                  Padrão de Excelência
                </a>
              </li>
              <li>
                <a href="#socios" className="hover:text-[#D4AF37] transition-colors">
                  Sócios Fundadores
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="hover:text-[#D4AF37] transition-colors">
                  Casos de Sucesso
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#D4AF37] transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
              {onOpenLegalModal && (
                <>
                  <li>
                    <button
                      onClick={() => onOpenLegalModal('privacy')}
                      className="text-left text-[#D4AF37]/90 hover:text-[#FFFFFF] transition-colors cursor-pointer"
                    >
                      Política de Privacidade (LGPD)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onOpenLegalModal('terms')}
                      className="text-left text-[#D4AF37]/90 hover:text-[#FFFFFF] transition-colors cursor-pointer"
                    >
                      Termos de Uso
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onOpenLegalModal('oab')}
                      className="text-left text-[#D4AF37]/90 hover:text-[#FFFFFF] transition-colors cursor-pointer"
                    >
                      Ética OAB (Prov. 205/21)
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Col 3: Direct Contacts & Hours (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Atendimento e Sede
            </div>
            
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-[#C5BDB7]">{OFFICE_CONTACT.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-[#C5BDB7]">{OFFICE_CONTACT.phone} • {OFFICE_CONTACT.whatsapp}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-[#C5BDB7]">{OFFICE_CONTACT.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#FFFFFF] transition-colors cursor-pointer"
              >
                <span>Voltar ao topo</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Legal OAB Ethics Disclaimer (Provimento 205/2021) */}
        <div className="mt-8 pt-4 text-[11px] text-[#6E645B] leading-relaxed space-y-2">
          <p>
            <strong>Aviso Legal & Ética OAB:</strong> As informações disponibilizadas neste site possuem caráter estritamente institucional e educativo, nos termos do Provimento nº 205/2021 do Conselho Federal da Ordem dos Advogados do Brasil (CFOAB). O conteúdo não deve ser interpretado como aconselhamento jurídico definitivo nem substitui a análise individualizada de um advogado devidamente habilitado. Não há promessa ou garantia de resultados em quaisquer demandas judiciais ou administrativas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-[#1C120E] text-[10px] text-[#5C5248]">
            <p>
              © {new Date().getFullYear()} Drigo e Carneiro Advocacia. Todos os direitos reservados.
            </p>
            <p>
              Proteção de dados em conformidade com a LGPD (Lei nº 13.709/2018).
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
