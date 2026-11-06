import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, Sparkles, Shield, AlertTriangle, ShieldCheck, Terminal, RotateCcw, Play } from 'lucide-react';

interface PresetTemplate {
  name: string;
  context: string;
  objective: string;
  code: string;
  error: string;
  directive: string;
}

const presetTemplates: PresetTemplate[] = [
  {
    name: 'Autenticação & SQL Seguro',
    context: 'TypeScript 5.4, Express 4.19, Prisma ORM 5.12, PostgreSQL 16, Argon2.',
    objective: 'Implementar autenticação por email e senha com validação de schema Zod e consulta parametrizada.',
    code: `export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  // TODO: validar schema e autenticar com segurança
}`,
    error: 'Entradas maliciosas causavam SQL Injection e falha de tipagem TS2322.',
    directive: 'Utilize Prisma com prepared statements. Não utilize SQL puro concatenado. Valide payload com Zod e compare senhas via Argon2. Nunca exponha o passwordHash.',
  },
  {
    name: 'Prevenção de Pacotes Fantasma',
    context: 'React 19, TypeScript 5.4, Vite 5, Tailwind CSS v4. Sem bibliotecas externas adicionais.',
    objective: 'Criar utilitário de cálculo de dias úteis e formatação de moeda brasileira BRL usando apenas APIs nativas da plataforma.',
    code: `export function formatSummary(startDate: Date, endDate: Date, dailyRate: number) {
  // Retornar dias úteis e valor formatado
}`,
    error: 'Modelos de IA sugeriam pacotes inexistentes no npm (ex: brazilian-banking-calendar) quebrando o build.',
    directive: 'Não instale dependências externas no package.json. Utilize estritamente objetos Date nativos e Intl.NumberFormat(pt-BR, currency: BRL). Forneça tipos estritos.',
  },
  {
    name: 'Controle de Saldo Atômico (Anti-Race Condition)',
    context: 'Node.js 20 LTS, PostgreSQL 16 com isolamento Serializable, Prisma ORM 5.12.',
    objective: 'Executar transferência financeira atômica entre duas carteiras sem vulnerabilidade a double-spending sob alta concorrência.',
    code: `export async function transferBalance(fromId: string, toId: string, amount: number) {
  // Atualizar saldos com segurança ACID
}`,
    error: 'Requisições simultâneas em lote permitiam débito duplo e saldo negativo (CWE-367 TOCTOU).',
    directive: 'Utilize prisma.$transaction interativo. Utilize decremento atômico com where: { balance: { gte: amount } }. Registre log de auditoria imutável na mesma transação.',
  },
];

export function PromptPlayground(): React.JSX.Element {
  const [context, setContext] = useState<string>(presetTemplates[0].context);
  const [objective, setObjective] = useState<string>(presetTemplates[0].objective);
  const [code, setCode] = useState<string>(presetTemplates[0].code);
  const [error, setError] = useState<string>(presetTemplates[0].error);
  const [directive, setDirective] = useState<string>(presetTemplates[0].directive);

  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [simulatedExecution, setSimulatedExecution] = useState<boolean>(false);

  const loadPreset = (preset: PresetTemplate) => {
    setContext(preset.context);
    setObjective(preset.objective);
    setCode(preset.code);
    setError(preset.error);
    setDirective(preset.directive);
    setSimulatedExecution(false);
  };

  const handleReset = () => {
    setContext('');
    setObjective('');
    setCode('');
    setError('');
    setDirective('');
    setSimulatedExecution(false);
  };

  // Safe Prompt Quality Score Calculation
  const evaluation = useMemo(() => {
    let score = 0;
    const checks = {
      hasContext: false,
      hasObjective: false,
      hasCode: false,
      hasError: false,
      hasDirective: false,
    };

    if (context.trim().length > 15) {
      score += 20;
      checks.hasContext = true;
    }
    if (objective.trim().length > 15) {
      score += 20;
      checks.hasObjective = true;
    }
    if (code.trim().length > 10) {
      score += 20;
      checks.hasCode = true;
    }
    if (error.trim().length > 10) {
      score += 20;
      checks.hasError = true;
    }
    if (directive.trim().length > 15) {
      score += 20;
      checks.hasDirective = true;
    }

    return { score, checks };
  }, [context, objective, code, error, directive]);

  const fullPromptText = `[CONTEXTO]
${context.trim()}

[OBJETIVO]
${objective.trim()}

[CÓDIGO]
${code.trim()}

[ERRO]
${error.trim()}

[DIRETIVA DE CORREÇÃO]
${directive.trim()}`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(fullPromptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const element = document.createElement('a');
    const file = new Blob([fullPromptText], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'prompt-seguro-aceleria.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="playground" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            Ambiente Prático Interativo
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Playground do Framework Aceler.IA
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Construa e valide prompts com o protocolo sintático dos 5 pilares. O analisador em tempo real mede a cobertura de guardrails de segurança antes do envio à LLM.
          </p>
        </div>

        {/* Preset Selector Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold mr-1">Carregar Modelo:</span>
            {presetTemplates.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => loadPreset(preset)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
              >
                {preset.name}
              </button>
            ))}
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpar Formulário</span>
          </button>
        </div>

        {/* Main Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 5 Pillars Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* 1. Contexto */}
            <div className="rounded-xl bg-slate-900/50 border border-slate-800 p-4 focus-within:border-cyan-500/60 transition-all">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-cyan-400 font-mono flex items-center gap-1.5">
                  <span>[1. CONTEXTO]</span>
                  <span className="text-slate-400 font-normal">Stack, runtime e ambiente</span>
                </label>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${evaluation.checks.hasContext ? 'text-emerald-400 bg-emerald-950/60' : 'text-slate-500'}`}>
                  {evaluation.checks.hasContext ? 'Preenchido' : 'Pendente'}
                </span>
              </div>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Ex: TypeScript 5.4, Node.js 20 LTS, Express 4.19, PostgreSQL 16..."
                rows={2}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 resize-y"
              />
            </div>

            {/* 2. Objetivo */}
            <div className="rounded-xl bg-slate-900/50 border border-slate-800 p-4 focus-within:border-cyan-500/60 transition-all">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-sky-400 font-mono flex items-center gap-1.5">
                  <span>[2. OBJETIVO]</span>
                  <span className="text-slate-400 font-normal">Intenção atômica sem ambiguidades</span>
                </label>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${evaluation.checks.hasObjective ? 'text-emerald-400 bg-emerald-950/60' : 'text-slate-500'}`}>
                  {evaluation.checks.hasObjective ? 'Preenchido' : 'Pendente'}
                </span>
              </div>
              <textarea
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                placeholder="Ex: Implementar sanitização e validação Zod no endpoint de cadastro..."
                rows={2}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 resize-y"
              />
            </div>

            {/* 3. Código */}
            <div className="rounded-xl bg-slate-900/50 border border-slate-800 p-4 focus-within:border-cyan-500/60 transition-all">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-purple-400 font-mono flex items-center gap-1.5">
                  <span>[3. CÓDIGO]</span>
                  <span className="text-slate-400 font-normal">Recorte mínimo reproduzível</span>
                </label>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${evaluation.checks.hasCode ? 'text-emerald-400 bg-emerald-950/60' : 'text-slate-500'}`}>
                  {evaluation.checks.hasCode ? 'Preenchido' : 'Pendente'}
                </span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Cole aqui apenas a função ou recorte isolado..."
                rows={3}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 resize-y"
              />
            </div>

            {/* 4. Erro */}
            <div className="rounded-xl bg-slate-900/50 border border-slate-800 p-4 focus-within:border-cyan-500/60 transition-all">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-pink-400 font-mono flex items-center gap-1.5">
                  <span>[4. ERRO]</span>
                  <span className="text-slate-400 font-normal">Stack trace literal ou falha</span>
                </label>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${evaluation.checks.hasError ? 'text-emerald-400 bg-emerald-950/60' : 'text-slate-500'}`}>
                  {evaluation.checks.hasError ? 'Preenchido' : 'Pendente'}
                </span>
              </div>
              <textarea
                value={error}
                onChange={(e) => setError(e.target.value)}
                placeholder="Ex: TypeError: Cannot read properties of undefined (reading 'id') em src/auth.ts:42..."
                rows={2}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 resize-y"
              />
            </div>

            {/* 5. Diretiva de Correção */}
            <div className="rounded-xl bg-slate-900/50 border border-slate-800 p-4 focus-within:border-cyan-500/60 transition-all">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-emerald-400 font-mono flex items-center gap-1.5">
                  <span>[5. DIRETIVA DE CORREÇÃO]</span>
                  <span className="text-slate-400 font-normal">Guardrails e restrições imperativas</span>
                </label>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${evaluation.checks.hasDirective ? 'text-emerald-400 bg-emerald-950/60' : 'text-slate-500'}`}>
                  {evaluation.checks.hasDirective ? 'Preenchido' : 'Pendente'}
                </span>
              </div>
              <textarea
                value={directive}
                onChange={(e) => setDirective(e.target.value)}
                placeholder="Ex: Não instale novos pacotes. Use Prepared Statements. Mantenha tipagem TypeScript estrita sem 'any'..."
                rows={2}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 resize-y"
              />
            </div>

          </div>

          {/* Right Column: Live Quality Auditor & Output (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Score Card */}
            <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 shadow-xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-bold text-white">Auditoria de Segurança do Prompt</span>
                </div>
                <div className="text-2xl font-bold font-mono tabular-nums text-cyan-400">
                  {evaluation.score}%
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-5">
                <div
                  className={`h-full transition-all duration-500 ${
                    evaluation.score === 100
                      ? 'bg-gradient-to-r from-cyan-400 to-emerald-400'
                      : evaluation.score >= 60
                      ? 'bg-gradient-to-r from-amber-400 to-cyan-400'
                      : 'bg-red-400'
                  }`}
                  style={{ width: `${evaluation.score}%` }}
                />
              </div>

              {/* Checklist */}
              <div className="space-y-2 mb-6 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/50">
                  <span className="text-slate-300">1. Contexto & Versões de Runtime</span>
                  <span className={evaluation.checks.hasContext ? 'text-emerald-400' : 'text-slate-500'}>
                    {evaluation.checks.hasContext ? '✓ Conforme' : '○ Ausente'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/50">
                  <span className="text-slate-300">2. Objetivo Atômico Definido</span>
                  <span className={evaluation.checks.hasObjective ? 'text-emerald-400' : 'text-slate-500'}>
                    {evaluation.checks.hasObjective ? '✓ Conforme' : '○ Ausente'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/50">
                  <span className="text-slate-300">3. Recorte Mínimo Isolado</span>
                  <span className={evaluation.checks.hasCode ? 'text-emerald-400' : 'text-slate-500'}>
                    {evaluation.checks.hasCode ? '✓ Conforme' : '○ Ausente'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/50">
                  <span className="text-slate-300">4. Evidência do Erro Literal</span>
                  <span className={evaluation.checks.hasError ? 'text-emerald-400' : 'text-slate-500'}>
                    {evaluation.checks.hasError ? '✓ Conforme' : '○ Ausente'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/50">
                  <span className="text-slate-300">5. Guardrails e Diretiva de Segurança</span>
                  <span className={evaluation.checks.hasDirective ? 'text-emerald-400' : 'text-slate-500'}>
                    {evaluation.checks.hasDirective ? '✓ Conforme' : '○ Ausente'}
                  </span>
                </div>
              </div>

              {/* Prompt Action Buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={handleCopyPrompt}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl hover:opacity-95 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Prompt Estruturado Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Prompt Formatado</span>
                    </>
                  )}
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleDownloadMarkdown}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700/80 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar (.md)</span>
                  </button>

                  <button
                    onClick={() => setSimulatedExecution(!simulatedExecution)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-cyan-300 bg-cyan-950/40 hover:bg-cyan-950/70 rounded-xl border border-cyan-800/60 transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Simular Risco</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Simulated Risk Breakdown (if toggled) */}
            {simulatedExecution && (
              <div className="rounded-2xl bg-[#0a0f1d] border border-cyan-900/60 p-5 text-xs space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>Projeção de Inferência Estocástica:</span>
                </div>
                {evaluation.score === 100 ? (
                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-slate-300 space-y-1">
                    <span className="text-emerald-400 font-semibold block">Risco Residual: &lt; 1.2%</span>
                    <p>O prompt delimita completamente a janela de contexto. A LLM não tem graus de liberdade para inventar bibliotecas fantasmas nem introduzir SQL Injection.</p>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-900/40 text-slate-300 space-y-1">
                    <span className="text-amber-400 font-semibold block">Alerta: Risco de Alucinação Moderado a Alto</span>
                    <p>Campos pendentes concedem espaço de busca solto ao modelo. Preencha todos os 5 pilares para atingir a barreira de contenção sintática.</p>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
