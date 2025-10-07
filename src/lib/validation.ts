import { z } from 'zod';
import { AVAILABLE_GENRES } from './constants';

// Mapeamento de Status do Front-end (PT) para o Backend (EN/Interface Book)
const STATUS_MAP: Record<"lendo" | "lido" | "quero-ler", "READING" | "FINISHED" | "UNREAD"> = {
    "lendo": "READING",
    "lido": "FINISHED",
    "quero-ler": "UNREAD",
};

// Tipagem base que o frontend usará para o formulário
const BookFormSchema = z.object({
    id: z.string().optional(),
    title: z.string().trim().min(3, "O título é obrigatório e precisa de no mínimo 3 caracteres."),
    author: z.string().trim().min(3, "O nome do autor é obrigatório."),

    year: z.preprocess(
        (val) => (typeof val === "string" ? Number(val) : val),
        z.number().int().positive("O ano deve ser um número inteiro e positivo.")
    ),
    rating: z.preprocess(
        (val) => (typeof val === "string" ? Number(val) : val),
        z.number().min(0, "O rating mínimo é 0.").max(5, "O rating máximo é 5.")
    ),
    genre: z.enum(AVAILABLE_GENRES as [string, ...string[]], {
        required_error: "Selecione um gênero válido.",
    }),

    // O status de entrada ainda é em português (o que o formulário envia)
    status: z.enum(["lendo", "lido", "quero-ler"]),

    description: z.string().optional().default(''),

    coverImageUrl: z.string().optional().refine(
        val => !val || /^https?:\/\/.+/.test(val),
        "A URL da capa deve ser um formato válido."
    ),

    totalPages: z.preprocess(
        (val) => (typeof val === "string" ? Number(val) : val),
        z.number().int().min(1, "O número de páginas deve ser positivo.").optional()
    ),
    currentPage: z.preprocess(
        (val) => (typeof val === "string" ? Number(val) : val),
        z.number().int().min(0, "A página atual deve ser zero ou mais.").optional()
    ),
});

/**
 * 🔹 BOOK_SCHEMA: Schema que o frontend envia, transformado para o formato Prisma (uso na CRIAÇÃO).
 */
export const BOOK_SCHEMA = BookFormSchema.transform(data => ({
    id: data.id,
    title: data.title,
    author: data.author,
    genre: data.genre,
    rating: data.rating,
    totalPages: data.totalPages,
    currentPage: data.currentPage,

    // ✅ TRANSFORMAÇÃO DE STATUS PARA CRIAÇÃO
    readingStatus: STATUS_MAP[data.status],
    publicationYear: data.year,
    synopsis: data.description,
    coverUrl: data.coverImageUrl,
}))

// 🔹 Versão para criação
export const BOOK_CREATE_SCHEMA = BOOK_SCHEMA

/**
 * 🔹 BOOK_UPDATE_SCHEMA: Versão para atualização.
 * A chave é converter o 'status' APENAS se ele estiver presente nos dados.
 */
export const BOOK_UPDATE_SCHEMA = BookFormSchema.partial().transform(data => ({
    // Campos que não mudam
    id: data.id,
    title: data.title,
    author: data.author,
    genre: data.genre,
    rating: data.rating,
    totalPages: data.totalPages,
    currentPage: data.currentPage,

    // ✅ CORREÇÃO CHAVE: Mapeamento condicional do status
    ...(data.status !== undefined && {
        readingStatus: STATUS_MAP[data.status] // Usa o mapa de tradução
    }),

    // ✅ OUTRAS TRANSFORMAÇÕES
    ...(data.year !== undefined && { publicationYear: data.year }),
    ...(data.description !== undefined && { synopsis: data.description }),
    ...(data.coverImageUrl !== undefined && { coverUrl: data.coverImageUrl }),

    // Filtra undefined e nulls de forma mais limpa
})).pipe(
    z.object({
        // Aplica o tipo 'Partial<Book>' final, mas garante que os valores transformados
        // sejam do tipo correto (string | number | undefined).
    }).catchall(z.any())
)
