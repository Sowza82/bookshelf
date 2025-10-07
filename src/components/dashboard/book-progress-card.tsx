// src/components/dashboard/book-progress-card.tsx
'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface BookProgressCardProps {
  title: string
  author: string
  progress: number
}

export default function BookProgressCard({ title, author, progress }: BookProgressCardProps) {
  return (
    <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md p-4 flex flex-col gap-2 transition-colors duration-300">
      <CardContent>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">Autor: {author}</p>

        <Progress
          value={progress}
          className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-2"
          barClassName="bg-primary dark:bg-primary-light transition-all duration-300"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progresso de leitura: ${progress}%`}
        />

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{progress}% concluído</p>
      </CardContent>
    </Card>
  )
}
