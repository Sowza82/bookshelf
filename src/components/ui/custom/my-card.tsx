'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { MyCardPropsBook, STATUS_MAP_VISUAL } from '@/lib/book-mapping'
import { Eye, Loader2, Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

interface MyCardComponentProps {
  book: MyCardPropsBook
  onDeleteSuccess: (bookId: string) => Promise<void> // Prop do pai
}

const FALLBACK_COVER = '/placeholder-cover.png'

export default function MyCard({
  book,
  onDeleteSuccess,
}: MyCardComponentProps) {
  const [isPending, startTransition] = useTransition()
  const [isDeleting, setIsDeleting] = useState(false)

  const detailsPath = `/livro/${book.id}`
  const editPath = `/livro/editar/${book.id}`

  const year = book.publicationYear
    ? String(book.publicationYear)
    : 'Ano Desconhecido'
  const visualStatus =
    STATUS_MAP_VISUAL[book.readingStatus] || 'Status Desconhecido'
  const imageSource = book.coverUrl || FALLBACK_COVER

  const getStatusClasses = () => {
    switch (book.readingStatus) {
      case 'FINISHED':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
      case 'READING':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  const handleDelete = () => {
    if (!confirm(`Tem certeza que deseja deletar o livro "${book.title}"?`))
      return

    setIsDeleting(true)

    startTransition(async () => {
      try {
        await onDeleteSuccess(book.id) // Chama a função do pai
        toast.success(`Livro "${book.title}" deletado com sucesso.`)
      } catch (error) {
        console.error(error)
        toast.error(`Falha ao deletar "${book.title}".`)
      } finally {
        setIsDeleting(false)
      }
    })
  }

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
      <Link href={detailsPath} className="flex flex-col flex-grow">
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={imageSource}
            alt={`Capa do livro ${book.title}`}
            width={200}
            height={300}
            className="w-full h-full object-cover rounded-t-lg transition-opacity duration-500 hover:opacity-90"
          />
        </div>

        <CardHeader className="p-3 pb-2 flex-grow">
          <CardTitle className="text-base line-clamp-2" title={book.title}>
            {book.title}
          </CardTitle>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
            Autor: {book.author} • Publicado em {year}
          </p>
        </CardHeader>

        <CardContent className="p-3 pt-0 text-right">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getStatusClasses()}`}
          >
            {visualStatus}
          </span>
        </CardContent>
      </Link>

      <CardFooter className="p-3 flex justify-between space-x-2 border-t mt-auto">
        <Link href={detailsPath} passHref>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Eye className="w-4 h-4" />
          </Button>
        </Link>

        <Link href={editPath} passHref>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Pencil className="w-4 h-4" />
          </Button>
        </Link>

        <Button
          variant="destructive"
          size="icon"
          className="h-8 w-8"
          onClick={handleDelete}
          disabled={isDeleting || isPending}
        >
          {isDeleting || isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
