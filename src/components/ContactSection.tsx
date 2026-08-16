import React, { useState } from 'react';
import { OFFICE_CONTACT, PRACTICE_AREAS } from '../data/legalData';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  ShieldCheck, 
  CheckCircle2,
  Calendar,
  Building,
  FileCheck2,
  Lock,
  Sparkles
} from 'lucide-react';
import { createExecutiveDossier, GeneratedDossier } from '../lib/dossier';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState('Trabalhista');
  const [message, setMessage] = useState('');
  const [channel, setChannel] = useState('WhatsApp');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastDossier, setLastDossier] = useState<GeneratedDossier | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const dossier = createExecutiveDossier({
      clientName: name,
      phone,
      email,
      area,
      preferredChannel: channel,
      situationSummary: message || 'Solicitou atendimento com a coordenação de sócios.',
      source: 'formulario_contato',
    });

    setLastDossier(dossier);

    // Open whatsapp after brief feedback
    setTimeout(() => {
      window.open(dossier.whatsappUrl, '_blank');
    }, 850);
  };

  return (
    <section id="contato" className="py-20 bg-[#120D0B] relative border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#261A15] border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Agendamento e Atendimento</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold text-[#FFFFFF]">
            Inicie a Defesa dos Seus Direitos
          </h2>
          <p className="text-sm sm:text-base text-[#BDB5AD] mt-3 leading-relaxed">
            Preencha o formulário abaixo para receber uma análise preliminar ou entre em contato diretamente pelo WhatsApp do plantão.
          </p>
        </div>

        {/* 2 Column Layout: Info/Location & Consultation Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Office Details (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="p-6 sm:p-7 rounded-sm bg-tobacco-card border border-[#D4AF37]/30 shadow-xl">
              <h3 className="text-lg font-cinzel font-bold text-[#FFFFFF] mb-5 pb-3 border-b border-[#D4AF37]/20">
                Canais de Atendimento Direto
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${OFFICE_CONTACT.whatsappClean}?text=${encodeURIComponent(OFFICE_CONTACT.whatsappDefaultMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-3 rounded-sm bg-[#170E0B] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all group"
                >
                  <div className="p-2 rounded-sm bg-emerald-950/80 text-emerald-400 border border-emerald-800/40 shrink-0">
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#A69E96] block uppercase tracking-wider font-semibold">
                      WhatsApp Oficial (Plantão)
                    </span>
                    <span className="font-bold text-[#FFFFFF] group-hover:text-[#D4AF37] transition-colors">
                      {OFFICE_CONTACT.whatsapp}
                    </span>
                  </div>
                </a>

                {/* Telephone */}
                <a
                  href={`tel:${OFFICE_CONTACT.phoneClean}`}
                  className="flex items-start gap-3.5 p-3 rounded-sm bg-[#170E0B] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all group"
                >
                  <div className="p-2 rounded-sm bg-[#261A15] text-[#D4AF37] border border-[#D4AF37]/30 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#A69E96] block uppercase tracking-wider font-semibold">
                      Telefone Fixo
                    </span>
                    <span className="font-bold text-[#FFFFFF] group-hover:text-[#D4AF37] transition-colors">
                      {OFFICE_CONTACT.phone}
                    </span>
                  </div>
                </a>

                {/* E-mail */}
                <a
                  href={`mailto:${OFFICE_CONTACT.email}`}
                  className="flex items-start gap-3.5 p-3 rounded-sm bg-[#170E0B] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all group"
                >
                  <div className="p-2 rounded-sm bg-[#261A15] text-[#D4AF37] border border-[#D4AF37]/30 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#A69E96] block uppercase tracking-wider font-semibold">
                      E-mail Institucional
                    </span>
                    <span className="font-bold text-[#FFFFFF] group-hover:text-[#D4AF37] transition-colors break-all">
                      {OFFICE_CONTACT.email}
                    </span>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-3.5 p-3 rounded-sm bg-[#170E0B] border border-[#D4AF37]/20">
                  <div className="p-2 rounded-sm bg-[#261A15] text-[#D4AF37] border border-[#D4AF37]/30 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#A69E96] block uppercase tracking-wider font-semibold">
                      Endereço da Sede
                    </span>
                    <p className="text-xs text-[#DCD4CD] leading-relaxed">
                      {OFFICE_CONTACT.address}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5 p-3 rounded-sm bg-[#170E0B] border border-[#D4AF37]/20">
                  <div className="p-2 rounded-sm bg-[#261A15] text-[#D4AF37] border border-[#D4AF37]/30 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#A69E96] block uppercase tracking-wider font-semibold">
                      Horário de Funcionamento
                    </span>
                    <p className="text-xs text-[#DCD4CD] leading-relaxed">
                      {OFFICE_CONTACT.hours}
                    </p>
                  </div>
                </div>

              </div>

              {/* OAB Badge Note */}
              <div className="mt-6 pt-4 border-t border-[#D4AF37]/15 flex items-center gap-2 text-[11px] text-[#A69E96]">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{OFFICE_CONTACT.oabRegistration}</span>
              </div>
            </div>

            {/* Presencial vs Online Info */}
            <div className="p-5 rounded-sm bg-[#19100C] border border-[#D4AF37]/20 flex items-start gap-3">
              <Building className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <div className="text-xs text-[#BDB5AD]">
                <strong className="text-[#FFFFFF] block mb-1">Atendimento Flexível</strong>
                Atendemos presencialmente na Av. Paulista com horário marcado ou por videoconferência com segurança de ponta a ponta.
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Consultation Request Form (7 Columns) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-sm bg-tobacco-card border border-[#D4AF37]/30 shadow-2xl relative">
              
              <div className="mb-6 pb-4 border-b border-[#D4AF37]/20">
                <h3 className="text-xl font-cinzel font-bold text-[#FFFFFF]">
                  Solicitar Avaliação com Advogado
                </h3>
                <p className="text-xs text-[#A69E96] mt-1">
                  Retorno prioritário em até 24 horas úteis. Total sigilo assegurado por lei.
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-10 text-center animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <span className="text-[11px] uppercase font-bold tracking-widest text-[#D4AF37] block mb-1">
                    {lastDossier?.protocol ? `Protocolo Exclusivo: ${lastDossier.protocol}` : 'Dossiê Pré-Análise DC #2026'}
                  </span>
                  <h4 className="text-lg font-cinzel font-bold text-[#FFFFFF] mb-2">
                    Dossiê Gerado e Encaminhado!
                  </h4>
                  <p className="text-xs text-[#C5BDB7] max-w-md mx-auto mb-6 leading-relaxed">
                    Você está sendo redirecionado para o WhatsApp com seu protocolo prioritário sob sigilo profissional.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-[#D4AF37] hover:underline cursor-pointer"
                  >
                    Enviar nova mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#E6E0DA] mb-1.5">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: João da Silva"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#160E0B] border border-[#D4AF37]/25 rounded-sm text-[#FFFFFF] placeholder-[#6E645B] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#E6E0DA] mb-1.5">
                        Telefone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(11) 99999-9999"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#160E0B] border border-[#D4AF37]/25 rounded-sm text-[#FFFFFF] placeholder-[#6E645B] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#E6E0DA] mb-1.5">
                        E-mail (opcional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="joao@email.com"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#160E0B] border border-[#D4AF37]/25 rounded-sm text-[#FFFFFF] placeholder-[#6E645B] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#E6E0DA] mb-1.5">
                        Área de Interesse
                      </label>
                      <select
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#160E0B] border border-[#D4AF37]/25 rounded-sm text-[#FFFFFF] focus:outline-none focus:border-[#D4AF37]"
                      >
                        {PRACTICE_AREAS.map((a) => (
                          <option key={a.id} value={a.title} className="bg-[#160E0B] text-[#FFFFFF]">
                            {a.title}
                          </option>
                        ))}
                        <option value="Outra Demanda" className="bg-[#160E0B] text-[#FFFFFF]">Outra Demanda</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#E6E0DA] mb-1.5">
                      Preferência de Contato
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['WhatsApp', 'Ligação Telefônica', 'Videoconferência'].map((ch) => (
                        <button
                          key={ch}
                          type="button"
                          onClick={() => setChannel(ch)}
                          className={`py-2 px-2 text-center text-xs font-medium rounded-sm border transition-all ${
                            channel === ch
                              ? 'bg-[#2A1C16] border-[#D4AF37] text-[#FFFFFF]'
                              : 'bg-[#160E0B] border-[#D4AF37]/20 text-[#A69E96]'
                          }`}
                        >
                          {ch}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#E6E0DA] mb-1.5">
                      Resumo da Sua Dúvida ou Situação (Opcional)
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Descreva brevemente o que aconteceu ou as dúvidas que possui..."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#160E0B] border border-[#D4AF37]/25 rounded-sm text-[#FFFFFF] placeholder-[#6E645B] focus:outline-none focus:border-[#D4AF37] resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      id="contact-submit-btn"
                      className="w-full py-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#120D0B] bg-gold-gradient rounded-sm gold-glow-btn"
                    >
                      <Send className="w-4 h-4 fill-current" />
                      <span>Solicitar Contato e Conectar ao WhatsApp</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8A8076] text-center pt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Seus dados estão protegidos pela LGPD e sob sigilo ético da OAB.</span>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
