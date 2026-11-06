export interface FrameworkPillar {
  id: string;
  tag: string;
  name: string;
  summary: string;
  whyItMatters: string;
  bestPractices: string[];
  antiPatterns: string[];
  ideSnippetExample: string;
  realWorldSample: string;
  color: string;
  gradient: string;
}

export const frameworkPillars: FrameworkPillar[] = [
  {
    id: 'contexto',
    tag: '[CONTEXTO]',
    name: 'Contexto Técnico & Runtime',
    summary: 'Delimitação precisa do ecossistema de software, versões de compiladores, runtime e restrições de arquitetura.',
    whyItMatters: 'Sem contexto, LLMs operam com premissas genéricas, inferindo dependências desatualizadas ou importando bibliotecas inexistentes que geram slopsquatting.',
    bestPractices: [
      'Explicitar linguagem, versão mínima e dialect (ex: TypeScript 5.4, strict mode)',
      'Listar bibliotecas já instaladas no projeto para evitar imports arbitrários',
      'Descrever convenções arquiteturais (ex: Clean Architecture, Server Actions, REST)',
    ],
    antiPatterns: [
      'Omitir versões de runtime (ex: falar só "Node" em vez de "Node 20 LTS")',
      'Instruir "faça com o framework mais moderno do mercado"',
      'Não informar se o ambiente é client-side ou server-side',
    ],
    ideSnippetExample: `// Snippet VS Code: acel-ctx
[CONTEXTO]
Ambiente: \${1:Node.js 20 LTS}
Stack: \${2:TypeScript 5.4, React 19, Tailwind CSS v4}
ORM / Armazenamento: \${3:Prisma ORM 5.12 com PostgreSQL 16}
Restrições de Dependência: \${4:Apenas bibliotecas já presentes no package.json. Zero pacotes externos adicionais.}`,
    realWorldSample: `[CONTEXTO]
Linguagem: TypeScript 5.4 com strict: true no tsconfig.
Framework: Next.js 15 (App Router com Server Actions).
Banco de Dados: PostgreSQL gerenciado via Drizzle ORM.
Ambiente de Execução: Edge Runtime com limites estritos de bundle.`,
    color: '#00F2FE',
    gradient: 'from-cyan-500/20 to-cyan-500/0',
  },
  {
    id: 'objetivo',
    tag: '[OBJETIVO]',
    name: 'Objetivo Unívoco & Escopo',
    summary: 'Declaração atômica, mensurável e estrita da alteração desejada, sem adjetivos vagos.',
    whyItMatters: 'Comandos vagos como "melhora meu código" ou "deixa mais rápido" abrem espaço para refatorações destrutivas, perda de regras de negócio e alucinações de escopo.',
    bestPractices: [
      'Utilizar verbos de ação mensuráveis: "Sanitizar", "Extrair", "Parametrizar", "Tipar"',
      'Definir critérios de aceitação objetivos para a saída',
      'Manter uma única responsabilidade por rodada de interação (SRP)',
    ],
    antiPatterns: [
      'Usar pedidos ambíguos: "arruma aí", "deixa padrão de mercado"',
      'Misturar 4 tarefas distintas no mesmo prompt (ex: criar schema, fazer endpoint, desenhar tela e testar)',
      'Permitir que a IA mude regras de negócio implícitas',
    ],
    ideSnippetExample: `// Snippet VS Code: acel-obj
[OBJETIVO]
Ação Principal: \${1:Implementar sanitização e validação de schema para o formulário de cadastro.}
Critérios de Sucesso: \${2:Retornar erro 422 em payload inválido sem quebrar a execução do endpoint.}
Limites de Escopo: \${3:Não alterar a assinatura das interfaces públicas de serviço.}`,
    realWorldSample: `[OBJETIVO]
Refatorar o endpoint POST /api/checkout para realizar validação com Zod e calcular desconto idempotente, sem alterar as entidades de pagamento existentes.`,
    color: '#38BDF8',
    gradient: 'from-sky-500/20 to-sky-500/0',
  },
  {
    id: 'codigo',
    tag: '[CÓDIGO]',
    name: 'Recorte Mínimo Reproduzível',
    summary: 'Fornecimento isolado apenas do bloco de código relevante com interfaces e tipos essenciais.',
    whyItMatters: 'Colar arquivos inteiros de 1.000 linhas satura a janela de contexto, aumenta o custo de inferência e dispersa a atenção do modelo, aumentando em 4x a chance de alucinação.',
    bestPractices: [
      'Isolar o método, componente ou função foco com suas interfaces de entrada/saída',
      'Incluir imports essenciais para que o compilador da LLM entenda os tipos',
      'Omitir implementações de utilitários externos substituindo por assinaturas comentadas',
    ],
    antiPatterns: [
      'Colar um arquivo monólito inteiro de 1.500 linhas sem indicar onde está o foco',
      'Omitir as definições de tipo cruciais forçando a IA a inventar props falsas',
      'Ocultar dependências críticas que causam efeitos colaterais',
    ],
    ideSnippetExample: `// Snippet VS Code: acel-code
[CÓDIGO]
\`\`\`\${1:typescript}
\${2:// Recorte isolado da função ou componente problemático}
export function processOrder(payload: OrderPayload) {
  // ...
}
\`\`\``,
    realWorldSample: `[CÓDIGO]
\`\`\`typescript
export interface UserUpdateDto {
  username?: string;
  avatarUrl?: string;
}

export async function patchUser(userId: string, data: UserUpdateDto) {
  return await db.user.update({
    where: { id: userId },
    data,
  });
}
\`\`\``,
    color: '#A855F7',
    gradient: 'from-purple-500/20 to-purple-500/0',
  },
  {
    id: 'erro',
    tag: '[ERRO]',
    name: 'Evidência Literal do Erro',
    summary: 'Apresentação integral da mensagem do compilador, stack trace ou caso de teste quebrado, sem paráfrases.',
    whyItMatters: 'Paráfrases humanas como "tá dando erro de tipagem estranho" forçam o modelo a tentar adivinhar a exceção. Stack traces literais orientam a atenção ao número exato da linha e ao código de erro.',
    bestPractices: [
      'Copiar o erro exato do terminal (ex: TS2322, SyntaxError, ECONNREFUSED)',
      'Incluir o stack trace com arquivo e linha onde a exceção foi lançada',
      'Em caso de bug lógico, fornecer: Entrada fornecida -> Saída esperada -> Saída obtida',
    ],
    antiPatterns: [
      'Escrever apenas "não está funcionando" ou "deu ruim"',
      'Editar o log de erro removendo detalhes técnicos fundamentais',
      'Assumir a causa raiz no lugar de fornecer a evidência pura',
    ],
    ideSnippetExample: `// Snippet VS Code: acel-err
[ERRO]
Tipo: \${1:TypeScript Error TS2345}
Log Literal:
\`\`\`
\${2:Argument of type 'string | undefined' is not assignable to parameter of type 'string'.}
\`\`\`
Linha / Origem: \${3:src/services/auth.ts:42}`,
    realWorldSample: `[ERRO]
\`\`\`
PrismaClientKnownRequestError: 
Invalid \`prisma.account.update()\` invocation:
An operation failed because it depends on one or more records that were required but not found.
Error code: P2025 at transferCredits (src/services/billing.ts:64:25)
\`\`\``,
    color: '#EC4899',
    gradient: 'from-pink-500/20 to-pink-500/0',
  },
  {
    id: 'diretiva',
    tag: '[DIRETIVA DE CORREÇÃO]',
    name: 'Diretiva de Correção & Guardrails',
    summary: 'Restrições imperativas de segurança, limites de refatoração e critérios estritos de conformidade.',
    whyItMatters: 'É o guardrail que impede a LLM de escolher atalhos inseguros, desativar o linter (`eslint-disable`), usar `any`, ou reescrever código funcional alheio.',
    bestPractices: [
      'Proibir soluções destrutivas (ex: "Não utilize tipo any ou ignore o compilador")',
      'Determinar conformidade de segurança (ex: "Use Prepared Statements", "Sanitize com DOMPurify")',
      'Instruir a manter a idempotência e os testes unitários existentes',
    ],
    antiPatterns: [
      'Permitir que a LLM adicione bibliotecas externas pesadas para resolver 5 linhas de código',
      'Não especificar diretiva de backward-compatibility',
      'Ignorar regras de lint e conformidade arquitetural da equipe',
    ],
    ideSnippetExample: `// Snippet VS Code: acel-dir
[DIRETIVA DE CORREÇÃO]
- \${1:Não instale novos pacotes no package.json.}
- \${2:Mantenha tipagem TypeScript estrita, sem nenhum tipo 'any' ou 'unknown' sem guarda de tipo.}
- \${3:Não altere a assinatura pública da função.}
- \${4:Garanta conformidade com OWASP Top 10 contra injeção e manipulação de estado.}`,
    realWorldSample: `[DIRETIVA DE CORREÇÃO]
1. Use transação atômica do Prisma ($transaction) com decremento condicional.
2. Não utilize timeouts artificiais (sleep) para sincronização.
3. Garanta que o método seja imune a Time-of-Check Time-of-Use (CWE-367).
4. Retorne um objeto com tipagem estrita contendo flag boolean success e transactionId.`,
    color: '#10B981',
    gradient: 'from-emerald-500/20 to-emerald-500/0',
  },
];
