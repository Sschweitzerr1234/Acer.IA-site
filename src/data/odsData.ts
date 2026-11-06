export interface ODSItem {
  number: number;
  title: string;
  tagline: string;
  color: string;
  badgeColor: string;
  targetMEC: string;
  description: string;
  concreteActions: string[];
  impactMetric: string;
  impactMetricLabel: string;
}

export const odsData: ODSItem[] = [
  {
    number: 4,
    title: 'Educação de Qualidade',
    tagline: 'Letramento Crítico em IA e Superação da Caixa-Preta',
    color: '#C5192D',
    badgeColor: 'bg-red-500/10 text-red-400 border-red-500/20',
    targetMEC: 'Meta 4.4 & Diretrizes MEC (2026) para IA na Rede Federal',
    description: 'Transforma o ensino de programação no IFPR. Em vez de usar IA como gerador cego de código, o estudante atua como auditor crítico, exercitando decomposição algorítmica, verificação formal e governança sintática.',
    concreteActions: [
      'Aplicação direta nas disciplinas de Desenvolvimento Web e Engenharia de Software no IFPR Assis Chateaubriand.',
      'Desenvolvimento do pensamento computacional de ordem superior e retenção de conceitos estruturais.',
      'Metodologia pedagógica replicável para os 38 Institutos Federais do Brasil.',
    ],
    impactMetric: '84.5%',
    impactMetricLabel: 'Retenção de domínio conceitual após geração assistida',
  },
  {
    number: 8,
    title: 'Trabalho Decente & Crescimento',
    tagline: 'Capacitação Técnica de Alta Performance para o Mercado Dev',
    color: '#A21942',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    targetMEC: 'Meta 8.2 — Diversificação tecnológica e produtividade de valor agregado',
    description: 'Prepara desenvolvedores juniores para ingressarem na indústria como profissionais que não apenas consomem IA, mas sabem auditar, mitigar vulnerabilidades e prevenir débitos técnicos catastróficos nas empresas.',
    concreteActions: [
      'Redução do retrabalho com ciclos de depuração 73% mais rápidos na indústria.',
      'Formação de mão-de-obra qualificada para absorção pelas empresas de base tecnológica da região.',
      'Eliminação do "efeito júnior desamparado" na transição para a carreira de tecnologia.',
    ],
    impactMetric: '73%',
    impactMetricLabel: 'Redução média no tempo de resolução de bugs críticos',
  },
  {
    number: 9,
    title: 'Indústria, Inovação & Infraestrutura',
    tagline: 'Transferência Tecnológica para o APL de TI do Oeste Paranaense',
    color: '#FD6925',
    badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    targetMEC: 'Meta 9.5 & Transferência de Conhecimento Acadêmico-Empresarial',
    description: 'O protocolo do Aceler.IA Dev é transferido diretamente para as startups, incubadoras e software houses do Arranjo Produtivo Local (APL) de TI do Oeste do Paraná, elevando a maturidade de segurança do ecossistema.',
    concreteActions: [
      'Disponibilização do protocolo e snippets de IDE sob licenças abertas (MIT / CC-BY-SA 4.0).',
      'Workshops de capacitação para equipes de engenharia de software parceiras do campus.',
      'Padronização de auditoria de prompts para conformidade em processos de conformidade ISO/LGPD.',
    ],
    impactMetric: '120+',
    impactMetricLabel: 'Casos sintéticos e templates validados para adoção no APL',
  },
];

export const institutionalMeta = {
  institution: 'Instituto Federal de Educação, Ciência e Tecnologia do Paraná (IFPR)',
  campus: 'Campus Assis Chateaubriand (CASSISDG)',
  projectId: 'ID 4318/2026',
  fullTitle: 'Desenvolvimento e Benchmarking de um Framework de Inovação de Processos para Engenharia de Prompt Segura',
  supervisor: 'Prof. Me. Eduardo Takao',
  studentFellow: 'Bolsista / Pesquisador Discente IFPR',
  period: '2025 - 2026',
  guidelines: 'Diretrizes Estratégicas do Ministério da Educação (MEC, 2026) sobre Inteligência Artificial na Educação Profissional e Tecnológica',
};
