'use client'

import React from 'react'
import { useTheme } from '../theme-provider'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive'
}

export function Badge({
  variant = 'default',
  className = '',
  ...props
}: BadgeProps) {
  const { theme } = useTheme()

  const baseStyle =
    'inline-block rounded-full px-2 py-0.5 text-xs font-medium transition-colors duration-300'
  const variantStyle =
    variant === 'secondary'
      ? theme === 'dark'
        ? 'bg-gray-700 text-gray-200'
        : 'bg-gray-200 text-gray-800'
      : variant === 'destructive'
      ? 'bg-red-600 text-white'
      : theme === 'dark'
      ? 'bg-gray-800 text-white'
      : 'bg-gray-100 text-black'

  return (
    <div className={`${baseStyle} ${variantStyle} ${className}`} {...props} />
  )
}
