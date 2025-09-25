// src/components/dashboard/stats-cards.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Book } from '@/types/book'
import { BookOpen, CheckCircle, Star } from 'lucide-react'

interface StatsCardsProps {
  books: Book[]
}

// Função auxiliar para calcular as estatísticas
const calculateStats = (books: Book[]) => {
  const totalBooks = books.length
  const booksRead = books.filter(b => b.read).length
  const avgRating =
    totalBooks > 0
      ? (
          books.filter(b => b.read).reduce((sum, b) => sum + b.rating, 0) /
          booksRead
        ).toFixed(1)
      : 'N/A'

  return {
    totalBooks,
    booksRead,
    booksToRead: totalBooks - booksRead,
    avgRating,
  }
}

export default function StatsCards({ books }: StatsCardsProps) {
  const { totalBooks, booksRead, booksToRead, avgRating } =
    calculateStats(books)

  const stats = [
    {
      title: 'Total de Livros',
      value: totalBooks,
      icon: BookOpen,
      description: `Você tem ${booksToRead} para ler.`,
    },
    {
      title: 'Livros Lidos',
      value: booksRead,
      icon: CheckCircle,
      description: `${
        Math.round((booksRead / totalBooks) * 100) || 0
      }% da sua coleção.`,
    },
    {
      title: 'Média de Avaliação',
      value: avgRating,
      icon: Star,
      description: 'Baseado em seus livros lidos.',
    },
    {
      title: 'Gêneros Principais',
      value: books.length > 0 ? books[0].genre : 'N/A', // Apenas um placeholder simples
      icon: null,
      description: 'Em termos de quantidade.',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon && (
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
