'use client'

import { Button } from '@/components/ui/button'
import { Book } from '@/types/book'
import { Loader2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import BookCard from './book-card'

// MOCK: Assumindo que você tem o sistema de Toast do Shadcn/UI configurado
// Na vida real, você importaria 'useToast' de '@/components/ui/use-toast'
const useToast = () => ({
  toast: ({ title, description }: { title: string; description: string }) => {
    console.log(`[TOAST SUCESSO] ${title}: ${description}`)
    // Substitua este console.log pela chamada real do seu toast
  },
})

interface BookListProps {
  books: Book[]
}

export default function BookList({ books }: BookListProps) {
  const router = useRouter()
  const { toast } = useToast()

  // --- ESTADOS PARA O MODAL ---
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // 1. Handler para Visualizar os Detalhes do Livro
  const handleView = (bookId: string) => {
    router.push(`/livro/${bookId}`)
  }

  // 2. Handler para Editar o Livro
  const handleEdit = (bookId: string) => {
    router.push(`/livro/editar/${bookId}`)
  }

  // 3. Handler para ABRIR O MODAL
  const handleDelete = (bookId: string) => {
    const book = books.find(b => b.id === bookId)
    if (book) {
      setBookToDelete(book)
    }
  }

  // 4. LÓGICA REAL DE DELEÇÃO (Chamada quando o utilizador confirma no modal)
  const confirmDelete = async () => {
    if (!bookToDelete) return

    setIsDeleting(true)
    const bookId = bookToDelete.id

    try {
      // ⚠️ SIMULAÇÃO DA CHAMADA DE API (Substitua por seu fetch real)
      await new Promise(resolve => setTimeout(resolve, 1500))
      // const response = await fetch(`/api/books/${bookId}`, { method: 'DELETE' });
      // if (!response.ok) throw new Error('Falha na exclusão do livro.');

      // 5. Feedback de Sucesso (TOAST)
      toast({
        title: 'Sucesso na Exclusão!',
        description: `O livro "${bookToDelete.title}" foi removido com sucesso.`,
      })

      // 6. Atualiza a lista de livros após a exclusão (simulado)
      // router.refresh(); // No Next.js 13/14, você usaria isso para revalidar dados
      console.log(`Livro ID ${bookId} deletado com sucesso (simulado).`)
    } catch (error) {
      console.error('Erro ao deletar livro:', error)
      toast({
        title: 'Erro de Exclusão',
        description: 'Não foi possível remover o livro. Tente novamente.',
      })
    } finally {
      setIsDeleting(false)
      setBookToDelete(null) // Fecha o modal
    }
  }

  // NOVO: LÓGICA PARA ATUALIZAR STATUS DE LEITURA
  const handleStatusChange = async (bookId: string, newStatus: boolean) => {
    const book = books.find(b => b.id === bookId)
    if (!book) return

    try {
      // ⚠️ SIMULAÇÃO DA CHAMADA DE API (Substitua por seu fetch real)
      // O livro original (no array `books`) não será atualizado aqui,
      // mas no seu projeto real, você chamaria `router.refresh()` após o sucesso.
      await new Promise(resolve => setTimeout(resolve, 500))
      // const response = await fetch(`/api/books/${bookId}`, {
      //    method: 'PATCH',
      //    body: JSON.stringify({ isRead: newStatus })
      // });
      // if (!response.ok) throw new Error('Falha ao atualizar status.');

      toast({
        title: 'Status Atualizado!',
        description: `O livro "${book.title}" agora está marcado como ${
          newStatus ? 'LIDO' : 'NÃO LIDO'
        }.`,
      })

      console.log(
        `Status do livro ID ${bookId} alterado para ${
          newStatus ? 'Lido' : 'A Ler'
        } (simulado).`
      )
      // router.refresh(); // Atualiza a lista após sucesso
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      toast({
        title: 'Erro de Status',
        description: 'Não foi possível atualizar o status de leitura.',
      })
    }
  }

  if (!books || books.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        Nenhum livro encontrado.
      </div>
    )
  }

  return (
    <>
      {/* Container Principal do Grid */}
      <div
        className="
            grid
            grid-cols-2          /* Mobile (padrão): 2 Colunas */
            sm:grid-cols-3       /* Small (Tablets): 3 Colunas */
            lg:grid-cols-4       /* Large (Laptops): 4 Colunas */
            xl:grid-cols-5       /* Extra Grande: 5 Colunas */
            gap-6 mt-2
        "
      >
        {books.map(book => (
          <BookCard
            key={book.id}
            book={book}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange} // NOVO: Passa o handler de status
          />
        ))}
      </div>

      {/* --- MODAL DE CONFIRMAÇÃO DE DELEÇÃO --- */}
      {bookToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-sm p-6 space-y-6 transform transition-all duration-300 scale-100">
            {/* Header do Modal */}
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400">
                Confirmar Exclusão
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setBookToDelete(null)} // Fecha o modal
                disabled={isDeleting}
              >
                <X className="w-5 h-5 text-gray-500" />
              </Button>
            </div>

            {/* Conteúdo do Modal */}
            <p className="text-gray-700 dark:text-gray-300">
              Tem certeza que deseja deletar o livro
              <strong className="block mt-1 text-base">
                "{bookToDelete.title}"
              </strong>
              de forma permanente? Esta ação não pode ser desfeita.
            </p>

            {/* Ações do Modal */}
            <div className="flex justify-end space-x-3">
              {/* Botão CANCELAR (Volta para a biblioteca) */}
              <Button
                variant="outline"
                onClick={() => setBookToDelete(null)}
                disabled={isDeleting}
              >
                Cancelar
              </Button>

              {/* Botão CONFIRMAR DELEÇÃO (Aciona o processo de exclusão) */}
              <Button
                variant="destructive"
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  'Deletar'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
