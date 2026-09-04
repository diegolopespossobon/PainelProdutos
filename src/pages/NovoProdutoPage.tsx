import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { produtosService } from '../services/produtosService'
import { useToast } from '../context/ToastContext'
import { ProdutoForm } from '../components/produto-form/ProdutoForm'
import type { ProdutoInput } from '../types/produto'

export function NovoProdutoPage() {
  const navigate = useNavigate()
  const { mostrarToast } = useToast()
  const [salvando, setSalvando] = useState(false)

  async function salvar(input: ProdutoInput) {
    setSalvando(true)
    try {
      const criado = await produtosService.criar(input)
      mostrarToast('sucesso', `"${criado.nome}" foi criado com sucesso.`)
      navigate(`/produtos/${criado.id}`)
    } catch (erro) {
      mostrarToast('erro', erro instanceof Error ? erro.message : 'Não foi possível salvar.')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div className="pagina-formulario">
      <h1>Novo produto</h1>
      <ProdutoForm salvando={salvando} onSalvar={salvar} onCancelar={() => navigate(-1)} />
    </div>
  )
}
