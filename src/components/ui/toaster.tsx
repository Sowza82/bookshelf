'use client'

import { ReactNode, useState } from 'react'

interface ToastProps {
  message: string | ReactNode
  duration?: number
}

export default function Toaster() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const addToast = (toast: ToastProps) => {
    setToasts(prev => [...prev, toast])
    setTimeout(() => {
      setToasts(prev => prev.slice(1))
    }, toast.duration || 3000)
  }

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map((t, i) => (
        <div key={i} className="bg-[#6B4226] text-white px-4 py-2 rounded shadow">{t.message}</div>
      ))}
    </div>
  )
}
