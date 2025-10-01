// src/lib/validation.ts
import { z } from 'zod'
import { AVAILABLE_GENRES } from './constants'

export const BOOK_SCHEMA = z.object({
  // ID é opcional na criação, mas pode vir na edição
  id: z.string().optional(),

  // Título e autor: mínimo de 3 caracteres
  title: z.string().min(3, "O título é obrigatório e precisa de no mínimo 3 caracteres."),
  author: z.string().min(3, "O nome do autor é obrigatório."),

  // O ano deve ser um número inteiro positivo
  year: z.number().int().positive("O ano deve ser um número inteiro e positivo."),

  // O rating (avaliação) deve ser um número entre 0 e 5
  rating: z.number().min(0, "O rating mínimo é 0.").max(5, "O rating máximo é 5."),

  // O gênero deve ser um dos valores definidos na lista
  genre: z.enum(AVAILABLE_GENRES as [string, ...string[]], {
      required_error: "Selecione um gênero válido.",
  }),

  // O status deve ser um dos três valores aceitos
  status: z.enum(["lendo", "lido", "quero-ler"]),

  // Descrição e capa são opcionais
  description: z.string().optional().default(''),

  // coverImageUrl aceita URL válida ou string vazia
  coverImageUrl: z.string().url("A URL da capa deve ser um formato válido.").optional().or(z.literal('')),
})
