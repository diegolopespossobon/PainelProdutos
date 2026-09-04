export interface Produto {
  id: number
  nome: string
  categoria: string
  preco: number
  estoque: number
  ativo: boolean
}

// Payload usado para criar/editar. Sem "id" (gerado pela API).
export type ProdutoInput = Omit<Produto, 'id'>

export interface ListaProdutosParams {
  pagina: number
  itensPorPagina: number
  nome?: string
  categoria?: string
}

export interface ListaProdutosResultado {
  produtos: Produto[]
  total: number
}

// Chaves de erro de validação do formulário, uma por campo.
export interface ErrosFormularioProduto {
  nome?: string
  preco?: string
  estoque?: string
}
