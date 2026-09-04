import { Link } from 'react-router-dom'
import type { Produto } from '../../types/produto'

const formatadorMoeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

interface TabelaProdutosProps {
  produtos: Produto[]
  onExcluir: (produto: Produto) => void
}

export function TabelaProdutos({ produtos, onExcluir }: TabelaProdutosProps) {
  return (
    <table className="tabela-produtos">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Categoria</th>
          <th scope="col">Preço</th>
          <th scope="col">Estoque</th>
          <th scope="col">
            <span className="sr-only">Ações</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto) => (
          <tr key={produto.id}>
            <td>
              <Link to={`/produtos/${produto.id}`} className="link-produto">
                {produto.nome}
              </Link>
              {!produto.ativo && <span className="etiqueta etiqueta--inativo">Inativo</span>}
            </td>
            <td>{produto.categoria}</td>
            <td>{formatadorMoeda.format(produto.preco)}</td>
            <td>
              {produto.estoque === 0 ? (
                <span className="etiqueta etiqueta--sem-estoque">Sem estoque</span>
              ) : (
                produto.estoque
              )}
            </td>
            <td className="tabela-produtos__acoes">
              <Link to={`/produtos/${produto.id}/editar`} className="botao botao--texto">
                Editar
              </Link>
              <button
                type="button"
                className="botao botao--texto botao--perigo-texto"
                onClick={() => onExcluir(produto)}
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
