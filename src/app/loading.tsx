'use client'

import { useEffect, useState } from 'react'

export default function LoadingBook() {
  const [page, setPage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPage(prev => (prev + 1) % 6) // número de páginas animadas
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[var(--color-bg)] text-[var(--color-text)] px-4">
      {/* Livro aberto */}
      <div className="relative w-48 h-56 sm:w-64 sm:h-72 perspective">
        {/* Fundo do livro */}
        <div className="absolute inset-0 bg-[var(--color-card-bg)] rounded-md shadow-inner z-0"></div>

        {/* Páginas animadas */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-11/12 h-5/6 top-1/12 left-1/24 bg-white rounded-sm shadow-md transform origin-left transition-transform duration-500 ease-in-out
              ${i === page ? 'rotateY-0 z-30' : 'rotateY-180 z-20'}`}
            style={{ transformStyle: 'preserve-3d' }}
          />
        ))}

        {/* Capa do livro */}
        <div className="absolute inset-0 bg-[var(--color-primary)] rounded-md shadow-lg z-40 flex items-center justify-center font-bold text-white text-lg sm:text-xl">
          Bookshelf
        </div>
      </div>

      <p className="mt-6 text-center text-lg sm:text-xl text-[var(--color-muted)]">
        Carregando a biblioteca...
      </p>
    </div>
  )
}
