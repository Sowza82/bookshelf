'use client'

import ThemeToggle from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Home, Library, Menu, PlusCircle, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Dashboard', icon: <Home className="h-5 w-5 mr-1" /> },
    {
      href: '/biblioteca',
      label: 'Biblioteca',
      icon: <Library className="h-5 w-5 mr-1" />,
    },
    {
      href: '/livro/novo',
      label: 'Novo',
      icon: <PlusCircle className="h-5 w-5 mr-1" />,
      isPrimary: true,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[var(--color-card)] shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Library className="h-6 w-6 text-primary" />
          <span className="hidden sm:inline font-bold text-lg text-[var(--color-card-foreground)] tracking-tight">
            BookShelf
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-3">
          {/* ThemeToggle maior */}
          <ThemeToggle className="w-10 h-10 p-2 rounded hover:bg-primary/10 transition-colors" />

          {navItems.map(item => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={item.isPrimary ? undefined : 'ghost'}
                className={cn(
                  'font-medium text-sm h-10 px-3',
                  item.isPrimary
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                    : pathname === item.href
                    ? 'text-primary hover:bg-primary/10'
                    : 'text-muted-foreground hover:text-[var(--color-card-foreground)]'
                )}
              >
                {item.icon}
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Mobile menu */}
        <div className="flex items-center md:hidden space-x-2">
          <ThemeToggle className="w-10 h-10 p-2 rounded hover:bg-primary/10 transition-colors" />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded hover:bg-primary/10 transition-colors"
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 right-4 bg-[var(--color-card)] border rounded shadow-md flex flex-col space-y-1 p-2 z-50">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              <Button
                variant={item.isPrimary ? undefined : 'ghost'}
                className={cn(
                  'w-full justify-start font-medium text-sm h-10 px-3',
                  item.isPrimary
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                    : pathname === item.href
                    ? 'text-primary hover:bg-primary/10'
                    : 'text-muted-foreground hover:text-[var(--color-card-foreground)]'
                )}
              >
                {item.icon}
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
