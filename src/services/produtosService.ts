import { apiClient } from './apiClient'
import type {
  ListaProdutosParams,
  ListaProdutosResultado,
  Produto,
  ProdutoInput,
} from '../types/produto'

// Todas as chamadas relacionadas a produtos moram aqui. Nenhum componente
// deve chamar fetch/apiClient diretamente.
export const produtosService = {
  async listar({
    pagina,
    itensPorPagina,
    nome,
    categoria,
  }: ListaProdutosParams): Promise<ListaProdutosResultado> {
    const query = new URLSearchParams({
      _page: String(pagina),
      _limit: String(itensPorPagina),
    })
    if (nome) query.set('nome_like', nome)
    if (categoria) query.set('categoria', categoria)

    const { data, totalCount } = await apiClient.get<Produto[]>(`/produtos?${query}`)
    return { produtos: data, total: totalCount ?? data.length }
  },

  async buscarPorId(id: number): Promise<Produto> {
    const { data } = await apiClient.get<Produto>(`/produtos/${id}`)
    return data
  },

  // Usado para popular o filtro de categoria com as opções que existem hoje.
  async listarCategorias(): Promise<string[]> {
    const { data } = await apiClient.get<Produto[]>('/produtos?_limit=1000')
    const categorias = new Set(data.map((produto) => produto.categoria))
    return Array.from(categorias).sort()
  },

  async criar(input: ProdutoInput): Promise<Produto> {
    const { data } = await apiClient.post<Produto>('/produtos', input)
    return data
  },

  async atualizar(id: number, input: ProdutoInput): Promise<Produto> {
    const { data } = await apiClient.put<Produto>(`/produtos/${id}`, input)
    return data
  },

  async excluir(id: number): Promise<void> {
    await apiClient.delete<unknown>(`/produtos/${id}`)
  },
}
