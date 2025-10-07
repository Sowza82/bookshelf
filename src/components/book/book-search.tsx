'use client'
import { Card } from '@/components/ui/card' // Importando o Card
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react' // Ícone de busca
import { useEffect, useState } from 'react'

interface BookSearchProps {
  genres?: string[]
  onSearch: (query: string, genre: string) => void
  initialQuery?: string // Adicionado para carregar o estado inicial do componente pai
  initialGenre?: string // Adicionado para carregar o estado inicial do componente pai
}

export default function BookSearch({
  genres = ['Todos os gêneros'],
  onSearch,
  initialQuery = '',
  initialGenre,
}: BookSearchProps) {
  // Inicializa o estado com base nas props iniciais
  const [query, setQuery] = useState(initialQuery)
  const [selectedGenre, setSelectedGenre] = useState(initialGenre || genres[0])

  // Lógica de Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query, selectedGenre)
    }, 300)
    return () => clearTimeout(handler)
  }, [query, selectedGenre, onSearch])

  return (
    // 1. Envolvido em um Card para o layout da barra de pesquisa
    <Card className="p-4 shadow-sm bg-card transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
        {/* 2. Campo de Busca: Ocupa a largura máxima */}
        <div className="relative flex-grow w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Pesquisar por título ou autor..."
            // Ajuste para adicionar padding à esquerda por causa do ícone
            className="pl-10 pr-4 h-10 w-full transition-colors duration-300 placeholder:text-muted-foreground"
          />
        </div>

        {/* 3. Filtro de Gênero: Largura fixa para alinhamento (180px ou mais) */}
        <Select
          value={selectedGenre}
          onValueChange={value => setSelectedGenre(value)}
        >
          <SelectTrigger className="w-full sm:w-[200px] h-10">
            {' '}
            {/* Largura ligeiramente maior para o texto */}
            <SelectValue placeholder="Selecionar gênero" />
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
    </Card>
  )
}
