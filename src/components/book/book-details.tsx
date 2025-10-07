'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// 💡 Assumindo que Book é seu tipo de dados
import { Book } from '@/types/book'
import { BookOpen, Calendar, Edit, Tag, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import BookRating from './book-rating'

interface BookDetailsProps {
  book: Book & { description?: string } // Assumindo que o tipo Book pode ter 'description'
}

// Mapeamento de status para cores/rótulos visuais
const statusMap = {
  LIDO: {
    label: 'Lido',
    className:
      'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
  },
  LENDO: {
    label: 'Lendo Atualmente',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
  },
  NAO_LIDO: {
    label: 'Para Ler',
    className: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  },
  DEFAULT: {
    label: 'Status Desconhecido',
    className:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
  },
}

export default function BookDetails({ book }: BookDetailsProps) {
  const imageUrl =
    book.cover || 'https://via.placeholder.com/400x600?text=Sem+Capa'

  const currentStatus =
    statusMap[book.status as keyof typeof statusMap] || statusMap.DEFAULT
  const yearText = book.publicationYear || 'Não Informado'
  const genreText = book.genre || 'Gênero Não Classificado'
  const descriptionText =
    book.description || 'Nenhuma sinopse disponível para este livro.'

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-8">
      {/* Botão de Navegação e Edição (Sempre no topo e responsivo) */}
      <div className="flex justify-between items-center border-b pb-4 border-border">
        <Link href="/biblioteca">
          <Button variant="outline">← Voltar para a Biblioteca</Button>
        </Link>
        <Link href={`/livro/editar/${book.id}`}>
          <Button className="bg-primary hover:bg-primary/90">
            <Edit className="w-4 h-4 mr-2" />
            Editar Livro
          </Button>
        </Link>
      </div>

      {/* Conteúdo Principal: Mobile (1 coluna) / Desktop (3 colunas) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
       
        {/* Capa (Mobile Centralizado) */}
        <div className="lg:col-span-1 flex justify-center">
          <div
            className="relative w-full max-w-sm rounded-lg overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700"
            style={{ aspectRatio: '3/4' }}
          >
            <Image
              src={imageUrl}
              alt={`Capa de ${book.title}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 80vw, 33vw" // Melhor para performance
            />
          </div>
        </div>

        {/* Detalhes e Informações */}
        <div className="lg:col-span-2 space-y-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight mb-2">
            {book.title}
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-muted-foreground">
            Por {book.author}
          </h2>

          {/* Status e Avaliação (Card 1) */}
          <Card className="shadow-md">
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status */}
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Status de Leitura
                </span>
                <div className="text-lg font-bold flex items-center">
                  <BookOpen className="w-5 h-5 mr-3 text-primary" />
                  {/* Badge de Status Dinâmico */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${currentStatus.className}`}
                  >
                    {currentStatus.label}
                  </span>
                </div>
              </div>

              {/* Avaliação */}
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Sua Avaliação
                </span>
                <BookRating rating={book.rating || 0} />
              </div>
            </CardContent>
          </Card>

          {/* Dados e Sinopse (Card 2) */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Informações Detalhadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Informações Básicas (flex-wrap para responsividade) */}
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
                <p className="flex items-center">
                  <User className="w-4 h-4 mr-3 text-primary" />
                  <span className="font-medium">Autor(a):</span> {book.author}
                </p>
                <p className="flex items-center">
                  <Calendar className="w-4 h-4 mr-3 text-primary" />
                  <span className="font-medium">Publicação:</span> {yearText}
                </p>
                <p className="flex items-center">
                  <Tag className="w-4 h-4 mr-3 text-primary" />
                  <span className="font-medium">Gênero:</span> {genreText}
                </p>
              </div>

              {/* Sinopse/Descrição (Melhor espaçamento) */}
              <div className="pt-4 border-t border-border">
                <h3 className="text-lg font-semibold mb-3">Sinopse</h3>
                <p className="text-base text-muted-foreground whitespace-pre-line leading-relaxed">
                  {descriptionText}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
