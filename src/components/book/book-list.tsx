'use client'

import { Button } from '@/components/ui/button'
import { Book } from '@/types/book'
import { Loader2, X } from 'lucide-react'
import { useState } from 'react'
import BookCard from './book-card'

// MOCK: Toast simples (substitua pelo useToast real do Shadcn/UI)
const useToast = () => ({
  toast: ({ title, description }: { title: string; description: string }) => {
    console.log(`[TOAST] ${title}: ${description}`)
  },
})

// 🔑 Props corretas incluindo os handlers
interface BookListProps {
  books: Book[]
  onEdit: (bookId: string) => void
  onView: (bookId: string) => void
}

export default function BookList({ books, onEdit, onView }: BookListProps) {
  const { toast } = useToast()

  const [bookToDelete, setBookToDelete] = useState<Book | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Handler para abrir modal de exclusão
  const handleDelete = (bookId: string) => {
    const book = books.find(b => b.id === bookId)
    if (book) setBookToDelete(book)
  }

  // Confirma exclusão
  const confirmDelete = async () => {
    if (!bookToDelete) return
    setIsDeleting(true)

    try {
      // Aqui você faria a chamada real da API
      await new Promise(resolve => setTimeout(resolve, 1500))

      toast({
        title: 'Livro removido',
        description: `O livro "${bookToDelete.title}" foi deletado com sucesso.`,
      })
      console.log(`Livro ${bookToDelete.id} deletado (simulado).`)
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Não foi possível deletar o livro.',
      })
    } finally {
      setIsDeleting(false)
      setBookToDelete(null)
    }
  }

  // Atualiza status de leitura
  const handleStatusChange = async (bookId: string, newStatus: boolean) => {
    const book = books.find(b => b.id === bookId)
    if (!book) return

    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      toast({
        title: 'Status atualizado',
        description: `O livro "${book.title}" agora está ${
          newStatus ? 'LIDO' : 'NÃO LIDO'
        }.`,
      })
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o status do livro.',
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
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-6 mt-2
        "
      >
        {books.map(book => (
          <BookCard
            key={book.id}
            book={book}
            onView={() => onView(book.id)}
            onEdit={() => onEdit(book.id)}
            onDelete={() => handleDelete(book.id)}
            onStatusChange={(newStatus: boolean) =>
              handleStatusChange(book.id, newStatus)
            }
          />
        ))}
      </div>

      {/* Modal de exclusão */}
      {bookToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-sm p-6 space-y-6 transform transition-all duration-300 scale-100">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400">
                Confirmar Exclusão
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setBookToDelete(null)}
                disabled={isDeleting}
              >
                <X className="w-5 h-5 text-gray-500" />
              </Button>
            </div>

            <p className="text-gray-700 dark:text-gray-300">
              Tem certeza que deseja deletar o livro
              <strong className="block mt-1 text-base">
                "{bookToDelete.title}"
              </strong>
              de forma permanente? Esta ação não pode ser desfeita.
            </p>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setBookToDelete(null)}
                disabled={isDeleting}
              >
                Cancelar
              </Button>
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
