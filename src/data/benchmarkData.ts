export interface BenchmarkMetric {
  title: string;
  category: string;
  rawRate: number;
  aceleriaRate: number;
  unit: string;
  description: string;
  trend: 'lower-is-better' | 'higher-is-better';
  differential: string;
}

export interface TestCaseSample {
  id: string;
  domain: 'Backend / APIs' | 'Frontend / UI' | 'Segurança & Auth' | 'Algoritmos & DB';
  problemStatement: string;
  rawOutcome: string;
  rawStatus: 'Falha de Compilação' | 'Vulnerabilidade Crítica' | 'Alucinação de Pacote' | 'Quebra Lógica';
  aceleriaOutcome: string;
  aceleriaStatus: 'Aprovado 1ª Rodada' | 'Seguro & Otimizado';
  cwePrevented?: string;
  testedModel: string;
}

export const benchmarkOverview = {
  totalCases: 120,
  studyContext: 'Projeto de Pesquisa & Inovação IFPR ID 4318/2026',
  institution: 'Instituto Federal do Paraná — Campus Assis Chateaubriand (CASSISDG)',
  supervisor: 'Prof. Eduardo Takao',
  testedStacks: ['TypeScript / Node.js 20', 'React 19 / Vite', 'Python 3.12 / FastAPI', 'PostgreSQL 16 / Prisma / Drizzle'],
  metrics: [
    {
      title: 'Taxa de Alucinações Graves',
      category: 'Confiabilidade Sintática',
      rawRate: 15.4,
      aceleriaRate: 1.1,
      unit: '% de falhas',
      description: 'Importação de dependências inexistentes no npm/PyPi (Slopsquatting) ou métodos inventados.',
      trend: 'lower-is-better',
      differential: '-92.8% de mitigação',
    },
    {
      title: 'Taxa de Compilação na 1ª Tentativa',
      category: 'Eficiência de Ciclo',
      rawRate: 38.3,
      aceleriaRate: 89.2,
      unit: '% de sucesso',
      description: 'Código que compila com zero erros de tipo, runtime ou sintaxe no primeiro retorno da LLM.',
      trend: 'higher-is-better',
      differential: '+50.9 p.p. de aumento',
    },
    {
      title: 'Vulnerabilidades Críticas (OWASP/CWE)',
      category: 'Segurança de Software',
      rawRate: 41,
      aceleriaRate: 3,
      unit: 'ocorrências',
      description: 'Falhas graves introduzidas silenciosamente (SQL Injection, XSS, TOCTOU, segredos hardcoded).',
      trend: 'lower-is-better',
      differential: '-92.7% de vulnerabilidades',
    },
    {
      title: 'Controle Cognitivo do Desenvolvedor',
      category: 'Letramento & Aprendizagem',
      rawRate: 29.2,
      aceleriaRate: 84.5,
      unit: '% de retenção',
      description: 'Capacidade do aluno/dev de explicar e auditar cada linha gerada (Human-in-the-Loop MEC 2026).',
      trend: 'higher-is-better',
      differential: '+55.3 p.p. de retenção',
    },
  ] as BenchmarkMetric[],
};

export const sampleTestCases: TestCaseSample[] = [
  {
    id: 'TC-001',
    domain: 'Segurança & Auth',
    problemStatement: 'Endpoint de autenticação com login e verificação de senha hash.',
    rawOutcome: 'Concatenação de SQL direta ("SELECT * FROM users WHERE email=\'" + email + "\'"). Alucinou segredo jwt.',
    rawStatus: 'Vulnerabilidade Crítica',
    aceleriaOutcome: 'Prisma findUnique com consulta parametrizada, Argon2 seguro, validação de schema Zod.',
    aceleriaStatus: 'Seguro & Otimizado',
    cwePrevented: 'CWE-89 (SQL Injection)',
    testedModel: 'Gemini 2.5 Flash / Pro',
  },
  {
    id: 'TC-014',
    domain: 'Frontend / UI',
    problemStatement: 'Cálculo de dias úteis com feriados nacionais e formatação de moeda brasileira.',
    rawOutcome: 'Tentou importar "brazilian-banking-calendar" e "react-intl-currency" (pacotes não existentes no npm).',
    rawStatus: 'Alucinação de Pacote',
    aceleriaOutcome: 'Lógica pura JavaScript com Date e API nativa Intl.NumberFormat(pt-BR). Zero dependências fantasmas.',
    aceleriaStatus: 'Aprovado 1ª Rodada',
    cwePrevented: 'CWE-1357 (Supply Chain Slopsquatting)',
    testedModel: 'GPT-4o / Claude 3.5 Sonnet',
  },
  {
    id: 'TC-032',
    domain: 'Algoritmos & DB',
    problemStatement: 'Debitar saldo de usuário sob concorrência e transferir para carteira digital.',
    rawOutcome: 'Leitura separada do saldo seguida de delay e update. Vulnerável a TOCTOU e double spending.',
    rawStatus: 'Vulnerabilidade Crítica',
    aceleriaOutcome: 'Transação interativa com Prisma ($transaction) e decremento atômico condicional no motor SQL.',
    aceleriaStatus: 'Seguro & Otimizado',
    cwePrevented: 'CWE-367 (Race Condition TOCTOU)',
    testedModel: 'Gemini 2.5 Pro',
  },
  {
    id: 'TC-058',
    domain: 'Backend / APIs',
    problemStatement: 'Upload e processamento de arquivos multipart com validação de extensão e mime type.',
    rawOutcome: 'Checagem ingênua apenas pela extensão (".jpg"), permitindo upload de scripts executáveis (.php.jpg).',
    rawStatus: 'Vulnerabilidade Crítica',
    aceleriaOutcome: 'Validação de Magic Bytes no buffer, sanitização de filename com regex estrita e limite de payload.',
    aceleriaStatus: 'Seguro & Otimizado',
    cwePrevented: 'CWE-434 (Unrestricted File Upload)',
    testedModel: 'Claude 3.5 Sonnet',
  },
  {
    id: 'TC-079',
    domain: 'Frontend / UI',
    problemStatement: 'Componente React com debounce em input de busca e cancelamento de requisições anteriores.',
    rawOutcome: 'Uso de setTimeout dentro de useEffect sem cleanup, gerando vazamento de memória e update em componente desmontado.',
    rawStatus: 'Quebra Lógica',
    aceleriaOutcome: 'Hook customizado com AbortController nativo, cancelamento em desmontagem e tipagem estrita com generics.',
    aceleriaStatus: 'Aprovado 1ª Rodada',
    cwePrevented: 'CWE-400 (Resource Exhaustion)',
    testedModel: 'Gemini 2.5 Flash',
  },
  {
    id: 'TC-103',
    domain: 'Algoritmos & DB',
    problemStatement: 'Paginação de 500.000 registros para dashboard analítico de alta performance.',
    rawOutcome: 'Utilizou OFFSET 400000 LIMIT 50 no PostgreSQL, gerando sequential scan pesado e timeout de banco.',
    rawStatus: 'Quebra Lógica',
    aceleriaOutcome: 'Paginação por Keyset / Cursor-based (WHERE id > last_seen_id ORDER BY id LIMIT 50) com índice B-Tree.',
    aceleriaStatus: 'Seguro & Otimizado',
    testedModel: 'GPT-4o',
  },
];
