// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

// Evita múltiplas instâncias do PrismaClient durante o desenvolvimento (Hot Reload)
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient
}

// Cria (ou reutiliza) a instância do PrismaClient
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'info', 'warn', 'error'] // logs detalhados em dev
        : ['error'], // apenas erros em produção
  })

// Em ambiente de desenvolvimento, mantém a instância no escopo global
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
