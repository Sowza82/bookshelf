import { z } from 'zod'
import { AVAILABLE_GENRES } from './constants'

// Tipagem base que o frontend usará para o formulário
const BookFormSchema = z.object({
  // ID é opcional na criação, mas pode vir na edição
  id: z.string().optional(),

  // Título e autor: mínimo de 3 caracteres, trim para remover espaços extras
  title: z.string().trim().min(3, "O título é obrigatório e precisa de no mínimo 3 caracteres."),
  author: z.string().trim().min(3, "O nome do autor é obrigatório."),

  // ✅ CORRIGIDO: O nome usado no Front-end é 'year'
  year: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().int().positive("O ano deve ser um número inteiro e positivo.")
  ),

  rating: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().min(0, "O rating mínimo é 0.").max(5, "O rating máximo é 5.")
  ),

  // Gênero válido conforme lista
  genre: z.enum(AVAILABLE_GENRES as [string, ...string[]], {
      required_error: "Selecione um gênero válido.",
  }),

  // ✅ CORRIGIDO: O nome usado no Front-end é 'status'
  status: z.enum(["lendo", "lido", "quero-ler"]),

  // ✅ CORRIGIDO: O nome usado no Front-end é 'description'
  description: z.string().optional().default(''),

  // ✅ CORRIGIDO: O nome usado no Front-end é 'coverImageUrl'
  coverImageUrl: z.string().optional().refine(
    val => !val || /^https?:\/\/.+/.test(val),
    "A URL da capa deve ser um formato válido."
  ),

  // Adicione páginas, se o seu formulário as usar:
  totalPages: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().int().min(1, "O número de páginas deve ser positivo.").optional()
  ),
  currentPage: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().int().min(0, "A página atual deve ser zero ou mais.").optional()
  ),
})

/**
 * 🔹 BOOK_SCHEMA: Schema que o frontend envia, transformado para o formato Prisma.
 */
export const BOOK_SCHEMA = BookFormSchema.transform(data => ({
    // Campos que não mudam
    id: data.id,
    title: data.title,
    author: data.author,
    genre: data.genre,
    rating: data.rating,
    totalPages: data.totalPages,
    currentPage: data.currentPage,

    // ✅ TRANSFORMAÇÕES para os nomes do Prisma
    publicationYear: data.year,
    readingStatus: data.status,
    synopsis: data.description,
    coverUrl: data.coverImageUrl,

    // Campos adicionais que o Prisma pode esperar (se houver)
    // Exemplo: createdAt: new Date()
}))

// 🔹 Versão para criação: requer todos os campos obrigatórios
// Para a criação, usamos o tipo de entrada do formulário, mas tornamos o ID opcional.
export const BOOK_CREATE_SCHEMA = BOOK_SCHEMA

// 🔹 Versão para atualização: todos os campos são opcionais, mas a saída ainda é no formato Prisma
export const BOOK_UPDATE_SCHEMA = BookFormSchema.partial().transform(data => ({
    // Campos que não mudam
    id: data.id,
    title: data.title,
    author: data.author,
    genre: data.genre,
    rating: data.rating,
    totalPages: data.totalPages,
    currentPage: data.currentPage,

    // ✅ TRANSFORMAÇÕES para os nomes do Prisma
    ...(data.year !== undefined && { publicationYear: data.year }),
    ...(data.status !== undefined && { readingStatus: data.status }),
    ...(data.description !== undefined && { synopsis: data.description }),
    ...(data.coverImageUrl !== undefined && { coverUrl: data.coverImageUrl }),

    // Campos que o prisma espera no update, mas o formulário não envia
}))
