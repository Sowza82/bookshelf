import { PrismaClient } from '@prisma/client';
import { initialBooks } from '../src/data/initial-books.ts'; // atenção à extensão
import type { Book } from '../src/types/book.ts';

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed dos livros...')

  for (const book of initialBooks as Book[]) {
    const exists = await prisma.book.findUnique({ where: { id: book.id } })
    if (exists) {
      console.log(`⚠️ Livro já existe: "${book.title}"`)
      continue
    }

    await prisma.book.create({
      data: {
        id: book.id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        rating: book.rating,
        coverUrl: book.coverUrl,
        readingStatus: book.readingStatus,
        currentPage: book.currentPage,
        totalPages: book.totalPages,
        notes: book.notes
      }
    })

    console.log(`✅ Livro adicionado: "${book.title}"`)
  }

  console.log('🎉 Seed concluído!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => prisma.$disconnect())
