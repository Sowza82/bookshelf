import { AVAILABLE_GENRES } from "@/lib/constants";
import { NextResponse } from "next/server";

// GET /api/categories → retorna todos os gêneros
export async function GET(): Promise<NextResponse> {
  try {
    const genres = ["Todos os gêneros", ...AVAILABLE_GENRES];
    return NextResponse.json(genres, { status: 200 });
  } catch (err) {
    console.error("[GET /api/categories] Falha ao buscar categorias:", err);
    return NextResponse.json({ message: "Erro interno ao buscar categorias" }, { status: 500 });
  }
}
