'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Book, BookOpen, Bookmark, CheckCircle, Star } from 'lucide-react'

interface StatsCardsProps {
  totalBooks: number
  readBooks: number
  readingBooks: number
  unreadBooks: number
  avgRating: number
}

export default function StatsCards({
  totalBooks,
  readBooks,
  readingBooks,
  unreadBooks,
  avgRating,
}: StatsCardsProps) {
  const stats = [
    {
      title: 'Total de Livros',
      value: totalBooks,
      icon: Book,
      color: 'bg-primary dark:bg-primary/80',
    },
    {
      title: 'Lidos',
      value: readBooks,
      icon: CheckCircle,
      color: 'bg-green-500 dark:bg-green-400',
    },
    {
      title: 'Lendo',
      value: readingBooks,
      icon: BookOpen,
      color: 'bg-yellow-400 dark:bg-yellow-300',
    },
    {
      title: 'Não lidos',
      value: unreadBooks,
      icon: Bookmark,
      color: 'bg-gray-400 dark:bg-gray-500',
    },
    {
      title: 'Média Rating',
      value: avgRating,
      icon: Star,
      color: 'bg-purple-500 dark:bg-purple-400',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 xl:gap-8">
      {stats.map(stat => {
        const Icon = stat.icon
        const progress = totalBooks > 0 ? stat.value / totalBooks : 0

        return (
          <Card
            key={stat.title}
            className="
              flex flex-col justify-between rounded-lg
              shadow-sm hover:shadow-md transition-all
              p-4 lg:p-6
              min-h-[160px] sm:min-h-[150px] md:min-h-[140px] lg:min-h-[160px] xl:min-h-[180px]
            "
          >
            <CardHeader className="flex items-center justify-between p-0 mb-3">
              <CardTitle className="text-sm font-semibold text-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="w-5 h-5 text-foreground/70" />
            </CardHeader>

            <CardContent className="flex flex-col justify-between p-0 h-full">
              <p className="text-2xl sm:text-2xl md:text-xl lg:text-xl font-bold text-foreground">
                {stat.value}
              </p>
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded mt-3 overflow-hidden">
                <div
                  className={`${stat.color} h-full rounded transition-all duration-500`}
                  style={{ width: `${Math.min(progress * 100, 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
