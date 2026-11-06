import React from 'react';
import { AlertOctagon, CheckCircle2, ShieldCheck, Cpu, Brain, Zap, HelpCircle } from 'lucide-react';

export function ProblemSolution(): React.JSX.Element {
  return (
    <section id="sobre" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            Diagnóstico Acadêmico & Industrial
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            O Paradoxo da IA na Engenharia de Software
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            A geração de código por Large Language Models (LLMs) promete velocidade extrema, mas quando praticada de forma empírica e desestruturada, introduz riscos silenciosos que comprometem a segurança e a formação técnica.
          </p>
        </div>

        {/* Split Screen Problem vs Solution Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-16">
          
          {/* Card 1: O Problema (Empirical Prompting) */}
          <div className="rounded-2xl bg-gradient-to-b from-red-950/20 to-slate-900/60 border border-red-900/40 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                  <AlertOctagon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">O Problema: Uso Empírico & Caixa-Preta</h3>
                  <span className="text-xs text-red-400/90 font-mono">Sem protocolo · Alta incerteza</span>
                </div>
              </div>

              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                Desenvolvedores em início de carreira recorrem a prompts intuitivos e vagos como <em>"corrige meu código"</em> ou <em>"faz essa função pra mim"</em>, delegando inteiramente o raciocínio computacional para modelos generativos estocásticos.
              </p>

              <div className="space-y-4">
                <div className="p-3.5 rounded-lg bg-red-950/20 border border-red-900/30">
                  <h4 className="text-sm font-semibold text-red-300 mb-1">Amnésia e Perda de Controle Cognitivo</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    O desenvolvedor perde a capacidade de explicar a mecânica do software, violando o princípio pedagógico fundamental da aprendizagem autêntica.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-red-950/20 border border-red-900/30">
                  <h4 className="text-sm font-semibold text-red-300 mb-1">Alucinação de Pacotes Fantasma (Slopsquatting)</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    O modelo inventa bibliotecas de terceiros que não existem nos repositórios oficiais, abrindo portas para ataques graves à cadeia de suprimentos de software.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-red-950/20 border border-red-900/30">
                  <h4 className="text-sm font-semibold text-red-300 mb-1">Débitos Técnicos e Vulnerabilidades Ocultas</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Códigos gerados sem restrições explícitas contêm falhas clássicas como SQL Injection, Race Conditions e exposição de credenciais em logs abertos.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-red-900/40 flex items-center justify-between text-xs text-red-400">
              <span className="font-mono">Falha em 61.7% das tentativas empíricas</span>
              <span className="text-slate-400">Fonte: Estudo IFPR 4318/2026</span>
            </div>
          </div>

          {/* Card 2: A Solução (Aceler.IA Dev Framework) */}
          <div className="rounded-2xl bg-gradient-to-b from-cyan-950/20 to-slate-900/60 border border-cyan-800/40 p-6 sm:p-8 flex flex-col justify-between shadow-lg shadow-cyan-950/20">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">A Solução: Protocolo Aceler.IA Dev</h3>
                  <span className="text-xs text-cyan-400/90 font-mono">Governança Sintática · Human-in-the-Loop</span>
                </div>
              </div>

              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                Um framework de inovação de processos baseado em um protocolo sintático de 5 pilares, ancorado na supervisão humana ativa e alinhado com as diretrizes do MEC (2026) sobre IA na educação profissional e tecnológica.
              </p>

              <div className="space-y-4">
                <div className="p-3.5 rounded-lg bg-cyan-950/20 border border-cyan-800/30">
                  <h4 className="text-sm font-semibold text-cyan-300 mb-1">Human-in-the-Loop Obrigatório</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    O desenvolvedor atua como arquiteto de requisitos e auditor formal de cada bloco gerado, garantindo rastreabilidade e governança de código.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-cyan-950/20 border border-cyan-800/30">
                  <h4 className="text-sm font-semibold text-cyan-300 mb-1">Protocolo Sintático dos 5 Pilares</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Contexto, Objetivo, Código, Erro e Diretiva de Correção delimitam os graus de liberdade da LLM, impedindo alucinações e pacotes fantasmas.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-cyan-950/20 border border-cyan-800/30">
                  <h4 className="text-sm font-semibold text-cyan-300 mb-1">Conformidade com Diretrizes MEC (2026)</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Garante o desenvolvimento do pensamento crítico e letramento em IA, transformando a máquina em acelerador cognitivo em vez de muleta técnica.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-cyan-800/40 flex items-center justify-between text-xs text-cyan-400">
              <span className="font-mono">89.2% de compilação limpa na 1ª tentativa</span>
              <span className="text-slate-400">Supervisão: Prof. Eduardo Takao</span>
            </div>
          </div>

        </div>

        {/* Research Context Media Box */}
        <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 rounded-xl overflow-hidden border border-slate-800 shadow-md">
            <img
              src="/src/assets/images/aceleria_research_lab_1793989591029.jpg"
              alt="Bancada de pesquisa do IFPR com benchmarking de prompt seguro"
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="w-full md:w-1/2">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
              Ambiente de Pesquisa IFPR
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Desenvolvido no Laboratório de Computação Aplicada
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              O projeto <span className="text-white font-medium">Aceler.IA Dev (ID 4318/2026)</span> foi concebido e testado no Instituto Federal do Paraná, Campus Assis Chateaubriand. O objetivo central é superar o fosso entre o empirismo ingênuo dos estudantes e as exigências de segurança cibernética e robustez de software da indústria contemporânea.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="text-cyan-400">●</span>
                <span>Pesquisa Aplicada</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-purple-400">●</span>
                <span>Benchmarking Empírico</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400">●</span>
                <span>Transferência para o APL</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
