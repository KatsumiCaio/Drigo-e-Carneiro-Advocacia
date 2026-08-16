export interface PracticeArea {
  id: string;
  title: string;
  tagline: string;
  description: string;
  detailedPoints: string[];
  commonCases: string[];
  urgencyLevel: 'alta' | 'moderada' | 'estrategica';
  whatsappPreset: string;
  isFeatured?: boolean;
  gridSpan?: string;
  iconName: string;
}

export interface LawyerPartner {
  name: string;
  role: string;
  oab: string;
  specialties: string[];
  bio: string;
  academicBackground: string[];
  quote: string;
  photoUrl?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  caseType: string;
  city: string;
  rating: number;
  comment: string;
  verified: boolean;
  outcomeHighlight: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'atendimento' | 'honorarios' | 'prazos' | 'documentos';
}

export interface TriageStep {
  areaId: string;
  subType: string;
  urgency: 'imediata' | 'proximos_dias' | 'preventiva';
  description: string;
  clientName: string;
  clientPhone: string;
}
