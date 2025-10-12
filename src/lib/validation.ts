// src/lib/validation.ts

import { APIReadingStatus, BookFormClientStatus } from '@/types/book';
import { z } from 'zod';

// Simulação de constantes (ajuste conforme seu projeto)
export const AVAILABLE_GENRES = [
  'Ficção', 'Fantasia', 'Romance', 'Thriller', 'Ficção Científica', 'História', 'Biografia', 'Autoajuda', 'Tecnologia', 'Poesia', 'Aventura', 'Mistério', 'Infantil', 'Jovem Adulto', 'Horror', 'Clássico', 'Distopia', 'Não-Ficção'
] as const;

// Mapeamento PT -> EN
export const STATUS_MAP: Record<BookFormClientStatus, APIReadingStatus> = {
    "lendo": "READING",
    "lido": "FINISHED",
    "quero-ler": "UNREAD",
};

// Mapeamento EN -> PT
export const STATUS_MAP_REVERSE: Record<APIReadingStatus, BookFormClientStatus> = {
    "READING": "lendo",
    "FINISHED": "lido",
    "UNREAD": "quero-ler",
};

// 🔹 BOOK_FORM_CLIENT_SCHEMA: Usado no RHF (React Hook Form)
export const BOOK_FORM_CLIENT_SCHEMA = z.object({
    id: z.string().optional(),
    title: z.string().trim().min(3, "O título é obrigatório."),
    author: z.string().trim().min(3, "O nome do autor é obrigatório."),
    year: z.preprocess(
        (val) => (val === "" ? undefined : Number(val)),
        z.number().int().min(1000, "Ano inválido.").max(new Date().getFullYear(), "Ano futuro?").optional()
    ),
    rating: z.preprocess(
        (val) => (val === "" ? undefined : Number(val)),
        z.number().min(0, "Mínimo é 0.").max(5, "Máximo é 5.").optional()
    ),
    genre: z.enum(AVAILABLE_GENRES as [string, ...string[]]).optional(),
    status: z.enum(["lendo", "lido", "quero-ler"] as [BookFormClientStatus, ...BookFormClientStatus[]]),
    description: z.string().optional(),
    coverImageUrl: z.string().optional(),
    totalPages: z.preprocess((val) => (val === "" ? undefined : Number(val)), z.number().int().positive("Páginas inválidas").optional()),
    currentPage: z.preprocess((val) => (val === "" ? undefined : Number(val)), z.number().int().nonnegative("Página inválida").optional()),
});

// 🔹 BOOK_CREATE_SCHEMA: Usado para Server Actions (POST)
export const BOOK_CREATE_SCHEMA = BOOK_FORM_CLIENT_SCHEMA
    .omit({ id: true })
    .strict()  // ⬅️ Colocado antes do transform
    .transform(data => ({
        title: data.title,
        author: data.author,
        genre: data.genre ?? null,
        rating: data.rating ?? null,
        totalPages: data.totalPages ?? null,
        currentPage: data.currentPage ?? null,
        readingStatus: STATUS_MAP[data.status],
        publicationYear: data.year ?? null,
        synopsis: data.description ?? null,
        coverUrl: data.coverImageUrl ?? null,
    }));

// 🔹 BOOK_UPDATE_SCHEMA: Usado para Server Actions (PUT)
export const BOOK_UPDATE_SCHEMA = BOOK_FORM_CLIENT_SCHEMA
    .partial()
    .transform(data => ({
        title: data.title,
        author: data.author,
        genre: data.genre,
        rating: data.rating,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
        coverUrl: data.coverImageUrl,
        publicationYear: data.year,
        synopsis: data.description,
        ...(data.status !== undefined && { readingStatus: STATUS_MAP[data.status] }),
    }));
