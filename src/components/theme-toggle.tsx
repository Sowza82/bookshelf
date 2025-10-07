'use client'

import { useTheme } from '@/components/theme-provider'
import { AnimatePresence, motion } from 'framer-motion'
import { Laptop, Moon, Sun } from 'lucide-react'

interface ThemeToggleProps {
  className?: string
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()

  // Função que cicla entre light -> dark -> system -> light
  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  const renderIcon = () => {
    // Definindo o tamanho do ícone (w-6 h-6 = 24px)
    const iconClass = 'w-6 h-6'

    if (theme === 'light') return <Sun className={iconClass} />
    if (theme === 'dark') return <Moon className={iconClass} />
    return <Laptop className={iconClass} />
  }

  return (
    <button
      onClick={cycleTheme}
      aria-label="Alternar tema"
      // Estilos base para o botão (h-10 w-10 garante o tamanho consistente)
      className={`
        h-10 w-10
        flex items-center justify-center
        rounded-full
        bg-background text-foreground border border-input
        shadow-sm
        transition-colors duration-200
        hover:bg-accent hover:text-accent-foreground
        ${className}
      `}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          // A chave `key` é essencial para o framer-motion detectar a mudança e animar
          key={theme}
          initial={{ opacity: 0, scale: 0.8 }} // Início da animação (sai pequeno e transparente)
          animate={{ opacity: 1, scale: 1 }} // Estado final (aparece no tamanho normal)
          exit={{ opacity: 0, scale: 0.8 }} // Estado de saída
          transition={{ duration: 0.2 }}
        >
          {renderIcon()}
        </motion.div>
      </AnimatePresence>
    </button>
  )
}
