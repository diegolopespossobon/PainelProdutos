import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

interface Toast {
  id: number
  tipo: 'sucesso' | 'erro'
  mensagem: string
}

interface ToastContextValor {
  mostrarToast: (tipo: Toast['tipo'], mensagem: string) => void
}

const ToastContext = createContext<ToastContextValor | null>(null)

let proximoId = 1

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const mostrarToast = useCallback((tipo: Toast['tipo'], mensagem: string) => {
    const id = proximoId++
    setToasts((atuais) => [...atuais, { id, tipo, mensagem }])
    setTimeout(() => {
      setToasts((atuais) => atuais.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  return (
    <ToastContext.Provider value={{ mostrarToast }}>
      {children}
      <div className="toast-container" role="status" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast--${toast.tipo}`}>
            {toast.mensagem}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const contexto = useContext(ToastContext)
  if (!contexto) {
    throw new Error('useToast precisa ser usado dentro de um ToastProvider')
  }
  return contexto
}
