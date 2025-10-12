import * as React from "react"
import { ToastProvider, ToastViewport, Toast } from "./toast"

type ToastType = {
  title: string
  description?: string
  variant?: "default" | "destructive"
}

const ToastContext = React.createContext<{ toast: (t: ToastType) => void } | null>(null)

export function ToastProviderCustom({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastType[]>([])

  const toast = (t: ToastType) => setToasts((prev) => [...prev, t])

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastProvider>
        {children}
        {toasts.map((t, i) => (
          <Toast key={i}>
            <div>
              <strong>{t.title}</strong>
              {t.description && <p>{t.description}</p>}
            </div>
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error("useToast deve ser usado dentro de <ToastProviderCustom>")
  return ctx
}
