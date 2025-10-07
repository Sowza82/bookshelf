'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

interface SearchInputProps {
  initialQuery?: string
  onChange: (query: string) => void
}

export default function SearchInput({
  initialQuery = '',
  onChange,
}: SearchInputProps) {
  // Estado interno para gerenciar a entrada de texto instantânea
  const [query, setQuery] = useState(initialQuery)

  // 🔹 Lógica de Debounce
  useEffect(() => {
    // Impede o disparo inicial se o valor for o mesmo do estado inicial
    // Se você usa o Next.js router para carregar o estado inicial,
    // esta checagem impede um fetch desnecessário na montagem.
    if (query === initialQuery) return

    // Define um timeout de 300ms para esperar que o usuário termine de digitar
    const handler = setTimeout(() => {
      // Chama a função do componente pai (SearchSection) apenas após o delay
      onChange(query)
    }, 300)

    // Função de limpeza (cleanup):
    // Se o usuário digitar novamente antes dos 300ms, o timeout anterior é cancelado.
    return () => clearTimeout(handler)
  }, [query, onChange, initialQuery])

  return (
    <div className="relative w-full">
      {/* Ícone de Busca para clareza visual */}
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />

      {/* Input de Texto */}
      <Input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Pesquisar por título ou autor..."
        // Adiciona padding à esquerda (pl-10) para acomodar o ícone
        className="pl-10 pr-4 h-10 w-full transition-colors duration-300 placeholder:text-muted-foreground"
      />
    </div>
  )
}
