// src/lib/constants.ts

/**
 * Lista de gêneros disponíveis para seleção e filtro.
 * * Usado na API /api/categories e no schema de validação Zod.
 */
export const AVAILABLE_GENRES = [
  'Romance',
  'Ficção Científica',
  'Fantasia',
  'Distopia',
  'Suspense',
  'Thriller',
  'Aventura',
  'Mistério',
  'Terror',
  'Clássico',
  'Tecnologia',
  'Gastronomia',
  'Biografia',
  'Não-Ficção',
  'Autoajuda',
  'Ficção Absurda',
  'Romance Clássico',
  'Outro',
] as const;

/**
 * Tipagem auxiliar para garantir que os gêneros usados no frontend e na API correspondam.
 */
export type Genre = typeof AVAILABLE_GENRES[number];


/** Tamanho padrão de ícones (16px = 4 no Tailwind) */
export const ICON_SIZE_SM = 16;
