import React, { useState } from 'react';
import { comparisonCases } from '../data/comparisonCases';
import { AlertTriangle, CheckCircle2, Copy, Check, Terminal, ShieldAlert, Sparkles, Code2 } from 'lucide-react';

export function InteractiveTerminal(): React.JSX.Element {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(comparisonCases[0].id);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'split' | 'raw' | 'aceleria'>('split');

  const currentCase = comparisonCases.find((c) => c.id === selectedCaseId) || comparisonCases[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const formattedAceleriaPrompt = `[CONTEXTO]
${currentCase.aceleriaPrompt.context}

[OBJETIVO]
${currentCase.aceleriaPrompt.objective}

[CÓDIGO]
${currentCase.aceleriaPrompt.code}

[ERRO]
${currentCase.aceleriaPrompt.error}

[DIRETIVA DE CORREÇÃO]
${currentCase.aceleriaPrompt.directive}`;

  return (
    <div className="w-full bg-slate-950/80 border border-slate-800 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl">
      {/* Top Controller Bar */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 p-3 sm:p-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Case selector buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">Casos de Estudo:</span>
          {comparisonCases.map((c) => {
            const isSelected = c.id === selectedCaseId;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCaseId(c.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                {c.title.split('&')[0].trim()}
              </button>
            );
          })}
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800/80 shrink-0 self-stretch sm:self-auto">
          <button
            onClick={() => setActiveTab('split')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'split' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Lado a Lado
          </button>
          <button
            onClick={() => setActiveTab('raw')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'raw' ? 'bg-red-500/20 text-red-300' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Raw Prompting
          </button>
          <button
            onClick={() => setActiveTab('aceleria')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'aceleria' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Aceler.IA Dev
          </button>
        </div>
      </div>

      {/* Case Brief Banner */}
      <div className="px-4 py-2.5 bg-slate-900/30 border-b border-slate-800/50 flex flex-wrap items-center justify-between text-xs gap-3">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="font-semibold text-white">{currentCase.title}</span>
          <span className="text-slate-500" aria-hidden="true">·</span>
          <span className="text-slate-400">{currentCase.description}</span>
        </div>
        <div className="text-slate-400 font-mono text-[11px]">
          Categoria: <span className="text-cyan-400">{currentCase.category}</span>
        </div>
      </div>

      {/* Main Comparison Grid */}
      <div className={`grid ${activeTab === 'split' ? 'grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800' : 'grid-cols-1'}`}>
        
        {/* PANEL 1: RAW PROMPTING (Empirical / Vulnerable) */}
        {(activeTab === 'split' || activeTab === 'raw') && (
          <div className="p-4 sm:p-5 flex flex-col h-full bg-[#0a0d16]/90">
            {/* Header of Column */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-sm font-semibold text-red-400 font-sans">
                  Raw Prompting (Empírico / Sem Governança)
                </span>
              </div>
              <span className="text-xs font-mono text-red-400/90 bg-red-950/60 border border-red-800/50 px-2 py-0.5 rounded">
                {currentCase.rawPrompt.cwe}
              </span>
            </div>

            {/* Prompt Excerpt Box */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span className="font-mono text-slate-400">Prompt Submetido (Vago):</span>
                <button
                  onClick={() => handleCopy(currentCase.rawPrompt.promptText, 'raw-prompt')}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white cursor-pointer"
                  title="Copiar prompt empírico"
                >
                  {copiedKey === 'raw-prompt' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copiar</span>
                </button>
              </div>
              <div className="p-3 bg-red-950/20 border border-red-900/40 rounded-lg text-xs font-mono text-red-200/90 leading-relaxed italic">
                "{currentCase.rawPrompt.promptText}"
              </div>
            </div>

            {/* Code Output Box */}
            <div className="flex-1 flex flex-col mb-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span className="font-mono text-slate-400">Código Gerado Pela LLM:</span>
                <span className="text-[11px] text-red-400 font-medium">Status: {currentCase.rawPrompt.compilation}</span>
              </div>
              <div className="relative rounded-lg bg-[#07090e] border border-red-900/40 p-3.5 overflow-x-auto font-mono text-[11px] leading-relaxed text-slate-300">
                <pre>{currentCase.rawPrompt.generatedCode}</pre>
                <button
                  onClick={() => handleCopy(currentCase.rawPrompt.generatedCode, 'raw-code')}
                  className="absolute top-2 right-2 p-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 cursor-pointer"
                  title="Copiar código gerado"
                >
                  {copiedKey === 'raw-code' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            {/* Issues Identified */}
            <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-3 text-xs">
              <div className="flex items-center gap-1.5 text-red-400 font-semibold mb-2">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Falhas e Riscos Críticos Diagnosticados:</span>
              </div>
              <ul className="space-y-1 text-slate-300 text-[11px]">
                {currentCase.rawPrompt.issues.map((issue, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-red-400 font-bold shrink-0">×</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* PANEL 2: ACELER.IA DEV (Structured / Safe Framework) */}
        {(activeTab === 'split' || activeTab === 'aceleria') && (
          <div className="p-4 sm:p-5 flex flex-col h-full bg-[#0a0f1b]/95">
            {/* Header of Column */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,242,254,0.8)]"></span>
                <span className="text-sm font-semibold text-cyan-400 font-sans">
                  Aceler.IA Dev (Governança 5 Pilares)
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
                {currentCase.aceleriaPrompt.securityScore}
              </span>
            </div>

            {/* Structured Prompt Excerpt Box */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span className="font-mono text-cyan-400">Sintaxe Estruturada (5 Pilares):</span>
                <button
                  onClick={() => handleCopy(formattedAceleriaPrompt, 'acel-prompt')}
                  className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 cursor-pointer"
                  title="Copiar prompt completo formatado"
                >
                  {copiedKey === 'acel-prompt' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copiar Protocolo</span>
                </button>
              </div>
              <div className="p-3 bg-cyan-950/20 border border-cyan-800/40 rounded-lg text-xs font-mono text-slate-200 leading-relaxed max-h-36 overflow-y-auto space-y-1">
                <div><span className="text-cyan-400 font-semibold">[CONTEXTO]</span> {currentCase.aceleriaPrompt.context}</div>
                <div><span className="text-sky-400 font-semibold">[OBJETIVO]</span> {currentCase.aceleriaPrompt.objective}</div>
                <div><span className="text-pink-400 font-semibold">[ERRO]</span> {currentCase.aceleriaPrompt.error}</div>
                <div><span className="text-emerald-400 font-semibold">[DIRETIVA]</span> {currentCase.aceleriaPrompt.directive}</div>
              </div>
            </div>

            {/* Code Output Box */}
            <div className="flex-1 flex flex-col mb-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span className="font-mono text-slate-400">Código Seguro Verificado:</span>
                <span className="text-[11px] text-emerald-400 font-medium">Status: {currentCase.aceleriaPrompt.compilation}</span>
              </div>
              <div className="relative rounded-lg bg-[#060a14] border border-cyan-900/40 p-3.5 overflow-x-auto font-mono text-[11px] leading-relaxed text-slate-200">
                <pre>{currentCase.aceleriaPrompt.generatedCode}</pre>
                <button
                  onClick={() => handleCopy(currentCase.aceleriaPrompt.generatedCode, 'acel-code')}
                  className="absolute top-2 right-2 p-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 cursor-pointer"
                  title="Copiar código seguro"
                >
                  {copiedKey === 'acel-code' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            {/* Benefits Identified */}
            <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-lg p-3 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Garantias Sintáticas e de Segurança Asseguradas:</span>
              </div>
              <ul className="space-y-1 text-slate-300 text-[11px]">
                {currentCase.aceleriaPrompt.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Footer bar with prompt copy shortcut */}
      <div className="px-4 py-3 bg-slate-900/50 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>O Framework condiciona o espaço de busca da LLM eliminando graus de liberdade inseguros.</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#playground"
            className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline flex items-center gap-1"
          >
            Experimentar no Playground &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
