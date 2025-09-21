import BookDetails from '@/components/book/book-details'
import { useBook } from '@/hooks/useBooks'

interface BookPageProps {
  params: { id: string }
}

export default function BookPage({ params }: BookPageProps) {
  const { books } = useBook()
  const book = books.find(b => b.id === params.id)

  if (!book) return <p className="text-center mt-6">Livro não encontrado</p>

  return <BookDetails book={book} />
}
