import { useEffect, useState } from 'react'

// Devolve uma versão "atrasada" do valor, que só atualiza depois que o
// usuário para de digitar por `delayMs`. Evita disparar uma request a
// cada tecla na busca.
export function useDebounce<T>(valor: T, delayMs = 400): T {
  const [valorDebounced, setValorDebounced] = useState(valor)

  useEffect(() => {
    const timeoutId = setTimeout(() => setValorDebounced(valor), delayMs)
    return () => clearTimeout(timeoutId)
  }, [valor, delayMs])

  return valorDebounced
}
