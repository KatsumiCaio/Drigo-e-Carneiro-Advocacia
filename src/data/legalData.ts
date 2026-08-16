import { PracticeArea, LawyerPartner, Testimonial, FaqItem } from '../types';

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'trabalhista',
    title: 'Direito do Trabalho Estratégico',
    tagline: 'Defesa incisiva de direitos trabalhistas de executivos, bancários e profissionais',
    description: 'Atuação robusta em reclamatórias trabalhistas de alta complexidade, rescisões indiretas, equiparação salarial, horas extras não quitadas, estabilidades e assédio moral corporativo.',
    detailedPoints: [
      'Cálculo minucioso de verbas rescisórias e passivos ocultos',
      'Defesa de bancários, gestores e cargos de confiança indevidamente enquadrados',
      'Ações por assédio moral, perseguição e danos existenciais no ambiente corporativo',
      'Reconhecimento de vínculo empregatício e pejotização ilícita',
      'Acidentes de trabalho e doenças ocupacionais com incapacidade laborativa'
    ],
    commonCases: [
      'Demissão sem justa causa com verbas incompletas',
      'Jornada exaustiva sem o devido pagamento de horas extras e DSR',
      'Cobrança abusiva de metas com prejuízo à saúde física e mental',
      'Fraude na contratação como PJ quando existia subordinação real'
    ],
    urgencyLevel: 'alta',
    whatsappPreset: 'Olá, gostaria de agendar uma consulta sobre Direito do Trabalho. Tenho dúvidas sobre minhas verbas e direitos rescisórios.',
    isFeatured: true,
    gridSpan: 'md:col-span-2 md:row-span-2',
    iconName: 'Briefcase'
  },
  {
    id: 'familia',
    title: 'Família e Planejamento Sucessório',
    tagline: 'Preservação de patrimônio e resolução humanizada de conflitos',
    description: 'Condução estratégica de divórcios judiciais e extrajudiciais, partilhas de bens complexas, inventários ágeis, pensão alimentícia, guarda e holding patrimonial familiar.',
    detailedPoints: [
      'Divórcios em cartório e judiciais com blindagem patrimonial justa',
      'Inventários e partilhas com busca ativa por redução tributária lícita (ITCMD)',
      'Ações revisionais e fixação de alimentos conforme binômio necessidade x possibilidade',
      'Elaboração de pactos antenupciais e contratos de convivência preventiva'
    ],
    commonCases: [
      'Necessidade de abertura de inventário dentro do prazo legal de 60 dias',
      'Divórcio litigioso com ocultação ou disputa de patrimônio',
      'Ajuste ou cobrança de pensão alimentícia em atraso'
    ],
    urgencyLevel: 'moderada',
    whatsappPreset: 'Olá, preciso de orientação jurídica sobre Direito de Família / Inventário / Divórcio.',
    isFeatured: false,
    gridSpan: 'md:col-span-1',
    iconName: 'Users'
  },
  {
    id: 'consumidor-saude',
    title: 'Direito do Consumidor & Saúde',
    tagline: 'Garantia de tratamentos médicos, cirurgias e reparações civis',
    description: 'Atuação célere com pedidos de liminares contra negativas indevidas de planos de saúde, custeio de medicamentos de alto custo, cancelamentos abusivos e fraudes bancárias.',
    detailedPoints: [
      'Liminares urgentes em 24h para fornecimento de cirurgias, UTIs e próteses',
      'Indenização por danos morais e materiais por golpes do PIX e falhas bancárias',
      'Ações contra negativa de home care e medicamentos essenciais',
      'Defesa contra cobranças indevidas e inclusões ilegais nos órgãos de proteção ao crédito'
    ],
    commonCases: [
      'Plano de saúde negou cobertura de procedimento indicado pelo médico',
      'Vítima de fraude financeira eletrônica com recusa de reembolso do banco',
      'Nome negativado indevidamente por dívida inexistente ou já quitada'
    ],
    urgencyLevel: 'alta',
    whatsappPreset: 'Olá, preciso de auxílio com urgência para uma questão de Direito do Consumidor / Negativa de Plano de Saúde.',
    isFeatured: false,
    gridSpan: 'md:col-span-1',
    iconName: 'ShieldAlert'
  },
  {
    id: 'empresarial-contratos',
    title: 'Direito Empresarial & Contratos',
    tagline: 'Segurança jurídica para decisões de negócios e cobrança de créditos',
    description: 'Assessoria preventiva e contenciosa para empresas, elaboração de contratos comerciais blindados, resolução de disputas societárias e recuperação judicial e extrajudicial de créditos.',
    detailedPoints: [
      'Elaboração e auditoria (Due Diligence) de minutas contratuais de alto valor',
      'Execução rápida de títulos judiciais e extrajudiciais para recuperação de caixa',
      'Gestão de riscos jurídicos trabalhistas e cíveis na operação empresarial',
      'Mediação de impasses entre sócios com foco na continuidade dos negócios'
    ],
    commonCases: [
      'Inadimplência recorrente de clientes com títulos não honrados',
      'Revisão de contratos com fornecedores e parceiros estratégicos',
      'Prevenção de passivos trabalhistas antes de fiscalizações'
    ],
    urgencyLevel: 'estrategica',
    whatsappPreset: 'Olá, sou empresário e gostaria de conversar sobre assessoria jurídica para minha empresa.',
    isFeatured: false,
    gridSpan: 'md:col-span-1',
    iconName: 'Scale'
  },
  {
    id: 'imobiliario',
    title: 'Direito Imobiliário & Propriedade',
    tagline: 'Regularização documental e defesa nas negociações de imóveis',
    description: 'Segurança absoluta na compra, venda e locação de bens imóveis. Ações de usucapião, rescisão contratual de compra na planta (distrato), despejo e reintegração de posse.',
    detailedPoints: [
      'Auditoria prévia completa de riscos na aquisição de imóveis urbanos e rurais',
      'Ações de usucapião extrajudicial e judicial para titularidade definitiva',
      'Devolução de quantias pagas por atraso na entrega de obras por construtoras',
      'Assessoria em contratos de locação comercial com garantias sólidas'
    ],
    commonCases: [
      'Atraso excessivo na entrega das chaves de imóvel adquirido na planta',
      'Imóvel sem escritura ou com pendências cadastrais na matrícula',
      'Inadimplência de inquilino em imóvel comercial de alto rendimento'
    ],
    urgencyLevel: 'estrategica',
    whatsappPreset: 'Olá, gostaria de avaliar um caso relacionado a Direito Imobiliário / Regularização de Imóvel.',
    isFeatured: false,
    gridSpan: 'md:col-span-1',
    iconName: 'Building2'
  }
];

export const FOUNDING_PARTNERS: LawyerPartner[] = [
  {
    name: 'Dr. Leonardo Drigo',
    role: 'Sócio-Fundador | Especialista em Direito do Trabalho e Relações Corporativas',
    oab: 'OAB/SP 384.921',
    specialties: ['Direito do Trabalho Contencioso', 'Rescisões Executivas', 'Negociações Sindicais'],
    bio: 'Com mais de uma década de dedicação exclusiva à advocacia estratégica, Dr. Leonardo Drigo destaca-se pela condução combativa e analítica de reclamatórias de alta densidade financeira. Possui histórico consolidado em sustentações orais perante Tribunais Regionais do Trabalho e instâncias superiores.',
    academicBackground: [
      'Especialista em Direito e Processo do Trabalho pela PUC',
      'Membro Efetivo da Comissão de Direito do Trabalho da OAB',
      'Autor de artigos técnicos sobre relações de trabalho modernas e pejotização'
    ],
    quote: 'A advocacia de excelência não aceita acomodação: cada detalhe probatório é construído com rigor para assegurar a justiça que o cliente merece.'
  },
  {
    name: 'Dra. Helena Carneiro',
    role: 'Sócia-Fundadora | Especialista em Direito de Família, Sucessões e Reparação Civil',
    oab: 'OAB/SP 412.508',
    specialties: ['Planejamento Sucessório', 'Inventários Complexos', 'Direito à Saúde'],
    bio: 'Reconhecida pela sensibilidade no acolhimento e firmeza técnica na defesa de interesses patrimoniais e familiares, Dra. Helena Carneiro lidera o núcleo de Direito Civil e Família. Desenvolve estratégias preventivas para minimizar desgastes emocionais e otimizar a partilha de ativos.',
    academicBackground: [
      'Pós-graduada em Direito Civil e Sucessões pela EPM',
      'Especialização em Direito Médico e da Saúde',
      'Certificação em Mediação e Resolução de Conflitos Patrimoniais'
    ],
    quote: 'Defender o patrimônio e a tranquilidade de uma família exige inteligência jurídica refinada, respeito à história das partes e agilidade decisiva.'
  }
];

export const FIRM_STATISTICS = [
  { value: '+1.400', label: 'Causas patrocinadas', description: 'Histórico de dedicação jurídica' },
  { value: '98,4%', label: 'Índice de resolutividade', description: 'Em acordos e sentenças favoráveis' },
  { value: '+R$ 38M', label: 'Preservados e recuperados', description: 'Em direitos e indenizações de clientes' },
  { value: '15+', label: 'Anos de experiência somada', description: 'Tradição e atualização permanente' }
];

export const FIRM_DIFFERENTIALS = [
  {
    title: 'Atendimento Direto com os Sócios',
    description: 'Seu caso nunca será delegado para estagiários anônimos. Você conta com a análise direta e contínua dos sócios fundadores do início ao encerramento.',
    iconName: 'UserCheck'
  },
  {
    title: 'Comunicação Transparente e Sem Juridiquês',
    description: 'Informamos o andamento do seu processo com clareza absoluta, relatórios periódicos e linguagem direta pelo WhatsApp, telefone ou reuniões.',
    iconName: 'MessageSquareText'
  },
  {
    title: 'Atuação Híbrida: Nacional e Digital',
    description: 'Estrutura 100% digital com assinatura eletrônica de documentos e videoconferências seguras, sem que você precise perder horas em deslocamento.',
    iconName: 'Globe'
  },
  {
    title: 'Sigilo Absoluto e Rigor Ético',
    description: 'Garantia irrestrita de conformidade com o Código de Ética e Disciplina da OAB e proteção integral de dados sob as diretrizes da LGPD.',
    iconName: 'Lock'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Roberto Silveira M.',
    caseType: 'Reclamatória Trabalhista - Cargo de Gestão',
    city: 'São Paulo - SP',
    rating: 5,
    comment: 'Após 12 anos dedicados a uma multinacional, fui desligado sem o reconhecimento das minhas horas extras e bônus de diretoria. O Dr. Leonardo Drigo desenhou uma estratégia impecável e conquistamos um acordo justo em menos de 8 meses.',
    verified: true,
    outcomeHighlight: 'Acordo integral e verbas retroativas quitadas'
  },
  {
    id: 'test-2',
    clientName: 'Mariana Duarte G.',
    caseType: 'Inventário Extrajudicial & Sucessão',
    city: 'Campinas - SP',
    rating: 5,
    comment: 'A perda do meu pai já era dolorosa demais para enfrentarmos uma disputa burocrática interminável. A Dra. Helena conduziu nosso inventário com uma clareza e empatia admiráveis, concluindo a partilha no cartório em tempo recorde.',
    verified: true,
    outcomeHighlight: 'Conclusão em 45 dias sem litígio familiar'
  },
  {
    id: 'test-3',
    clientName: 'Carlos Eduardo F.',
    caseType: 'Ação contra Plano de Saúde - Liminar',
    city: 'Ribeirão Preto - SP',
    rating: 5,
    comment: 'O convênio negou uma prótese vital indicada para a cirurgia da minha mãe. A equipe do Drigo e Carneiro obteve a decisão liminar na Justiça em menos de 24 horas, garantindo a realização imediata do procedimento hospitalar.',
    verified: true,
    outcomeHighlight: 'Liminar concedida em 18 horas com cirurgia realizada'
  },
  {
    id: 'test-4',
    clientName: 'Valéria Toledo de A.',
    caseType: 'Contratos Empresariais & Assessoria',
    city: 'São Paulo - SP',
    rating: 5,
    comment: 'Nossa empresa de tecnologia precisava blindar seus contratos de prestação de serviços e resolver passivos trabalhistas herdados. O escritório nos trouxe uma segurança jurídica que mudou nossa capacidade de fechar negócios.',
    verified: true,
    outcomeHighlight: 'Prevenção de litígios e contratos reestruturados'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Como funciona a primeira conversa de avaliação do meu caso?',
    answer: 'Nossa triagem inicial é confidencial e estruturada para compreender as particularidades da sua demanda. Analisamos a viabilidade jurídica, as provas existentes e os riscos envolvidos, apresentando com transparência os caminhos legais recomendados antes de qualquer contratação formal.',
    category: 'atendimento'
  },
  {
    id: 'faq-2',
    question: 'Vocês atendem clientes que residem em outras cidades ou estados?',
    answer: 'Sim. Graças ao processo 100% eletrônico do Poder Judiciário brasileiro (PJe, e-SAJ, Projudi) e à nossa infraestrutura digital de videoconferência e assinatura eletrônica com validade jurídica, atendemos clientes com máxima eficiência em todo o território nacional e brasileiros no exterior.',
    category: 'atendimento'
  },
  {
    id: 'faq-3',
    question: 'Como são calculados e cobrados os honorários advocatícios?',
    answer: 'Nossos contratos seguem rigorosamente a Tabela de Honorários da OAB/SP e os princípios de probidade. Conforme a natureza da causa (como no Direito do Trabalho ou indenizações), trabalhamos com modalidades de honorários no êxito (quota litis) ou honorários contratuais parcelados combinados com clareza prévia.',
    category: 'honorarios'
  },
  {
    id: 'faq-4',
    question: 'Quanto tempo costuma durar uma ação judicial?',
    answer: 'A duração varia de acordo com a comarca, o tribunal e a postura da parte contrária. Priorizamos sempre a via consensual (acordos extrajudiciais ou em audiência de conciliação) para buscar resoluções rápidas. Quando a via litigiosa é necessária, atuamos com diligência constante para evitar paralisações no andamento.',
    category: 'prazos'
  },
  {
    id: 'faq-5',
    question: 'Quais documentos básicos devo providenciar para iniciar a análise?',
    answer: 'Para causas trabalhistas: CTPS (digital ou física), TRCT, holerites, extrato do FGTS e eventuais mensagens/e-mails. Para família/inventário: certidões de casamento/óbito, documentos pessoais e relação de bens. Nossa equipe envia um checklist objetivo para você enviar fotos ou PDFs com facilidade.',
    category: 'documentos'
  },
  {
    id: 'faq-6',
    question: 'Como acompanho o andamento do meu processo após a contratação?',
    answer: 'Garantimos atualizações ativas a cada movimentação relevante e relatórios periódicos pelo canal exclusivo no WhatsApp. Você nunca fica sem saber o que está acontecendo com a sua causa.',
    category: 'atendimento'
  }
];

export const OFFICE_CONTACT = {
  phone: '(11) 3280-4590',
  phoneClean: '551132804590',
  whatsapp: '(11) 98765-4321',
  whatsappClean: '5511987654321',
  whatsappDefaultMsg: 'Olá! Estava navegando no site do Drigo e Carneiro Advocacia e gostaria de solicitar uma avaliação com um advogado especialista.',
  email: 'contato@drigoecarneiro.adv.br',
  address: 'Av. Paulista, 1842 - 14º Andar, Conjunto 142 - Bela Vista, São Paulo - SP',
  hours: 'Segunda a Sexta-feira: das 08h30 às 19h00 (Plantão WhatsApp para Urgências)',
  oabRegistration: 'Sociedade de Advogados devidamente inscrita na OAB/SP sob o nº 42.180'
};
