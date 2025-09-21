'use client'
import { useState } from 'react'

interface BookSearchProps {
  onSearch: (query: string) => void
}

export default function BookSearch({ onSearch }: BookSearchProps) {
  const [query, setQuery] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <div className="w-full max-w-xl mx-auto relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Buscar por título ou autor"
        className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-[var(--color-text)]"
      />
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
        />
      </svg>
    </div>
  )
}
