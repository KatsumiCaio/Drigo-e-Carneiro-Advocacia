import { OFFICE_CONTACT } from '../data/legalData';
import { sanitizeInput } from './security';
import { telemetry } from './observability';

export interface DossierPayload {
  clientName: string;
  phone?: string;
  email?: string;
  area: string;
  urgency?: 'imediata' | 'dias' | 'preventiva' | string;
  situationSummary: string;
  preferredChannel?: string;
  preferredTime?: string;
  source?: 'triagem' | 'modal_agendamento' | 'formulario_contato';
}

export interface GeneratedDossier {
  protocol: string;
  createdAtFormatted: string;
  areaFormatted: string;
  urgencyLabel: string;
  confidentialityNotice: string;
  whatsappMessage: string;
  whatsappUrl: string;
  payload: DossierPayload;
}

/**
 * Maps practice area string to 4-letter protocol tag
 */
export function getAreaCode(area: string): string {
  const normalized = area.toLowerCase();
  if (normalized.includes('trab')) return 'TRAB';
  if (normalized.includes('fam') || normalized.includes('suc')) return 'FAMS';
  if (normalized.includes('cons') || normalized.includes('saúd') || normalized.includes('saud')) return 'CONS';
  if (normalized.includes('emp') || normalized.includes('societ') || normalized.includes('contrat')) return 'CORP';
  if (normalized.includes('imob') || normalized.includes('usuc')) return 'IMOB';
  if (normalized.includes('banc') || normalized.includes('golpe')) return 'FINA';
  return 'EXEC';
}

/**
 * Generates a unique, prestigious protocol code (e.g., DC-2026-TRAB-8492)
 */
export function generateProtocolCode(area: string): string {
  const year = new Date().getFullYear();
  const areaCode = getAreaCode(area);
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `DC-${year}-${areaCode}-${randomDigits}`;
}

/**
 * Compiles a formal "Dossiê Pré-Análise DC #2026" with priority VIP routing
 */
export function createExecutiveDossier(payload: DossierPayload): GeneratedDossier {
  const cleanName = sanitizeInput(payload.clientName.trim() || 'Titular Interessado');
  const cleanSummary = sanitizeInput(payload.situationSummary.trim() || 'Não especificada em texto prévio');
  const cleanPhone = payload.phone ? sanitizeInput(payload.phone.trim()) : undefined;
  const cleanEmail = payload.email ? sanitizeInput(payload.email.trim()) : undefined;
  const cleanChannel = payload.preferredChannel ? sanitizeInput(payload.preferredChannel.trim()) : 'WhatsApp Direto';
  const cleanTime = payload.preferredTime ? sanitizeInput(payload.preferredTime.trim()) : 'Disponibilidade Imediata';

  const protocol = generateProtocolCode(payload.area);
  
  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const createdAtFormatted = `${dateStr} às ${timeStr}`;

  let urgencyLabel = 'Análise Técnica Prioritária';
  if (payload.urgency === 'imediata' || payload.urgency?.toLowerCase().includes('urgente') || payload.urgency?.toLowerCase().includes('24h')) {
    urgencyLabel = '🔴 Urgência Máxima (Medida Liminar / Risco de Dano)';
  } else if (payload.urgency === 'dias' || payload.urgency?.toLowerCase().includes('semana') || payload.urgency?.toLowerCase().includes('alta')) {
    urgencyLabel = '🟡 Alta Prioridade (Atendimento em até 48h)';
  } else if (payload.urgency === 'preventiva' || payload.urgency?.toLowerCase().includes('prev')) {
    urgencyLabel = '🟢 Consultoria Estratégica & Preventiva';
  } else if (payload.urgency) {
    urgencyLabel = payload.urgency;
  }

  const confidentialityNotice = 'Documento protegido pelo Sigilo Profissional (Art. 7º, II da Lei 8.906/94 - EOAB) e pela LGPD (Lei 13.709/2018).';

  // Format high-ticket executive dossier text for WhatsApp
  const whatsappMessage = 
`🏛️ *DOSSIÊ PRÉ-ANÁLISE EXECUTIVA | DRIGO & CARNEIRO*
━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 *PROTOCOLO PRIORITÁRIO:* \`${protocol}\`
🔒 *CLASSIFICAÇÃO:* Triagem Qualificada / Confidencial
⏱️ *DATA / HORA:* ${createdAtFormatted}

👤 *DADOS DO TITULAR:*
• *Nome:* ${cleanName}
${cleanPhone ? `• *WhatsApp/Tel:* ${cleanPhone}\n` : ''}${cleanEmail ? `• *E-mail:* ${cleanEmail}\n` : ''}• *Canal Preferencial:* ${cleanChannel}
${payload.preferredTime ? `• *Horário Desejado:* ${cleanTime}\n` : ''}
⚖️ *ENQUADRAMENTO DO CASO:*
• *Área Jurídica:* ${payload.area}
• *Grau de Urgência:* ${urgencyLabel}
• *Síntese dos Fatos:* ${cleanSummary}

📋 *PARECER PRELIMINAR DE ENCAMINHAMENTO:*
Caso qualificado para análise direta com a equipe de sócios do Drigo & Carneiro Advocacia (Av. Paulista, SP).
━━━━━━━━━━━━━━━━━━━━━━━━━━
_Solicito a recepção deste protocolo para prosseguimento com o advogado responsável._`;

  const whatsappUrl = `https://wa.me/${OFFICE_CONTACT.whatsappClean}?text=${encodeURIComponent(whatsappMessage)}`;

  // Telemetry registration
  telemetry.trackEvent('dossier_generated', {
    protocol,
    area: payload.area,
    urgency: payload.urgency,
    source: payload.source || 'triagem',
  });

  return {
    protocol,
    createdAtFormatted,
    areaFormatted: payload.area,
    urgencyLabel,
    confidentialityNotice,
    whatsappMessage,
    whatsappUrl,
    payload: {
      ...payload,
      clientName: cleanName,
      situationSummary: cleanSummary,
      phone: cleanPhone,
      email: cleanEmail,
    },
  };
}
