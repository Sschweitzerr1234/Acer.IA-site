import React, { useState } from 'react';
import { frameworkPillars, FrameworkPillar } from '../data/frameworkPillars';
import { Check, Copy, Layers, ShieldCheck, Terminal, AlertTriangle, FileCode } from 'lucide-react';

export function FrameworkPillars(): React.JSX.Element {
  const [activePillarId, setActivePillarId] = useState<string>(frameworkPillars[0].id);
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);

  const currentPillar = frameworkPillars.find((p) => p.id === activePillarId) || frameworkPillars[0];

  const handleCopySnippet = (snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <section id="framework" className="py-20 bg-slate-950/60 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            Arquitetura do Protocolo Sintático
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Os 5 Pilares da Engenharia de Prompt Segura
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Uma gramática formal de comunicação homem-máquina projetada para converter intenções vagas em diretivas determinísticas de engenharia de software.
          </p>
        </div>

        {/* 5 Pillar Interactive Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-2xl max-w-4xl mx-auto mb-10 shadow-lg">
          {frameworkPillars.map((pillar) => {
            const isActive = pillar.id === activePillarId;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillarId(pillar.id)}
                className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-white border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <div className="font-mono text-[11px] text-cyan-400">{pillar.tag}</div>
                <div className="truncate">{pillar.name.split('&')[0].trim()}</div>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Detail Card */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden shadow-2xl backdrop-blur-sm">
          
          {/* Top Banner of Pillar */}
          <div className="p-6 sm:p-8 border-b border-slate-800/80 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 font-mono text-xs font-semibold mb-3">
                <Terminal className="w-3.5 h-3.5" />
                <span>Pilar {frameworkPillars.findIndex(p => p.id === currentPillar.id) + 1} de 5: {currentPillar.tag}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {currentPillar.name}
              </h3>
              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                {currentPillar.summary}
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => handleCopySnippet(currentPillar.ideSnippetExample)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer shadow-md"
              >
                {copiedSnippet ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Snippet Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-cyan-400" />
                    <span>Copiar Snippet VS Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            
            {/* Left Column: Why it matters + Best Practices vs Anti-patterns */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Why it matters */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
                  Fundamentação Teórica & Redução Estocástica
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
                  {currentPillar.whyItMatters}
                </p>
              </div>

              {/* Best Practices vs Anti-patterns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Best Practices */}
                <div className="p-4 rounded-xl bg-emerald-950/10 border border-emerald-900/30">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-3">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>Boas Práticas</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {currentPillar.bestPractices.map((bp, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold shrink-0">✓</span>
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Anti-patterns */}
                <div className="p-4 rounded-xl bg-red-950/10 border border-red-900/30">
                  <div className="flex items-center gap-2 text-xs font-semibold text-red-400 mb-3">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Anti-Padrões a Evitar</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {currentPillar.antiPatterns.map((ap, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-red-400 font-bold shrink-0">×</span>
                        <span>{ap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Right Column: Code Snippets (IDE Snippet & Real World Sample) */}
            <div className="p-6 sm:p-8 flex flex-col justify-between bg-slate-950/50 space-y-6">
              
              {/* IDE Snippet */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                  <span className="text-cyan-400">Estrutura de Snippet para IDE:</span>
                  <span>Formato VS Code Tabstops</span>
                </div>
                <div className="rounded-xl bg-[#07090e] border border-slate-800 p-4 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
                  <pre>{currentPillar.ideSnippetExample}</pre>
                </div>
              </div>

              {/* Real World Sample */}
              <div>
                <div className="text-xs text-slate-400 mb-2 font-mono">
                  <span className="text-purple-400">Exemplo Real de Aplicação no IFPR:</span>
                </div>
                <div className="rounded-xl bg-purple-950/10 border border-purple-900/30 p-4 font-mono text-xs text-purple-200/90 leading-relaxed overflow-x-auto">
                  <pre>{currentPillar.realWorldSample}</pre>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Bar: Action link to Playground */}
          <div className="p-4 bg-slate-900/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-400">
              Combine os 5 pilares para obter código compilável e seguro na primeira iteração.
            </span>
            <a
              href="#playground"
              className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline flex items-center gap-1.5"
            >
              Construir Prompt no Playground &rarr;
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
