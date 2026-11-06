import React from 'react';
import { odsData, institutionalMeta } from '../data/odsData';
import { GraduationCap, Briefcase, Network, Award, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface ImpactODSProps {
  onOpenProtocolModal: () => void;
}

export function ImpactODS({ onOpenProtocolModal }: ImpactODSProps): React.JSX.Element {
  return (
    <section id="impacto" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            Impacto Social, Educacional & Regional
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Compromisso com os ODS da ONU & Diretrizes MEC (2026)
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Mais que um framework técnico, o Aceler.IA Dev é uma intervenção estruturante na formação profissional e na maturidade tecnológica do ecossistema de software regional.
          </p>
        </div>

        {/* 3 ODS Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {odsData.map((ods) => (
            <div
              key={ods.number}
              className="rounded-2xl bg-slate-900/50 border border-slate-800 p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl"
            >
              <div>
                {/* ODS Badge Number */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg text-white shadow-lg"
                    style={{ backgroundColor: ods.color }}
                  >
                    ODS {ods.number}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Nações Unidas 2030
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                  {ods.title}
                </h3>
                <div className="text-xs font-medium text-cyan-300 mb-3">
                  {ods.tagline}
                </div>

                <div className="text-[11px] font-mono text-slate-400 mb-4 bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
                  {ods.targetMEC}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {ods.description}
                </p>

                {/* Concrete Actions List */}
                <div className="space-y-2 mb-6">
                  {ods.concreteActions.map((action, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-cyan-400 font-bold shrink-0">●</span>
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Metric Strip */}
              <div className="pt-4 border-t border-slate-800">
                <div className="text-2xl font-bold font-mono text-white tabular-nums">
                  {ods.impactMetric}
                </div>
                <div className="text-[11px] text-slate-400">
                  {ods.impactMetricLabel}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* APL (Arranjo Produtivo Local) Tech Transfer Spotlight */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-[#0c1427] border border-cyan-800/40 p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 font-mono text-xs font-semibold">
                <Network className="w-3.5 h-3.5" />
                <span>Transferência de Tecnologia · Extensão IFPR</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Fortalecendo o APL de TI do Oeste Paranaense
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                O Campus Assis Chateaubriand atua como polo catalisador de inovação. Através de parcerias com o Arranjo Produtivo Local (APL) de TI, o protocolo do Aceler.IA Dev é transferido para startups, software houses e empresas incubadas da região, reduzindo custos de retrabalho e prevenindo incidentes cibernéticos.
              </p>

              <div className="grid grid-cols-2 gap-4 py-2 text-xs">
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="font-bold text-white mb-0.5">Empresas Parceiras</div>
                  <div className="text-slate-400">Capacitação em governança sintática para equipes dev.</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="font-bold text-white mb-0.5">Licenciamento Aberto</div>
                  <div className="text-slate-400">100% livre e utilizável sob licença MIT e CC-BY-SA 4.0.</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenProtocolModal}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-xs font-semibold text-white hover:opacity-95 shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  <span>Aderir ao Protocolo no seu Time</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-xl overflow-hidden border border-slate-800 shadow-xl">
              <img
                src="/src/assets/images/aceleria_apl_collaboration_1793989589995.jpg"
                alt="Equipe de desenvolvimento e pesquisadores colaborando em tecnologia de prompt seguro"
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
