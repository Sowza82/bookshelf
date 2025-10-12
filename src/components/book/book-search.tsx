'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

interface BookSearchProps {
  genres?: string[]
  onSearch: (query: string, genre: string) => void
  initialQuery?: string
  initialGenre?: string
}

export default function BookSearch({
  genres = ['Todos os gêneros'],
  onSearch,
  initialQuery = '',
  initialGenre,
}: BookSearchProps) {
  const [query, setQuery] = useState(initialQuery)
  const [selectedGenre, setSelectedGenre] = useState(initialGenre || genres[0])

  useEffect(() => {
    const handler = setTimeout(() => onSearch(query, selectedGenre), 300)
    return () => clearTimeout(handler)
  }, [query, selectedGenre, onSearch])

  return (
    <Card className="p-4 shadow-sm bg-card transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Pesquisar por título ou autor..."
            className="pl-10 pr-4 h-10 w-full"
          />
        </div>
        <Select
          value={selectedGenre}
          onValueChange={value => setSelectedGenre(value)}
        >
          <SelectTrigger className="w-full sm:w-[200px] h-10">
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
