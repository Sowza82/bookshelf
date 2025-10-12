// app/biblioteca/page.tsx
import { deleteBook, getBooks } from '@/app/actions/book'
import LibraryClient from './library-client'

export default async function LibraryPage() {
  const books = await getBooks() // Server-side

  return (
    <div className="container mx-auto px-4 py-8">
      <LibraryClient initialBooks={books} onDelete={deleteBook} />
    </div>
  )
}
