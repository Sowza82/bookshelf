// src/components/ui/custom/testimonial.tsx
import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'

interface TestimonialProps {
  author: string
  message: string
}

export default function Testimonial({ author, message }: TestimonialProps) {
  return (
    <Card className="shadow-sm border-l-4 border-primary">
      <CardContent className="p-6">
        <Quote className="h-6 w-6 text-primary mb-3 opacity-50" />
        <p className="text-base italic mb-4 text-[var(--color-text)]">
          "{message}"
        </p>
        <p className="text-sm font-semibold text-right text-muted-foreground">
          - {author}
        </p>
      </CardContent>
    </Card>
  )
}
