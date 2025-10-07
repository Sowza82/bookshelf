'use client'

import * as RadixDialog from '@radix-ui/react-dialog'
import * as React from 'react' // Importação React necessária para os tipos
import { useTheme } from '../theme-provider'

export const Dialog = RadixDialog.Root
export const DialogTrigger = RadixDialog.Trigger

// CORREÇÃO: Tipando com as props do RadixDialog.Content (resolve o erro 'any')
export const DialogContent = ({
  className = '',
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixDialog.Content>) => {
  const { theme } = useTheme()
  const bg = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
  return (
    <RadixDialog.Content
      className={`rounded-lg p-4 shadow-lg ${bg} ${className}`}
      {...props}
    />
  )
}

// CORREÇÃO: Tipando como atributos HTML para uma DIV (resolve o erro 'any')
export const DialogHeader = ({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`mb-2 ${className}`} {...props} />
)

// CORREÇÃO: Tipando como atributos HTML para uma DIV (resolve o erro 'any')
export const DialogFooter = ({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`mt-4 flex justify-end gap-2 ${className}`} {...props} />
)

// CORREÇÃO: Tipando como atributos HTML para um H2 (resolve o erro 'any')
export const DialogTitle = ({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={`text-lg font-semibold ${className}`} {...props} />
)
