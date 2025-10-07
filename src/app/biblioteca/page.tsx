'use client'

import { getBooks } from '@/app/actions/book'
import BookList from '@/components/book/book-list'
import { Book } from '@/types/book'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner'
// IMPORTAR useRouter, se for usá-lo para navegação, por exemplo:
// import { useRouter } from 'next/navigation'

export default function BibliotecaPage() {
  const searchParams = useSearchParams()
  // const router = useRouter() // Exemplo de uso
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true) // 1. DEFINIÇÃO DAS FUNÇÕES DE CALLBACK

  const handleView = (bookId: string) => {
    // Lógica para navegar ou abrir um modal de visualização
    console.log(`Visualizar livro: ${bookId}`) // router.push(`/biblioteca/${bookId}`)
  }

  const handleEdit = (bookId: string) => {
    // Lógica para navegar para a página de edição
    console.log(`Editar livro: ${bookId}`) // router.push(`/biblioteca/editar/${bookId}`)
  }

  const fetchBooks = async () => {
    setLoading(true)
    try {
      const query = searchParams.get('q') || undefined
      const genre = searchParams.get('genre') || undefined
      const data = await getBooks({ q: query, genre })
      setBooks(data)
    } catch (error) {
      console.error('Erro ao buscar livros:', error)
      toast.error('Falha ao carregar a biblioteca.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [searchParams])

  const handleClearFilters = () => {
    setBooks([])
    toast.info('Filtros limpos. Recarregue a página para ver todos os livros.')
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-blue-600 dark:text-blue-400">
                Carregando biblioteca...      {' '}
      </div>
    )

  return (
    <div className="px-4 py-6">
           {' '}
      {books.length > 0 ? (
        // 2. PASSAGEM DOS HANDLERS COMO PROPS
        <BookList books={books} onEdit={handleEdit} onView={handleView} />
      ) : (
        <div className="text-center py-10 bg-muted/50 rounded-lg mt-6">
                   {' '}
          <p className="text-lg font-medium text-muted-foreground">
                        Nenhum livro encontrado          {' '}
          </p>
                 {' '}
        </div>
      )}
           {' '}
      {books.length > 0 && (
        <button
          type="button"
          onClick={handleClearFilters}
          className="mt-4 text-primary hover:underline text-sm"
        >
                    Limpar filtros        {' '}
        </button>
      )}
            <Toaster richColors position="bottom-right" />   {' '}
    </div>
  )
}
