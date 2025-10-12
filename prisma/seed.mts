// prisma/seed.mts
import { PrismaClient } from '@prisma/client';
import { initialBooks } from '../src/data/initial-books.ts'; // importa seus livros iniciais
import type { Book as BookType } from '../src/types/book.ts';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // log das queries para debug
});

async function main() {
  console.log('🌱 Iniciando seed dos livros...');

  for (const book of initialBooks as BookType[]) {
    // Checa se o livro já existe pelo ID
    const exists = await prisma.book.findUnique({ where: { id: book.id } });
    if (exists) {
      console.log(`⚠️ Livro já existe: "${book.title}"`);
      continue;
    }

    // Cria o livro no banco
    await prisma.book.create({
      data: {
        id: book.id,
        title: book.title,
        author: book.author,
        readingStatus: book.readingStatus as 'UNREAD' | 'READING' | 'FINISHED',
        currentPage: book.currentPage,
        totalPages: book.totalPages,
        rating: book.rating,
        genre: book.genre,
        coverUrl: book.coverUrl,
        synopsis: book.synopsis,
        isbn: book.isbn,
        notes: book.notes,
      },
    });

    console.log(`✅ Livro adicionado: "${book.title}"`);
  }

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((err) => {
    console.error('❌ Erro no seed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
