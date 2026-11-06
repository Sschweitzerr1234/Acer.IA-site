import React, { useState } from 'react';
import { X, Download, Copy, Check, FileText, Code2, BookOpen, ExternalLink } from 'lucide-react';
import { institutionalMeta } from '../data/odsData';

interface ProtocolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProtocolModal({ isOpen, onClose }: ProtocolModalProps): React.JSX.Element | null {
  const [activeTab, setActiveTab] = useState<'markdown' | 'snippets' | 'guide'>('markdown');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const protocolMarkdown = `# PROTOCOLO DE ENGENHARIA DE PROMPT SEGURA: ACELER.IA DEV (v1.0 - 2026)
Projeto de Pesquisa & Inovação IFPR • ID 4318/2026
Campus Assis Chateaubriand (CASSISDG)
Supervisor: ${institutionalMeta.supervisor}

## 1. INTRODUÇÃO E FINALIDADE
Este protocolo estabelece uma gramática formal e padronizada para interação com Modelos de Linguagem de Grande Porte (LLMs) em tarefas de engenharia de software, mitigando alucinações, dependências inexistentes (slopsquatting) e injeção de vulnerabilidades de código (OWASP Top 10).

## 2. OS 5 PILARES SINTÁTICOS OBRIGATÓRIOS

### Pilar 1: [CONTEXTO]
- Linguagem, versão mínima, dialeto (ex: TypeScript 5.4 strict).
- Runtime de execução (ex: Node.js 20 LTS, Edge Runtime, Browser).
- Frameworks e bibliotecas vigentes com versões.
- Restrição explícita de novos pacotes.

### Pilar 2: [OBJETIVO]
- Ação atômica unívoca com critérios de aceitação objetivos.
- Proibição de termos ambíguos ("arrume", "deixe bom").

### Pilar 3: [CÓDIGO]
- Recorte mínimo reproduzível (Smallest Reproducible Unit).
- Inclusão apenas das interfaces e tipos estritamente necessários.

### Pilar 4: [ERRO]
- Stack trace integral ou saída de erro literal do compilador.
- Sem paráfrases ou omissões manuais.

### Pilar 5: [DIRETIVA DE CORREÇÃO]
- Guardrails imperativos: "Não use 'any'", "Não instale novos pacotes", "Use Prepared Statements".
- Critérios de auditoria humana (Human-in-the-Loop).

## 3. TERMOS DE LICENÇA
Distribuído sob licença Creative Commons Atribuição-CompartilhaIgual 4.0 Internacional (CC BY-SA 4.0) e MIT License para trechos de código.`;

  const vsCodeSnippetsJson = `{
  "Aceler.IA Dev Safe Prompt Context": {
    "prefix": "acel-ctx",
    "body": [
      "[CONTEXTO]",
      "Ambiente: \${1:Node.js 20 LTS}",
      "Stack: \${2:TypeScript 5.4, React 19, Tailwind CSS v4}",
      "ORM / DB: \${3:Prisma ORM 5.12, PostgreSQL 16}",
      "Restrições: \${4:Apenas dependências presentes no package.json. Zero pacotes externos adicionais.}"
    ],
    "description": "Insere bloco de contexto do Aceler.IA Dev"
  },
  "Aceler.IA Dev Full 5 Pillars Prompt": {
    "prefix": "acel-full",
    "body": [
      "[CONTEXTO]",
      "\${1:TypeScript 5.4, Node.js 20 LTS, Express 4.19, Prisma ORM}",
      "",
      "[OBJETIVO]",
      "\${2:Descrever a intenção unívoca sem ambiguidades}",
      "",
      "[CÓDIGO]",
      "\`\`\`\${3:typescript}",
      "\${4:// Recorte mínimo isolado}",
      "\`\`\`",
      "",
      "[ERRO]",
      "\`\`\`",
      "\${5:// Log literal do erro ou stack trace}",
      "\`\`\`",
      "",
      "[DIRETIVA DE CORREÇÃO]",
      "- \${6:Não instale novos pacotes no package.json.}",
      "- \${7:Mantenha tipagem TypeScript estrita sem 'any'.}",
      "- \${8:Garanta conformidade com OWASP Top 10 e consultas parametrizadas.}"
    ],
    "description": "Template completo dos 5 Pilares do Aceler.IA Dev"
  }
}`;

  const pocketGuide = `GUIA DE BOLSO: DIRETRIZES MEC (2026) PARA IA NA EDUCAÇÃO PROFISSIONAL
======================================================================
1. NUNCA UTILIZE IA COMO "ORÁCULO CEGO"
   Toda linha gerada deve ser lida, explicada e justificada pelo estudante.

2. APLICAÇÃO DO PROTOCOLO DOS 5 PILARES
   Antes de colar qualquer pergunta na LLM, garanta o preenchimento de:
   [Contexto] -> [Objetivo] -> [Código] -> [Erro] -> [Diretiva].

3. CHECAGEM OBRIGATÓRIA DE DEPENDÊNCIAS
   Sempre execute \`npm view <pacote>\` antes de aceitar qualquer sugestão
   para prevenir ataques de Slopsquatting (pacotes alucinados).

4. VERIFICAÇÃO FORMAL DE SEGURANÇA
   Audite o código contra:
   - Concatenação de SQL (CWE-89)
   - Race Conditions em saldo/contadores (CWE-367)
   - Tipos 'any' ou supressões de linter (eslint-disable).`;

  const getActiveContent = () => {
    if (activeTab === 'markdown') return protocolMarkdown;
    if (activeTab === 'snippets') return vsCodeSnippetsJson;
    return pocketGuide;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = getActiveContent();
    const filename =
      activeTab === 'markdown'
        ? 'protocolo-aceleria-dev-v1.0.md'
        : activeTab === 'snippets'
        ? 'aceleria.code-snippets'
        : 'guia-de-bolso-mec-2026.txt';
    const mime = activeTab === 'snippets' ? 'application/json' : 'text/plain';

    const element = document.createElement('a');
    const file = new Blob([content], { type: mime });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div>
            <div className="text-xs font-mono text-cyan-400 mb-0.5">
              Protocolo Open Source · IFPR ID 4318/2026
            </div>
            <h3 className="text-lg font-bold text-white">
              Baixar Protocolo & Recursos Aceler.IA Dev
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-6 pt-4 pb-2 bg-slate-900 flex items-center gap-2 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('markdown')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'markdown'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Protocolo Completo (.md)</span>
          </button>

          <button
            onClick={() => setActiveTab('snippets')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'snippets'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>VS Code Snippets (.json)</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Guia de Bolso MEC (2026)</span>
          </button>
        </div>

        {/* Content Box */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
          <pre className="whitespace-pre-wrap">{getActiveContent()}</pre>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Licenciado sob <span className="text-white font-medium">CC-BY-SA 4.0</span> e <span className="text-white font-medium">MIT</span>.
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Conteúdo</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-95 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Arquivo</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
