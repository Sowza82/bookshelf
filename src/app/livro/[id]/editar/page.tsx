'use client'

import BookForm from '@/components/book/book-form'
import { BookType, updateBook } from '@/app/actions/book' // ⚠️ IMPORTANTE: Server Action de Update
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner'

// ⚠️ MOCK: Você deve buscar o livro do seu estado global ou diretamente do banco de dados.
// Como não temos a hook 'useBooks', vamos simular uma busca.
const MOCK_BOOKS: BookType[] = [
    { id: '1', title: 'A Roda do Tempo', author: 'Robert Jordan', readingStatus: 'lendo', rating: 4, totalPages: 800, currentPage: 150, coverUrl: null, genre: 'Fantasia', synopsis: 'Mock Sinopse 1', isbn: null, notes: null, userId: 'user_id_simulado_123' },
    { id: '2', title: 'O Monge e o Executivo', author: 'James C. Hunter', readingStatus: 'lido', rating: 5, totalPages: 180, currentPage: 180, coverUrl: null, genre: 'Negócios', synopsis: 'Mock Sinopse 2', isbn: null, notes: null, userId: 'user_id_simulado_123' },
];

// --- COMPONENTE PRINCIPAL ---

export default function EditBookPage() {
  const router = useRouter()
  // Captura o ID da URL, que deve ser uma string (do nome da pasta: [id])
  const params = useParams<{ id: string }>()

  const [book, setBook] = useState<(BookType & { id: string }) | null>(null)
  const [loading, setLoading] = useState(true)
  const bookId = params.id

  // --- Efeito de Carregamento e Busca do Livro ---
  useEffect(() => {
    if (!bookId) {
        setLoading(false);
        return;
    }

    // 💡 Substitua esta linha pela sua lógica REAL de busca de livro
    // Ex: const found = books.find(b => b.id === bookId)
    const found = MOCK_BOOKS.find(b => b.id === bookId) as (BookType & { id: string }) | undefined

    if (found) {
        setBook(found)
    } else {
        // Livro não encontrado (404)
        toast.error('Livro não encontrado. Redirecionando...', { duration: 2000 })
        setTimeout(() => router.push('/biblioteca'), 500)
    }
    setLoading(false)
  }, [bookId, router]) // Dependências: bookId e router

  // --- Handler de Persistência (Conecta com a Server Action) ---
  const handleSave = async (updatedBookData: BookType) => {
    if (!bookId) {
        toast.error('ID do livro não encontrado para salvar.', { duration: 2000 });
        return;
    }

    try {
        // 💡 CONEXÃO REAL: Chama a Server Action de atualização
        const result = await updateBook(bookId, updatedBookData);

        if (result) {
            // O toast de sucesso já é disparado no BookForm
            // Redireciona para a página de visualização do livro
            router.push(`/livro/${bookId}`)
        } else {
            // O erro já é capturado e exibido no BookForm, mas mantemos o console
            console.error("Falha na Server Action de updateBook. Verifique o console do servidor.");
        }

    } catch (error) {
        console.error('Falha ao salvar livro (erro de rede/cliente):', error)
        toast.error('Ocorreu um erro ao tentar salvar as alterações.')
    }
  }

  // --- Handler de Cancelamento ---
  const handleCancel = () => {
    // Retorna para a página de visualização do livro ou para a biblioteca
    if (bookId) {
        router.push(`/livro/${bookId}`)
    } else {
        router.back()
    }
  }

  // --- Exibição de Estados ---
  if (loading || !book)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-blue-600 dark:text-blue-400">
        Carregando informações do livro...
      </div>
    )

  return (
    <>
      <BookForm
        initialData={book} // 🔑 ENVIA OS DADOS DO LIVRO PARA PREENCHER O FORM
        onSave={handleSave} // 🔑 LIGA A FUNÇÃO DE SALVAMENTO DESTA PÁGINA
        onCancel={handleCancel}
      />
      {/* O Toaster geralmente fica no Layout, mas funciona aqui também */}
      <Toaster richColors position="bottom-right" />
    </>
  )
}
