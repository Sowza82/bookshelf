import { AVAILABLE_GENRES } from '@/lib/constants'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(['Todos os gêneros', ...AVAILABLE_GENRES])
}
