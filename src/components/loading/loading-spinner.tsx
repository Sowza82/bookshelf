// src/components/loading/loading-spinner.tsx
'use client'

import { useTheme } from '@/components/theme-provider'
import { BookOpen } from 'lucide-react'

interface LoadingSpinnerProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function LoadingSpinner({
  message = 'Carregando...',
  size = 'md',
}: LoadingSpinnerProps) {
  const { theme } = useTheme() // Para dark/light mode

  const spinnerSize =
    size === 'sm' ? 'w-16 h-16' : size === 'lg' ? 'w-32 h-32' : 'w-24 h-24'

  // Cores adaptadas para light/dark mode
  const colors =
    theme === 'dark'
      ? [
          'var(--color-secondary)',
          'var(--color-accent)',
          'var(--color-primary)',
          'var(--color-secondary)',
          'var(--color-accent)',
          'var(--color-primary)',
        ]
      : [
          'var(--color-primary)',
          'var(--color-secondary)',
          'var(--color-accent)',
          'var(--color-primary)',
          'var(--color-secondary)',
          'var(--color-accent)',
        ]

  return (
    <div
      className="flex flex-col items-center justify-center h-screen px-4 fixed inset-0 z-50"
      style={{
        backgroundColor:
          theme === 'dark'
            ? 'var(--color-background)'
            : 'var(--color-background)',
        color:
          theme === 'dark'
            ? 'var(--color-foreground)'
            : 'var(--color-foreground)',
      }}
    >
      {/* Espiral giratória */}
      <div className={`relative ${spinnerSize} animate-spin-slow`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-full flex items-center justify-center"
            style={{
              transform: `rotate(${i * 60}deg) translate(0, -50%)`,
              animation: `fade 1.5s infinite ${i * 0.2}s`,
            }}
          >
            <div
              className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
              style={{ backgroundColor: colors[i], opacity: 0.6 }}
            />
          </div>
        ))}
      </div>

      {/* Ícone do livro + texto */}
      <div className="mt-6 flex items-center space-x-2 text-primary">
        <BookOpen className="w-8 h-8" />
        <span className="font-semibold text-lg sm:text-xl">Bookshelf</span>
      </div>

      {/* Mensagem */}
      <p className="mt-4 text-center text-[var(--color-muted)] text-base sm:text-lg">
        {message}
      </p>

      <style jsx>{`
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite; /* Mais lento */
        }

        @keyframes fade {
          0%,
          100% {
            opacity: 0.6;
            transform: translateY(-50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateY(-50%) scale(1.2);
          }
        }
      `}</style>
    </div>
  )
}
