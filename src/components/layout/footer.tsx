// src/components/layout/footer.tsx
'use client'

interface FooterTheme {
  bg?: string
  text?: string
}

interface FooterProps {
  theme?: FooterTheme
}

export default function Footer({ theme }: FooterProps) {
  // Cores padrão compatíveis com dark/light mode
  const bgColor = theme?.bg || 'var(--color-card)'
  const textColor = theme?.text || 'var(--color-card-foreground)'

  return (
    <footer
      className="py-6 mt-12 border-t border-gray-200 dark:border-gray-700"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="container mx-auto flex flex-col items-center justify-center px-4 gap-2">
        <p className="text-sm sm:text-base opacity-80 text-center">
          &copy; {new Date().getFullYear()}{' '}
          <span className="font-semibold">MisturaDev</span>. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  )
}
