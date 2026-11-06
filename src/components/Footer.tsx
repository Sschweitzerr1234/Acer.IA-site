import React from 'react';
import { institutionalMeta } from '../data/odsData';
import { Terminal, Shield, BookOpen, ExternalLink, GraduationCap, Heart } from 'lucide-react';

interface FooterProps {
  onOpenProtocolModal: () => void;
}

export function Footer({ onOpenProtocolModal }: FooterProps): React.JSX.Element {
  return (
    <footer className="border-t border-slate-800 bg-[#070A11] text-slate-400 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand & Mission (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-[#0B0F19] rounded-[7px] flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Aceler.<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">IA</span> Dev
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Desenvolvimento e Benchmarking de um Framework de Inovação de Processos para Engenharia de Prompt Segura. Pesquisa aplicada e transferência tecnológica desenvolvida no IFPR.
            </p>

            <div className="text-xs text-slate-400 space-y-1">
              <div><strong className="text-slate-300">Supervisor:</strong> {institutionalMeta.supervisor}</div>
              <div><strong className="text-slate-300">Instituição:</strong> {institutionalMeta.institution}</div>
              <div><strong className="text-slate-300">Campus:</strong> {institutionalMeta.campus}</div>
              <div><strong className="text-slate-300">Registro:</strong> Processo {institutionalMeta.projectId}</div>
            </div>
          </div>

          {/* Navigation & Framework Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#sobre" className="hover:text-cyan-400 transition-colors">
                  Sobre o Projeto
                </a>
              </li>
              <li>
                <a href="#framework" className="hover:text-cyan-400 transition-colors">
                  Os 5 Pilares Sintáticos
                </a>
              </li>
              <li>
                <a href="#playground" className="hover:text-cyan-400 transition-colors">
                  Playground de Prompts
                </a>
              </li>
              <li>
                <a href="#benchmarking" className="hover:text-cyan-400 transition-colors">
                  Benchmarking (120 Casos)
                </a>
              </li>
              <li>
                <a href="#impacto" className="hover:text-cyan-400 transition-colors">
                  ODS ONU & APL de TI
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional Compliance & Open Source (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Governança & Licença
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              O framework opera em estrita conformidade com as <strong className="text-slate-300">Diretrizes do MEC (2026)</strong> para o uso pedagógico e ético de Inteligência Artificial na Educação Profissional e Tecnológica.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs">
              <button
                onClick={onOpenProtocolModal}
                className="text-left text-cyan-400 hover:text-cyan-300 font-medium hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <span>Baixar Protocolo v1.0 (Open Source)</span>
              </button>
              <div className="text-[11px] text-slate-400">
                Licença: CC-BY-SA 4.0 Internacional & MIT
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2025–2026 Aceler.IA Dev · IFPR Campus Assis Chateaubriand · ID 4318/2026
          </div>
          <div className="flex items-center gap-4">
            <span>Human-in-the-Loop</span>
            <span>·</span>
            <span>Segurança de Software</span>
            <span>·</span>
            <span>Ciência Aberta</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
