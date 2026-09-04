import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { produtosService } from '../services/produtosService'
import { useProduto } from '../hooks/useProduto'
import { useToast } from '../context/ToastContext'
import { ProdutoForm } from '../components/produto-form/ProdutoForm'
import { EstadoCarregando, EstadoErro } from '../components/produtos/EstadosLista'
import type { ProdutoInput } from '../types/produto'

export function EditarProdutoPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { mostrarToast } = useToast()
  const { produto, status, mensagemErro } = useProduto(Number(id))
  const [salvando, setSalvando] = useState(false)

  async function salvar(input: ProdutoInput) {
    if (!produto) return
    setSalvando(true)
    try {
      await produtosService.atualizar(produto.id, input)
      mostrarToast('sucesso', `"${input.nome}" foi atualizado com sucesso.`)
      navigate(`/produtos/${produto.id}`)
    } catch (erro) {
      mostrarToast('erro', erro instanceof Error ? erro.message : 'Não foi possível salvar.')
    } finally {
      setSalvando(false)
    }
  }

  if (status === 'carregando') return <EstadoCarregando />
  if (status === 'erro' || !produto) {
    return (
      <EstadoErro
        mensagem={mensagemErro ?? 'Produto não encontrado.'}
        onTentarNovamente={() => navigate(0)}
      />
    )
  }

  return (
    <div className="pagina-formulario">
      <h1>Editar produto</h1>
      <ProdutoForm
        produtoInicial={produto}
        salvando={salvando}
        onSalvar={salvar}
        onCancelar={() => navigate(`/produtos/${produto.id}`)}
      />
    </div>
  )
}
