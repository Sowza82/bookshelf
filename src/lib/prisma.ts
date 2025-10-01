// src/lib/prisma.ts

import { PrismaClient } from '@prisma/client'

// 🔑 Solução para o Hot Reloading do Next.js
// Cria um objeto global para armazenar a instância do Prisma Client
// Isso evita que o Next.js crie uma nova instância a cada hot reload
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // Opcional: Adicionar logs de query para debug
    log: ['query', 'info', 'warn', 'error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Agora, qualquer arquivo pode importar a instância 'prisma' de '@/lib/prisma'
