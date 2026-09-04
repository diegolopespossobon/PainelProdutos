import { useEffect, useState, useCallback } from 'react'
import { produtosService } from '../services/produtosService'
import type { Produto } from '../types/produto'

interface UseProdutosParams {
  pagina: number
  itensPorPagina: number
  nome: string
  categoria: string
}

type Status = 'carregando' | 'sucesso' | 'erro'

interface UseProdutosResultado {
  produtos: Produto[]
  total: number
  status: Status
  mensagemErro: string | null
  recarregar: () => void
}

export function useProdutos({
  pagina,
  itensPorPagina,
  nome,
  categoria,
}: UseProdutosParams): UseProdutosResultado {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState<Status>('carregando')
  const [mensagemErro, setMensagemErro] = useState<string | null>(null)
  const [versao, setVersao] = useState(0)

  const recarregar = useCallback(() => setVersao((v) => v + 1), [])

  useEffect(() => {
    let cancelado = false

    async function carregar() {
      setStatus('carregando')
      setMensagemErro(null)
      try {
        const resultado = await produtosService.listar({
          pagina,
          itensPorPagina,
          nome: nome || undefined,
          categoria: categoria || undefined,
        })
        if (cancelado) return
        setProdutos(resultado.produtos)
        setTotal(resultado.total)
        setStatus('sucesso')
      } catch (erro) {
        if (cancelado) return
        const mensagem = erro instanceof Error ? erro.message : 'Erro desconhecido.'
        setMensagemErro(mensagem)
        setStatus('erro')
      }
    }

    carregar()
    return () => {
      cancelado = true
    }
  }, [pagina, itensPorPagina, nome, categoria, versao])

  return { produtos, total, status, mensagemErro, recarregar }
}
