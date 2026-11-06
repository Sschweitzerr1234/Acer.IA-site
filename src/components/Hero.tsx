import React from 'react';
import { InteractiveTerminal } from './InteractiveTerminal';
import { ArrowRight, BarChart3, BookOpen, ShieldCheck, Sparkles, Terminal } from 'lucide-react';

interface HeroProps {
  onOpenProtocolModal: () => void;
}

export function Hero({ onOpenProtocolModal }: HeroProps): React.JSX.Element {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-purple-600/10 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/5 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Institutional Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span className="text-xs font-medium text-slate-300">
              Projeto de Pesquisa & Inovação IFPR
            </span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span className="text-xs font-mono text-cyan-300">
              ID 4318/2026
            </span>
            <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Campus Assis Chateaubriand
            </span>
          </div>
        </div>

        {/* Main Headline & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]" style={{ textWrap: 'balance' }}>
            Engenharia de Prompt Segura para o Futuro do{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
              Desenvolvimento de Software
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
            Mitigando alucinações algorítmicas, dependências fantasmas e vulnerabilidades de código através de um protocolo sintático de governança e supervisão humana (<span className="text-cyan-300 font-medium">Human-in-the-loop</span>).
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <a
            href="#framework"
            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl hover:opacity-95 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>Acessar o Framework (5 Pilares)</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#benchmarking"
            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-200 bg-slate-900/90 border border-slate-700/80 rounded-xl hover:bg-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span>Ver Dados de Benchmarking</span>
          </a>

          <button
            onClick={onOpenProtocolModal}
            className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-300 hover:text-white bg-transparent border border-slate-800 hover:border-slate-700 rounded-xl transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span>Baixar Protocolo Open Source</span>
          </button>
        </div>

        {/* Quick Quantitative Proof Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-14 bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 sm:p-5 backdrop-blur-sm">
          <div className="text-center p-2">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400 tabular-nums">-92.8%</div>
            <div className="text-xs text-slate-400 mt-1">Alucinações Mitigadas</div>
          </div>
          <div className="text-center p-2 border-l border-slate-800">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-purple-400 tabular-nums">89.2%</div>
            <div className="text-xs text-slate-400 mt-1">Compilação 1ª Tentativa</div>
          </div>
          <div className="text-center p-2 border-l border-slate-800">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400 tabular-nums">120</div>
            <div className="text-xs text-slate-400 mt-1">Casos de Teste Sintéticos</div>
          </div>
          <div className="text-center p-2 border-l border-slate-800">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">MEC '26</div>
            <div className="text-xs text-slate-400 mt-1">Conformidade Pedagógica</div>
          </div>
        </div>

        {/* Visual Focal Anchor: Interactive Terminal */}
        <div className="w-full">
          <div className="text-center mb-3">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400/90">
              Demonstração Interativa em Tempo Real
            </span>
          </div>
          <InteractiveTerminal />
        </div>

      </div>
    </section>
  );
}
