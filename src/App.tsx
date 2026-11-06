import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { FrameworkPillars } from './components/FrameworkPillars';
import { PromptPlayground } from './components/PromptPlayground';
import { BenchmarkSection } from './components/BenchmarkSection';
import { ImpactODS } from './components/ImpactODS';
import { Footer } from './components/Footer';
import { ProtocolModal } from './components/ProtocolModal';

export default function App(): React.JSX.Element {
  const [protocolModalOpen, setProtocolModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F3F4F6] selection:bg-cyan-500/20 selection:text-white flex flex-col font-sans antialiased">
      {/* Top Bar Header */}
      <Header onOpenProtocolModal={() => setProtocolModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Interactive Terminal Focal Anchor */}
        <Hero onOpenProtocolModal={() => setProtocolModalOpen(true)} />

        {/* Problem vs Solution Split Screen */}
        <ProblemSolution />

        {/* The 5 Pillars of Safe Prompting */}
        <FrameworkPillars />

        {/* Interactive Prompt Playground & Live Quality Auditor */}
        <PromptPlayground />

        {/* Benchmarking & Data Visualization (120 Synthetic Problems) */}
        <BenchmarkSection />

        {/* Social Impact: ODS ONU & Regional APL Tech Transfer */}
        <ImpactODS onOpenProtocolModal={() => setProtocolModalOpen(true)} />
      </main>

      {/* Institutional Footer */}
      <Footer onOpenProtocolModal={() => setProtocolModalOpen(true)} />

      {/* Open Source Protocol Download Modal */}
      <ProtocolModal
        isOpen={protocolModalOpen}
        onClose={() => setProtocolModalOpen(false)}
      />
    </div>
  );
}
