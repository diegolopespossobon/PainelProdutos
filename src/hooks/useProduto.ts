import { useEffect, useState } from 'react'
import { produtosService } from '../services/produtosService'
import type { Produto } from '../types/produto'

type Status = 'carregando' | 'sucesso' | 'erro'

export function useProduto(id: number | undefined) {
  const [produto, setProduto] = useState<Produto | null>(null)
  const [status, setStatus] = useState<Status>('carregando')
  const [mensagemErro, setMensagemErro] = useState<string | null>(null)

  useEffect(() => {
    if (id === undefined) return
    let cancelado = false

    async function carregar() {
      setStatus('carregando')
      try {
        const resultado = await produtosService.buscarPorId(id as number)
        if (cancelado) return
        setProduto(resultado)
        setStatus('sucesso')
      } catch (erro) {
        if (cancelado) return
        setMensagemErro(erro instanceof Error ? erro.message : 'Erro desconhecido.')
        setStatus('erro')
      }
    }

    carregar()
    return () => {
      cancelado = true
    }
  }, [id])

  return { produto, status, mensagemErro }
}
