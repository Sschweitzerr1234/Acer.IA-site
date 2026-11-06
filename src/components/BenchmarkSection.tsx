import React, { useState } from 'react';
import { benchmarkOverview, sampleTestCases, TestCaseSample } from '../data/benchmarkData';
import { BarChart3, TrendingUp, ShieldCheck, CheckCircle2, AlertTriangle, Filter, Search, ChevronRight } from 'lucide-react';

export function BenchmarkSection(): React.JSX.Element {
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const domains = ['all', 'Segurança & Auth', 'Backend / APIs', 'Frontend / UI', 'Algoritmos & DB'];

  const filteredCases = sampleTestCases.filter((tc) => {
    const matchesDomain = selectedDomain === 'all' || tc.domain === selectedDomain;
    const matchesSearch =
      tc.problemStatement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tc.rawOutcome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tc.aceleriaOutcome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tc.cwePrevented && tc.cwePrevented.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDomain && matchesSearch;
  });

  return (
    <section id="benchmarking" className="py-20 bg-slate-950/70 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            Evidência Empírica & Quantitativa
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Benchmarking de 120 Casos Sintéticos
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Resultados consolidados do estudo empírico com 120 problemas sintéticos de programação avaliados em modelos de ponta (Gemini 2.5, Claude 3.5 e GPT-4o), comparando Raw Prompting vs Protocolo Aceler.IA Dev.
          </p>
        </div>

        {/* 4 Quantitative Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benchmarkOverview.metrics.map((metric, idx) => {
            const isReduction = metric.trend === 'lower-is-better';
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-lg"
              >
                <div>
                  <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
                    {metric.category}
                  </div>
                  <h3 className="text-base font-bold text-white mb-4">
                    {metric.title}
                  </h3>

                  {/* Comparative Visual Bars */}
                  <div className="space-y-3 mb-5">
                    {/* Raw prompt bar */}
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Raw Prompting</span>
                        <span className="font-mono text-red-400 font-bold tabular-nums">
                          {metric.rawRate} {metric.unit}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-red-500 rounded-full"
                          style={{ width: `${Math.min(metric.rawRate, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Aceler.IA Dev bar */}
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span className="text-cyan-300 font-medium">Aceler.IA Dev</span>
                        <span className="font-mono text-emerald-400 font-bold tabular-nums">
                          {metric.aceleriaRate} {metric.unit}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"
                          style={{ width: `${Math.min(metric.aceleriaRate, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 mb-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{metric.differential}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {metric.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Architectural Flow Visual Asset */}
        <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 sm:p-8 mb-16 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
                Pipeline de Validação
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Fluxo Contínuo de Governança de Prompt
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                O framework atua como um compilador semântico pré-inferência: ele analisa a entrada do desenvolvedor, valida a conformidade dos 5 pilares, impede injeção de premissas estocásticas e audita a resposta da LLM contra as vulnerabilidades mapeadas no catálogo CWE/OWASP.
              </p>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Delimitação de espaço vetorial de busca</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Supressão de pacotes inexistentes no npm / PyPI</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Auditoria e controle cognitivo Human-in-the-Loop</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-xl overflow-hidden border border-slate-800 shadow-xl">
              <img
                src="/src/assets/images/aceleria_hero_diagram_1793989588806.jpg"
                alt="Diagrama arquitetural do fluxo de verificação segura de prompts"
                className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Exploratory Test Cases Browser */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-xl">
          
          {/* Table Controls */}
          <div className="p-4 sm:p-6 border-b border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">
                Amostragem de Casos de Teste (120 Casos)
              </h3>
              <p className="text-xs text-slate-400">
                Filtre por domínio ou pesquise por termo técnico (ex: SQL, Date, Concorrência, React).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Search input */}
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Pesquisar caso ou CWE..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              {/* Domain filter buttons */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 shrink-0 overflow-x-auto max-w-full">
                {domains.map((dom) => (
                  <button
                    key={dom}
                    onClick={() => setSelectedDomain(dom)}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      selectedDomain === dom
                        ? 'bg-cyan-500/20 text-cyan-300'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {dom === 'all' ? 'Todos' : dom}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Test Cases Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-mono">
                  <th className="py-3 px-4 w-20">ID</th>
                  <th className="py-3 px-4 w-32">Domínio</th>
                  <th className="py-3 px-4 min-w-[200px]">Enunciado / Problema</th>
                  <th className="py-3 px-4 min-w-[220px]">Desfecho Raw Prompting</th>
                  <th className="py-3 px-4 min-w-[220px]">Desfecho Aceler.IA Dev</th>
                  <th className="py-3 px-4 w-40">Mitigação CWE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredCases.length > 0 ? (
                  filteredCases.map((tc) => (
                    <tr key={tc.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-medium text-slate-400 whitespace-nowrap">
                        {tc.id}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-cyan-400 whitespace-nowrap">
                        {tc.domain}
                      </td>
                      <td className="py-3.5 px-4 text-slate-200">
                        {tc.problemStatement}
                      </td>
                      <td className="py-3.5 px-4 text-red-300/90 bg-red-950/10">
                        <div className="flex items-center gap-1.5 font-semibold text-red-400 text-[11px] mb-0.5">
                          <span>{tc.rawStatus}</span>
                        </div>
                        <p className="text-[11px] text-slate-300">{tc.rawOutcome}</p>
                      </td>
                      <td className="py-3.5 px-4 text-emerald-300/90 bg-emerald-950/10">
                        <div className="flex items-center gap-1.5 font-semibold text-emerald-400 text-[11px] mb-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{tc.aceleriaStatus}</span>
                        </div>
                        <p className="text-[11px] text-slate-300">{tc.aceleriaOutcome}</p>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-cyan-300 whitespace-nowrap">
                        {tc.cwePrevented ? (
                          <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                            {tc.cwePrevented}
                          </span>
                        ) : (
                          <span className="text-slate-500">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">
                      Nenhum caso encontrado para o filtro selecionado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table footer info */}
          <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>
              Exibindo {filteredCases.length} de {sampleTestCases.length} casos sintéticos em destaque.
            </span>
            <span className="font-mono text-[11px] text-slate-400">
              Corpus Completo: 120 Casos · Protocolo IFPR ID 4318/2026
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
