// src/hooks/useLocalStorage.ts

import { useState, useEffect } from 'react'

export default function useLocalStorage<T>(key: string, initialValue: T) {

  // 1. Inicialização do estado a partir do LocalStorage (executa apenas uma vez)
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      // Se houver valor, retorna o JSON parseado. Caso contrário, retorna o valor inicial.
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Erro ao carregar localStorage:', error)
      return initialValue
    }
  })

  // 2. Efeito para salvar o estado no LocalStorage sempre que 'storedValue' mudar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // O valor salvo é o estado atual
        const valueToStore = JSON.stringify(storedValue)
        window.localStorage.setItem(key, valueToStore)
        // console.log(`[STORAGE] Dados salvos para a chave: ${key}`); // Linha de debug opcional
      } catch (error) {
        console.error('Erro ao salvar localStorage:', error)
      }
    }
  }, [key, storedValue]) // Dependência: 'storedValue' é o que dispara o salvamento

  // Retorna o valor e a função para atualizá-lo (que aciona o useEffect acima)
  return [storedValue, setStoredValue] as const
}
