import { PrismaClient } from '@prisma/client'

// Adiciona prisma ao objeto global para evitar criar múltiplas instâncias
// durante o desenvolvimento (Hot Reloading)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Exporta a instância única do PrismaClient
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Opcional: Ativa o log de queries para debug no console
    log: ['query', 'info', 'warn', 'error'],
  })

// Em ambiente de desenvolvimento, anexa a instância ao globalThis
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma