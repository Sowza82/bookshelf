// src/hooks/useLocalStorage.ts
import { useEffect, useState } from 'react'

export default function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue
    try {
      const item = window.localStorage.getItem(key)
      if (item) return JSON.parse(item) as T
      return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue
    } catch (error) {
      console.error('Erro ao ler localStorage:', error)
      return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue))
      } catch (error) {
        console.error('Erro ao salvar localStorage:', error)
      }
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue] as const
}
