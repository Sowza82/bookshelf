// src/app/api/categories/route.ts
import { AVAILABLE_GENRES } from '@/lib/constants'
import { NextResponse } from 'next/server'

// GET /api/categories
export async function GET() {
  try {
    // Aqui podemos incluir "Todos os gêneros" como default
    const genres = ['Todos os gêneros', ...AVAILABLE_GENRES]

    return NextResponse.json(genres, { status: 200 })
  } catch (err) { // 💡 Renomeado 'error' para 'err' para evitar o warning de variável não usada
    console.error('Erro ao buscar categorias:', err)
    return NextResponse.json({ message: 'Falha ao buscar categorias' }, { status: 500 })
  }
}
