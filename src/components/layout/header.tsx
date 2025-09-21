'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className="bg-[var(--color-primary)] text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo / Título */}
        <Link href="/" className="text-xl sm:text-2xl font-bold">
          📚 Bookshelf
        </Link>

        {/* Navegação desktop */}
        <nav
          className="hidden md:flex gap-6 text-sm sm:text-base"
          role="navigation"
        >
          <Link
            href="/"
            className="hover:underline transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/biblioteca"
            className="hover:underline transition-colors duration-200"
          >
            Biblioteca
          </Link>
          <Link
            href="/livro/novo"
            className="hover:underline transition-colors duration-200"
          >
            Novo Livro
          </Link>
        </nav>

        {/* Botão mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isOpen}
            className="focus:outline-none p-1 rounded hover:bg-white/20 transition-colors duration-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Dropdown mobile */}
      <nav
        role="navigation"
        className={`md:hidden bg-[var(--color-primary)] text-white px-4 pb-4 flex flex-col gap-3 transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <Link
          href="/"
          className="hover:underline transition-colors duration-200"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/biblioteca"
          className="hover:underline transition-colors duration-200"
          onClick={() => setIsOpen(false)}
        >
          Biblioteca
        </Link>
        <Link
          href="/livro/novo"
          className="hover:underline transition-colors duration-200"
          onClick={() => setIsOpen(false)}
        >
          Novo Livro
        </Link>
      </nav>
    </header>
  )
}
