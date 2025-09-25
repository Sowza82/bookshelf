'use client'

import Progress from '@/components/ui/progress'

interface BookProgressCardProps {
  title: string
  author: string
  progress: number
}

export default function BookProgressCard({
  title,
  author,
  progress,
}: BookProgressCardProps) {
  return (
    <div className="bg-card-default p-4 rounded-lg shadow-md flex flex-col gap-2">
      <h4 className="text-text font-semibold">{title}</h4>
      <p className="text-muted text-sm">Autor: {author}</p>
      <Progress value={progress} />
      <p className="text-sm text-muted">{progress}% concluído</p>
    </div>
  )
}
