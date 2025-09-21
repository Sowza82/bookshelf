interface BookRatingProps {
  rating: number
}

export default function BookRating({ rating }: BookRatingProps) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
      ))}
    </div>
  )
}
