'use client'

import MyCard from '@/components/ui/custom/my-card'

interface RecentBooksCardProps {
  books: {
    id: number
    title: string
    author: string
    description: string
    image?: string
  }[]
}

export default function RecentBooksCard({ books }: RecentBooksCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {books.map(book => (
        <MyCard
          key={book.id}
          title={book.title}
          description={`Autor: ${book.author} • ${book.description}`}
          image={book.image}
        />
      ))}
    </div>
  )
}
