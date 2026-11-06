import React, { useState } from 'react';
import { Terminal, Shield, Download, Menu, X, FileCode } from 'lucide-react';

interface HeaderProps {
  onOpenProtocolModal: () => void;
}

export function Header({ onOpenProtocolModal }: HeaderProps): React.JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Sobre', href: '#sobre' },
    { label: 'O Framework', href: '#framework' },
    { label: 'Playground', href: '#playground' },
    { label: 'Benchmarking', href: '#benchmarking' },
    { label: 'Impacto & ODS', href: '#impacto' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark (Display font, clean single line) */}
        <a href="#" className="flex items-center gap-2.5 group whitespace-nowrap shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 p-[1px] flex items-center justify-center shadow-lg shadow-cyan-500/10">
            <div className="w-full h-full bg-[#0B0F19] rounded-[7px] flex items-center justify-center">
              <Terminal className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold tracking-tight text-white font-sans">
              Aceler.<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">IA</span> Dev
            </span>
            <span className="text-[11px] font-mono text-cyan-400/80 tracking-wider">IFPR</span>
          </div>
        </a>

        {/* Zone 2: 4-5 Navigation Links (single-line, subtle hover) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenProtocolModal}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg hover:opacity-95 shadow-md shadow-cyan-500/20 transition-all hover:shadow-cyan-500/30 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar Protocolo</span>
          </button>
        </div>

        {/* Mobile Hamburger toggle */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0B0F19] px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-900 rounded-md"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProtocolModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Protocolo Open Source</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
