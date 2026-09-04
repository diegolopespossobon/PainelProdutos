import { Link, useNavigate, useParams } from 'react-router-dom'
import { useProduto } from '../hooks/useProduto'
import { EstadoCarregando, EstadoErro } from '../components/produtos/EstadosLista'

const formatadorMoeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function DetalheProdutoPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { produto, status, mensagemErro } = useProduto(Number(id))

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
    <div className="pagina-detalhe">
      <Link to="/" className="link-voltar">
        ← Voltar para a lista
      </Link>

      <div className="cartao-detalhe">
        <div className="cartao-detalhe__topo">
          <h1>{produto.nome}</h1>
          {!produto.ativo && <span className="etiqueta etiqueta--inativo">Inativo</span>}
        </div>

        <dl className="lista-definicao">
          <div>
            <dt>Categoria</dt>
            <dd>{produto.categoria}</dd>
          </div>
          <div>
            <dt>Preço</dt>
            <dd>{formatadorMoeda.format(produto.preco)}</dd>
          </div>
          <div>
            <dt>Estoque</dt>
            <dd>{produto.estoque === 0 ? 'Sem estoque' : `${produto.estoque} unidades`}</dd>
          </div>
        </dl>

        <Link to={`/produtos/${produto.id}/editar`} className="botao botao--primario">
          Editar produto
        </Link>
      </div>
    </div>
  )
}
