'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface GenreFilterProps {
  initialGenre?: string
  onChange: (value: string) => void
}

const genres = [
  'Todos os gêneros',
  'Ficção',
  'Fantasia',
  'Romance',
  'Thriller',
  'Ficção Científica',
  'História',
  'Biografia',
  'Autoajuda',
  'Tecnologia',
  'Clássico',
  'Distopia',
  'Não-Ficção',
  // Adicione os gêneros que faltavam da lista completa
  'Poesia',
  'Aventura',
  'Mistério',
  'Infantil',
  'Jovem Adulto',
  'Horror',
]

export default function GenreFilter({
  initialGenre = 'Todos os gêneros',
  onChange,
}: GenreFilterProps) {
  return (
    <Select value={initialGenre} onValueChange={onChange}>
      {/* CORREÇÃO AQUI: Usando bg-input e text-foreground padrão do Shadcn/UI */}
      <SelectTrigger className="w-[180px] h-10 bg-input text-foreground">
        <SelectValue placeholder="Filtrar por Gênero" />
      </SelectTrigger>

      {/* CORREÇÃO AQUI: Usando bg-popover e text-popover-foreground padrão do Shadcn/UI */}
      <SelectContent className="bg-popover text-popover-foreground">
        {genres.map(genre => (
          <SelectItem key={genre} value={genre}>
            {genre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
