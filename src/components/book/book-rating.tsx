'use client'

import { Star } from 'lucide-react'

interface BookRatingProps {
  rating: number
  size?: number
  showValue?: boolean
}

export default function BookRating({
  rating,
  size = 16,
  showValue = true,
}: BookRatingProps) {
  const filledStars = Math.round(rating)
  const isRated = rating > 0

  return (
    <div className="flex items-center space-x-2">
      {/* Estrelas */}
      <div className="flex">
        {[...Array(5)].map((_, i) => {
          const filled = i < filledStars
          return (
            <Star
              key={i}
              size={size}
              className={`transition-colors duration-200 ${
                filled
                  ? 'text-yellow-400 fill-yellow-400 drop-shadow-sm dark:text-yellow-300 dark:fill-yellow-300'
                  : 'text-muted-foreground/40 dark:text-muted-foreground/30'
              }`}
            />
          )
        })}
      </div>

      {/* Valor numérico opcional */}
      {showValue && (
        <span
          className={`text-xs font-medium ${
            isRated
              ? 'text-muted-foreground dark:text-gray-300'
              : 'text-muted-foreground/70 italic'
          }`}
        >
          {isRated ? rating.toFixed(1) : 'Sem avaliação'}
        </span>
      )}
    </div>
  )
}
