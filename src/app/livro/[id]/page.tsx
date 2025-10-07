'use client'

import LoadingSpinner from '@/components/loading/loading-spinner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useBooks } from '@/hooks/useBooks'
import { ArrowLeft, BookOpen, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// ✅ CORREÇÃO: Alinhando o tipo com os campos do Prisma/API
interface Book {
  id: string
  title: string
  author?: string
  coverUrl?: string // O campo que a API deve retornar
  synopsis?: string
  genre?: string
  readingStatus?: string // O campo do banco: 'LIDO', 'A_LER', etc.
  totalPages?: number // O campo do banco
  publicationYear?: number
  currentPage?: number // O campo do banco: current_page (agora currentPage)
  rating?: number
}

const FALLBACK_COVER = '/images/default-cover.png'

export default function BookDetailPage() {
  const { books: clientBooks } = useBooks()
  const params = useParams<{ id: string }>()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [book, setBook] = useState<Book | null>(null)

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true)
      const bookId = params.id
      let foundBook: Book | undefined = undefined

      // 1️⃣ Prioriza a busca no cache/client (mais rápido)
      foundBook = clientBooks.find((b: Book) => b.id === bookId)

      // 2️⃣ Se não encontrar ou o clientBooks não estiver totalmente carregado, busca no server
      if (!foundBook) {
        try {
          const res = await fetch(`/api/books/${bookId}`)
          if (res.ok) {
            foundBook = (await res.json()) as Book
          } else if (res.status === 404) {
            // Se o server retornar 404, não há livro
            foundBook = undefined
          }
        } catch (err) {
          console.error('Erro ao buscar livro no servidor:', err)
        }
      }

      setBook(foundBook || null)
      setLoading(false)
    }

    fetchBook()
  }, [clientBooks, params.id])

  // Função auxiliar para renderizar estrelas
  const renderStars = (rating: number) => {
    const filledStars = Math.round(rating || 0)
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < filledStars
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ))
  }

  if (loading) return <LoadingSpinner message="Carregando livro..." />

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500">Livro não encontrado.</p>
        <Button className="mt-4" onClick={() => router.push('/biblioteca')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar à Biblioteca
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-background text-foreground">
      <div className="max-w-3xl mx-auto">
        <header className="flex justify-between items-center mb-6 border-b pb-3">
          <h1 className="text-2xl font-bold flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-primary" />
            {book.title}
          </h1>
          <Link href="/biblioteca">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </header>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Informações Detalhadas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Capa */}
              <div className="w-full md:w-40 h-60 bg-gray-100 border rounded overflow-hidden flex-shrink-0 relative mx-auto md:mx-0">
                <Image
                  src={book.coverUrl || FALLBACK_COVER} // Prioriza coverUrl
                  alt={book.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </div>

              {/* Infos Principais */}
              <div className="flex-1 space-y-3 text-lg">
                <p>
                  <strong className="font-semibold text-primary">Autor:</strong>{' '}
                  {book.author || '—'}
                </p>
                <p>
                  <strong className="font-semibold text-primary">
                    Ano de Publicação:
                  </strong>{' '}
                  {book.publicationYear || '—'}
                </p>
                <p>
                  <strong className="font-semibold text-primary">
                    Gênero:
                  </strong>{' '}
                  {book.genre || '—'}
                </p>
                <p>
                  <strong className="font-semibold text-primary">
                    Status de Leitura:
                  </strong>{' '}
                  {book.readingStatus || '—'}
                </p>

                {/* Status e Avaliação */}
                {book.totalPages && book.totalPages > 0 && (
                  <p>
                    <strong className="font-semibold text-primary">
                      Progresso:
                    </strong>{' '}
                    {book.currentPage || 0} de {book.totalPages} páginas
                  </p>
                )}
                {book.rating !== undefined && book.rating !== null && (
                  <div className="flex items-center space-x-2">
                    <strong className="font-semibold text-primary">
                      Avaliação:
                    </strong>
                    <div className="flex">{renderStars(book.rating)}</div>
                    <span>({book.rating.toFixed(1)}/5)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Sinopse */}
            {book.synopsis && (
              <div className="mt-4 border-t pt-4">
                <h2 className="font-semibold mb-2 text-xl">Sinopse</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {book.synopsis}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
