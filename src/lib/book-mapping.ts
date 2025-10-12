// src/lib/book-mapping.ts (Novo arquivo para helpers)

import { Book } from "@/types/book"; // Assumindo que Book é o tipo da sua API/Prisma

// Mapeia o Status ENUM do backend (INGLÊS) para o rótulo visual (PORTUGUÊS)
export const STATUS_MAP_VISUAL: Record<Book['readingStatus'], string> = {
    'FINISHED': 'LIDO',
    'READING': 'LENDO',
    'UNREAD': 'NÃO LIDO',
};

// Tipo simplificado que o seu MyCard espera
export interface MyCardPropsBook {
    id: string;
    title: string;
    author: string;
    coverUrl: string | null;
    publicationYear: number | null; // Usaremos o tipo original (number)
    readingStatus: Book['readingStatus'];
    genre: string | null;
}

// 💡 Função de Mapeamento para garantir que os dados do Server sejam corretos
export const mapBookToMyCardProps = (book: Book): MyCardPropsBook => ({
    id: book.id,
    title: book.title,
    author: book.author,
    coverUrl: book.coverUrl,
    publicationYear: book.publicationYear,
    readingStatus: book.readingStatus,
    genre: book.genre,
});
