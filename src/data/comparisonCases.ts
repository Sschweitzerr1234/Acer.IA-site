export interface ComparisonCase {
  id: string;
  title: string;
  category: 'Segurança & Backend' | 'Frontend & APIs' | 'Sistemas & Concorrência';
  description: string;
  rawPrompt: {
    promptText: string;
    generatedCode: string;
    issues: string[];
    riskLevel: 'Crítico' | 'Alto' | 'Médio';
    cwe: string;
    compilation: 'Falha ou Inseguro';
  };
  aceleriaPrompt: {
    context: string;
    objective: string;
    code: string;
    error: string;
    directive: string;
    generatedCode: string;
    benefits: string[];
    securityScore: '100% Conforme';
    compilation: 'Sucesso (1ª tentativa)';
  };
}

export const comparisonCases: ComparisonCase[] = [
  {
    id: 'case-sql-injection',
    title: 'Prevenção de Injeção SQL & Sanitização de Dados',
    category: 'Segurança & Backend',
    description: 'Endpoint de autenticação e busca de usuário recebendo strings não tratadas.',
    rawPrompt: {
      promptText: 'Meu endpoint de login tá dando erro quando o usuário digita apóstrofo ou caractere estranho, conserta aí rapidinho pra aceitar qualquer input sem travar.',
      generatedCode: `// ❌ Código gerado via Raw Prompting (Inseguro)
app.post('/api/v1/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  // VULNERABILIDADE CRÍTICA: Concatenação direta de SQL
  const query = "SELECT * FROM users WHERE email = '" + email + "' AND pass = '" + password + "'";
  
  const result = await db.raw(query);
  if (result.length > 0) {
    // Alucinação de segredo hardcoded e token sem expiração
    return res.json({ token: "fake-jwt-secret-12345", user: result[0] });
  }
  return res.status(401).send("Invalid credentials");
});`,
      issues: [
        'Vulnerabilidade Crítica: CWE-89 (SQL Injection via concatenação direta)',
        'Exposição de dados sensíveis na resposta sem exclusão de hash de senha',
        'Ausência de validação de payload (ex: Zod/Joi) e tipagem segura',
        'Segredo hardcoded na geração do token',
      ],
      riskLevel: 'Crítico',
      cwe: 'CWE-89 / OWASP A03:2021',
      compilation: 'Falha ou Inseguro',
    },
    aceleriaPrompt: {
      context: 'TypeScript 5.4, Express 4.19, Prisma ORM 5.12, Argon2 para hashing.',
      objective: 'Implementar autenticação segura por email e senha com Prepared Statements e JWT assinado.',
      code: `export async function loginHandler(req: Request, res: Response) {
  // Precisa de validação de schema e verificação segura de credencial
}`,
      error: 'Entradas maliciosas como \' OR 1=1 -- burlavam a checagem anterior.',
      directive: 'Utilize Prisma com consultas parametrizadas, valide entrada com Zod, compare hashes com Argon2 e nunca retorne o passwordHash.',
      generatedCode: `// ✅ Código gerado via Framework Aceler.IA Dev
import { z } from 'zod';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import type { Request, Response } from 'express';

const LoginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(128),
});

export async function loginHandler(req: Request, res: Response): Promise<Response> {
  const parseResult = LoginSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: 'Payload de autenticação inválido' });
  }

  const { email, password } = parseResult.data;

  // Consulta parametrizada pelo ORM - Imune a SQL Injection
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, passwordHash: true, role: true },
  });

  if (!user || !(await argon2.verify(user.passwordHash, password))) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  const token = jwt.sign(
    { sub: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '2h', algorithm: 'HS256' }
  );

  return res.status(200).json({
    token,
    user: { id: user.id, email: user.email, role: user.role }
  });
}`,
      benefits: [
        'Mitigação total de CWE-89 com prepared statements e Prisma ORM',
        'Validação estrita de tipos com Zod antes de atingir o banco',
        'Hash criptográfico seguro (Argon2) contra timing attacks',
        'Payload sanitizado e conformidade 100% com OWASP Top 10',
      ],
      securityScore: '100% Conforme',
      compilation: 'Sucesso (1ª tentativa)',
    },
  },
  {
    id: 'case-hallucinated-package',
    title: 'Prevenção de Dependências Fantasma & Slopsquatting',
    category: 'Frontend & APIs',
    description: 'Manipulação de datas e formatação de moedas sem importar bibliotecas inexistentes.',
    rawPrompt: {
      promptText: 'Faz uma função React pra calcular a diferença entre duas datas em dias úteis no Brasil e formatar como moeda BRL.',
      generatedCode: `// ❌ Código gerado via Raw Prompting (Alucinação de Pacotes)
import React from 'react';
// ALUCINAÇÃO: Pacote 'brazilian-banking-calendar' NÃO existe no npm!
import { getWorkingDaysBetween } from 'brazilian-banking-calendar';
// ALUCINAÇÃO: Método inexistente em react-intl-currency
import { formatRealMoney } from 'react-intl-currency';

export function DateDiffCard({ startDate, endDate, fee }: any) {
  // Quebra na execução com TypeError
  const days = getWorkingDaysBetween(startDate, endDate);
  const total = formatRealMoney(fee * days, { precision: 2 });
  
  return <div>{days} dias úteis: {total}</div>;
}`,
      issues: [
        'Alucinação de pacote fantasma: "brazilian-banking-calendar" não existe no NPM',
        'Risco de segurança Supply Chain (Slopsquatting: atacante pode registrar o pacote falso)',
        'Uso irrestrito de tipo any em props',
        'Falha imediata no bundle: Module not found',
      ],
      riskLevel: 'Alto',
      cwe: 'CWE-1357 (Dependency Confusion)',
      compilation: 'Falha ou Inseguro',
    },
    aceleriaPrompt: {
      context: 'React 19, TypeScript 5.4, sem dependências externas adicionais, utilitários nativos de JavaScript (Intl e Date).',
      objective: 'Calcular a diferença de dias úteis (seg-sex) entre duas datas e formatar valor monetário em BRL usando a API nativa Intl.NumberFormat.',
      code: `interface DateDiffProps {
  startDate: Date;
  endDate: Date;
  dailyRate: number;
}`,
      error: 'O assistente anterior tentou instalar pacotes inexistentes que quebraram o Vite build.',
      directive: 'Não instale pacotes externos. Utilize lógica pura com Date e Intl.NumberFormat(pt-BR, currency: BRL). Valide datas.',
      generatedCode: `// ✅ Código gerado via Framework Aceler.IA Dev
import React, { useMemo } from 'react';

interface DateDiffProps {
  startDate: Date;
  endDate: Date;
  dailyRate: number;
}

const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function calculateBusinessDays(start: Date, end: Date): number {
  let count = 0;
  const current = new Date(Math.min(start.getTime(), end.getTime()));
  const target = new Date(Math.max(start.getTime(), end.getTime()));

  while (current <= target) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Ignora domingo e sábado
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  return count;
}

export function DateDiffCard({ startDate, endDate, dailyRate }: DateDiffProps): React.JSX.Element {
  const businessDays = useMemo(
    () => calculateBusinessDays(startDate, endDate),
    [startDate, endDate]
  );

  const formattedTotal = useMemo(
    () => brlFormatter.format(businessDays * dailyRate),
    [businessDays, dailyRate]
  );

  return (
    <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
      <span className="text-xs text-slate-400">Total Calculado</span>
      <p className="text-xl font-semibold text-cyan-400">{formattedTotal}</p>
      <span className="text-xs text-slate-500">{businessDays} dias úteis contabilizados</span>
    </div>
  );
}`,
      benefits: [
        'Zero dependências externas: Elimina 100% o risco de Slopsquatting',
        'Utilização da API padrão da plataforma web (Intl.NumberFormat)',
        'Tipagem estrita TypeScript com React.JSX.Element e interfaces',
        'Performance otimizada com memoização (useMemo)',
      ],
      securityScore: '100% Conforme',
      compilation: 'Sucesso (1ª tentativa)',
    },
  },
  {
    id: 'case-race-condition',
    title: 'Condição de Corrida & Concorrência Assíncrona',
    category: 'Sistemas & Concorrência',
    description: 'Controle de saldo concorrente em carteira digital para evitar double-spending.',
    rawPrompt: {
      promptText: 'Corrige aí a transferência de crédito de usuário que às vezes o saldo fica negativo quando o cara clica duas vezes rápido no botão.',
      generatedCode: `// ❌ Código gerado via Raw Prompting (Race Condition)
async function transferBalance(fromUserId, toUserId, amount) {
  // VULNERABILIDADE: TOCTOU (Time of Check to Time of Use)
  const sender = await db.getUser(fromUserId);
  
  if (sender.balance >= amount) {
    // Janela crítica de concorrência: duas requisições simultâneas passam pelo if!
    await sleep(50); // delay de rede simulado
    await db.updateUser(fromUserId, { balance: sender.balance - amount });
    await db.updateUser(toUserId, { balance: sender.balance + amount });
    return true;
  }
  return false;
}`,
      issues: [
        'Vulnerabilidade: CWE-367 (Time-of-check Time-of-use Race Condition)',
        'Double-spending vulnerável a requisições simultâneas em lote',
        'Ausência de transação atômica de banco de dados (ACID)',
        'Atualização de saldo de destino com valor incorreto (bug de lógica)',
      ],
      riskLevel: 'Crítico',
      cwe: 'CWE-367 / Concorrência Tóxica',
      compilation: 'Falha ou Inseguro',
    },
    aceleriaPrompt: {
      context: 'Node.js 20 LTS, PostgreSQL 16 com isolamento Serializable ou Row Locking, Prisma ORM.',
      objective: 'Implementar transferência atômica de saldo entre duas contas prevenindo estritamente double-spending e saldo negativo sob concorrência intensa.',
      code: `export async function transferCredits(fromId: string, toId: string, amount: number) {
  // Executar débito e crédito
}`,
      error: 'Disparos simultâneos causavam débito duplo permitindo saldo negativo (Race Condition).',
      directive: 'Utilize transação interativa do Prisma com bloqueio otimista ou decremento atômico condicional WHERE balance >= amount. Retorne erro semântico.',
      generatedCode: `// ✅ Código gerado via Framework Aceler.IA Dev
import { prisma } from '../lib/prisma';

export interface TransferResult {
  success: boolean;
  transactionId?: string;
  errorMessage?: string;
}

export async function transferCredits(
  fromId: string,
  toId: string,
  amount: number
): Promise<TransferResult> {
  if (amount <= 0) {
    return { success: false, errorMessage: 'Valor de transferência deve ser estritamente positivo' };
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Atualização atômica com validação condicional no nível do motor SQL
      const debitResult = await tx.account.updateMany({
        where: {
          id: fromId,
          balance: { gte: amount }, // Garante atomicidade: falha se saldo insuficiente
        },
        data: {
          balance: { decrement: amount },
        },
      });

      if (debitResult.count === 0) {
        throw new Error('SALDO_INSUFICIENTE_OU_CONCORRENCIA');
      }

      // 2. Crédito na conta de destino
      await tx.account.update({
        where: { id: toId },
        data: { balance: { increment: amount } },
      });

      // 3. Registro imutável de auditoria
      return await tx.auditLog.create({
        data: { fromId, toId, amount, status: 'COMPLETED' },
      });
    });

    return { success: true, transactionId: result.id };
  } catch (error: any) {
    return {
      success: false,
      errorMessage: error.message === 'SALDO_INSUFICIENTE_OU_CONCORRENCIA'
        ? 'Saldo insuficiente ou conflito de concorrência simultâneo.'
        : 'Erro interno ao processar transferência atômica.',
    };
  }
}`,
      benefits: [
        'Atomicidade total com Prisma Interactive Transactions ($transaction)',
        'Eliminação de Time-of-Check Time-of-Use via decremento atômico condicional',
        'Log imutável de auditoria integrado para rastreabilidade financeira',
        'Retorno de tipos estritos com tratamento robusto de exceções',
      ],
      securityScore: '100% Conforme',
      compilation: 'Sucesso (1ª tentativa)',
    },
  },
];
