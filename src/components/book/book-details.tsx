// src/components/book/book-details.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Book } from '@/types/book'
import { BookOpen, Calendar, Edit, Tag, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface BookDetailsProps {
  book: Book
}

export default function BookDetails({ book }: BookDetailsProps) {
  const imageUrl =
    book.coverImageUrl || 'https://via.placeholder.com/400x600?text=Sem+Capa'

  // Função auxiliar para renderizar estrelas
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={index < rating ? 'text-yellow-500' : 'text-gray-300'}
          >
            ★
          </span>
        ))}
        <span className="ml-2 text-lg font-semibold">{rating} / 5</span>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-8">
      {/* Botão de Navegação e Edição */}
      <div className="flex justify-between items-center border-b pb-4">
        <Link href="/biblioteca">
          <Button variant="outline">← Voltar para a Biblioteca</Button>
        </Link>
        <Link href={`/livro/editar/${book.id}`} passHref>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Editar Livro
          </Button>
        </Link>
      </div>

      {/* Conteúdo Principal (Capa + Detalhes) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Coluna 1: Capa do Livro */}
        <div className="lg:col-span-1 flex justify-center shadow-2xl rounded-lg overflow-hidden">
          <div
            className="relative w-full max-w-sm"
            style={{ aspectRatio: '3/4' }}
          >
            <Image
              src={imageUrl}
              alt={`Capa de ${book.title}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              priority
            />
          </div>
        </div>

        {/* Coluna 2 e 3: Informações e Detalhes */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-4xl font-extrabold text-primary">{book.title}</h1>
          <h2 className="text-2xl font-semibold text-muted-foreground">
            {book.author}
          </h2>

          {/* Status e Avaliação */}
          <Card className="shadow-sm">
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Status de Leitura
                </span>
                <div className="text-lg font-bold flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-primary" />
                  {book.read ? 'Lido' : 'Para Ler'}
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Sua Avaliação
                </span>
                {renderRating(book.rating)}
              </div>
            </CardContent>
          </Card>

          {/* Informações Adicionais */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Dados do Livro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="flex items-center text-gray-700 dark:text-gray-300">
                <User className="w-4 h-4 mr-3 text-primary" />
                **Autor(a):** {book.author}
              </p>
              <p className="flex items-center text-gray-700 dark:text-gray-300">
                <Calendar className="w-4 h-4 mr-3 text-primary" />
                **Ano de Publicação:** {book.publicationYear}
              </p>
              <p className="flex items-center text-gray-700 dark:text-gray-300">
                <Tag className="w-4 h-4 mr-3 text-primary" />
                **Gênero:** {book.genre}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
