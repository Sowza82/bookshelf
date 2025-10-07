'use client'

// 🚨 CORREÇÃO 1: Importamos a interface 'Book' correta de @/types/book
import { Book } from '@/types/book'
// Removemos a importação de BookType do actions/book
import { getBookById } from '@/app/actions/book'

import BookForm from '@/components/book/book-form'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner' // Assumindo que você usa sonner

export default function EditBookPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  // 🚨 CORREÇÃO 2: Usamos a interface Book para o estado
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return
      setLoading(true)
      try {
        // getBookById foi tipado para retornar Promise<Book | null>
        const data = await getBookById(id)
        if (data) {
          setBook(data)
        } else {
          toast.error('Livro não encontrado.')
          router.push('/biblioteca')
        }
      } catch (error) {
        console.error('Erro ao buscar livro:', error)
        toast.error('Falha ao carregar dados do livro.')
      } finally {
        setLoading(false)
      }
    }
    fetchBook()
  }, [id, router])

  const handleSubmit = async (formData: FormData) => {
    // A lógica de atualização aqui depende de como você implementou updateBook.
    // Se updateBook usa o ID e o objeto de dados (como no seu actions/book.ts),
    // você precisará extrair os dados do FormData ou chamar uma função helper.

    // Simulação de chamada de atualização:
    // const success = await updateBookFromForm(id, formData);

    toast.info('Função de submissão não implementada totalmente.')
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        Carregando dados para edição...
      </div>
    )

  if (!book) return null // ou uma mensagem de erro

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Editar Livro: {book.title}</h1>

      {/* O BookForm precisará de um 'defaultValues' tipado como Book */}
      {/* O handleSubmit real aqui deve processar o formulário e chamar updateBook */}
      <BookForm initialData={book} onSubmit={handleSubmit} />
    </div>
  )
}
