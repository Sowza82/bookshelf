'use client'

import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'accent'
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseStyle = 'px-6 py-3 rounded-lg font-semibold transition-colors duration-200'

  const variants = {
    primary: 'bg-[var(--color-primary)] text-white hover:bg-[#926c4a]',
    accent: 'bg-[var(--color-accent)] text-white hover:bg-[#b5885d]',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
