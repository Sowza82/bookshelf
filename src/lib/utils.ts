// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combina classes do Tailwind e resolve conflitos automaticamente.
 * * @param inputs Classes a serem combinadas.
 * @returns Uma string de classes CSS limpa.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
