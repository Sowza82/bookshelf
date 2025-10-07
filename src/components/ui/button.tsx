'use client'

import React from 'react'
// 💡 Assumindo que 'useTheme' vem de um provedor de tema
import { useTheme } from '../theme-provider'

// Interface de Propriedades
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'default' | 'icon' | 'sm' | 'lg'
}

export function Button({
  variant = 'default',
  size = 'default',
  className = '',
  ...props
}: ButtonProps) {
  // O tema não é usado diretamente, mas mantemos o hook caso seja necessário
  // para outras lógicas mais complexas no futuro.
  // const { theme } = useTheme()

  // 1. Estilos Base
  const baseStyle =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none'


  // 2. Estilos de Tamanho
  const sizeStyle = {
    default: 'h-10 px-4 py-2', // Padrão Shadcn
    icon: 'h-10 w-10 p-0', // Tamanho para ícones
    sm: 'h-9 px-3', // Tamanho pequeno
    lg: 'h-11 px-8', // Tamanho grande
  }[size] || 'h-10 px-4 py-2'


  // 3. Estilos de Variante (Usando classes temáticas padrão para aceitar customização via className)
  const variantStyle = {
    // Cor primária sólida
    default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow',
   
    // Outline: Usa cores neutras do sistema (input/background/accent).
    // Isto é essencial para que classes externas como 'border-red-500' funcionem.
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
   
    // Ghost: Transparente.
    ghost: 'hover:bg-accent hover:text-accent-foreground',
   
    // Destructive: Fundo vermelho/destrutivo.
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
  }[variant]

  return (
    <button
      className={`${baseStyle} ${sizeStyle} ${variantStyle} ${className}`}
      {...props}
    />
  )
}
