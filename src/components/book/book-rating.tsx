'use client'

import { Star } from 'lucide-react'

interface BookRatingProps {
  rating: number
  size?: number
  // Adicionamos 'showValue' para decidir se o número deve ser exibido (padrão é sim)
  showValue?: boolean
}

export default function BookRating({
  rating,
  size = 16,
  showValue = true,
}: BookRatingProps) {
  // Arredonda o rating para determinar quantas estrelas preencher
  const filledStars = Math.round(rating)
  const isRated = rating > 0

  return (
    <div className="flex items-center space-x-2">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={size}
            // Simplificação do className
            className={`
              ${
                isRated && i < filledStars
                  ? 'text-yellow-400 fill-yellow-400 dark:text-yellow-300 dark:fill-yellow-300'
                  : 'text-gray-300 dark:text-gray-600'
              }
              transition-colors duration-200
            `}
          />
        ))}
      </div>

      {/* Exibe o valor numérico apenas se o livro foi avaliado e showValue for true */}
      {showValue && isRated && (
        <span className="text-sm font-medium text-foreground ml-1">
          {rating.toFixed(1)}
        </span>
      )}

      {/* Exibe mensagem se não houver avaliação, em vez de 0.0 */}
      {showValue && !isRated && (
        <span className="text-sm text-muted-foreground ml-1">
          Sem avaliação
        </span>
      )}
    </div>
  )
}
