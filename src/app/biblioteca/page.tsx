// src/app/biblioteca/page.tsx
'use client'

import BookCard from '@/components/book/book-card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useBooks } from '@/hooks/useBooks' // Corrigido: useBooks com "s"
import { BookOpenCheck, ChevronLeft, Plus, Search, Tag } from 'lucide-react'
import Link from 'next/link'

export default function LibraryPage() {
  // Hook correto
  const { books } = useBooks()

  // Lista de gêneros disponíveis para filtro
  const genres = [
    'Todos os gêneros',
    'Ficção',
    'Fantasia',
    'Distopia',
    'Romance',
    'Clássico',
    'Não-Ficção',
    'Outro',
  ]

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* 1. Header da Página */}
        <header className="space-y-6">
          <Link href="/" passHref>
            <div className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Voltar ao Dashboard
            </div>
          </Link>

          <div className="flex justify-between items-center pb-4">
            <h1 className="text-2xl font-bold flex items-center text-foreground">
              <BookOpenCheck className="w-6 h-6 mr-3 text-primary" />
              Biblioteca Pessoal
            </h1>

            {/* Botão para adicionar novo livro */}
            <Link href="/livro/novo" passHref>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Livro
              </Button>
            </Link>
          </div>
        </header>

        {/* 2. Barra de pesquisa e filtro por gênero */}
        <div className="mt-8 mb-10 p-4 bg-card rounded-xl shadow-md border">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Campo de busca */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por título ou autor..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-background text-foreground"
              />
            </div>

            {/* Seletor de gênero */}
            <Select defaultValue="Todos os gêneros">
              <SelectTrigger className="w-full md:w-[200px] flex items-center">
                <Tag className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Todos os gêneros" />
              </SelectTrigger>
              <SelectContent>
                {genres.map(genre => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 3. Grid de livros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {/* Mensagem quando a biblioteca estiver vazia */}
        {books.length === 0 && (
          <p className="text-center text-xl text-muted-foreground mt-12">
            Sua biblioteca está vazia. Adicione seu primeiro livro!
          </p>
        )}
      </div>
    </div>
  )
}
