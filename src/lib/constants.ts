// src/lib/constants.ts

/** Chave usada para armazenar a lista de livros no LocalStorage. */
export const LOCAL_STORAGE_BOOK_KEY = 'bookshelf_user_collection'

/** Lista de gêneros disponíveis para seleção e filtro. */
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


/** Tamanho padrão de ícones (16px = 4 no Tailwind) */
export const ICON_SIZE_SM = 16
