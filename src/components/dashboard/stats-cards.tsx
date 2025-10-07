// src/components/dashboard/stats-cards.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Book } from '@/types/book'
import { BarChart2, BookOpen, BookOpenCheck, CheckCircle } from 'lucide-react'

interface StatsCardsProps {
  books: Book[]
  theme?: {
    card?: string
    textPrimary?: string
    textSecondary?: string
    gaugeColor?: string
  }
}

// Calcula estatísticas
const calculateStats = (books: Book[]) => {
  const totalBooks = books.length
  const booksRead = books.filter(b => b.read).length
  const booksToRead = totalBooks - booksRead

  const totalPages = books.reduce((sum, b) => sum + (b.pages || 0), 0)
  const readPages = books.reduce((sum, b) => sum + (b.current_page || 0), 0)
  const pagesPercentage = totalPages > 0 ? (readPages / totalPages) * 100 : 0

  return {
    totalBooks,
    booksRead,
    booksToRead,
    pagesPercentage,
  }
}

export default function StatsCards({ books, theme = {} }: StatsCardsProps) {
  const { totalBooks, booksRead, booksToRead, pagesPercentage } =
    calculateStats(books)

  const defaultTheme = {
    card: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md',
    textPrimary: 'text-gray-900 dark:text-gray-100',
    textSecondary: 'text-gray-500 dark:text-gray-400',
    gaugeColor: '#4f46e5',
  }

  const appliedTheme = { ...defaultTheme, ...theme }

  const stats = [
    {
      title: 'Total de Livros',
      value: totalBooks,
      icon: BookOpen,
      description: `${booksToRead} para ler.`,
    },
    {
      title: 'Livros Lendo',
      value: booksToRead,
      icon: BookOpenCheck,
      description: 'Ainda em progresso...',
    },
    {
      title: 'Livros Lidos',
      value: booksRead,
      icon: CheckCircle,
      description:
        totalBooks > 0
          ? `${Math.round((booksRead / totalBooks) * 100)}% da sua coleção.`
          : '0%',
    },
    {
      title: 'Páginas Lidas',
      value: `${Math.round(pagesPercentage)}%`,
      icon: BarChart2, // ícone representando progresso
      description: 'Progresso total das páginas lidas.',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`${appliedTheme.card} flex flex-col items-center justify-center p-4 min-h-[180px]`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-full">
            <CardTitle
              className={`${appliedTheme.textPrimary} text-sm font-medium`}
            >
              {stat.title}
            </CardTitle>
            {stat.icon && (
              <stat.icon className={`${appliedTheme.textSecondary} h-4 w-4`} />
            )}
          </CardHeader>

          <CardContent className="flex flex-col items-center justify-center w-full">
            <div className={`${appliedTheme.textPrimary} text-2xl font-bold`}>
              {stat.value}
            </div>

            <p
              className={`${appliedTheme.textSecondary} text-xs text-center mt-2`}
            >
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
