import type { ErrosFormularioProduto } from '../../types/produto'

export interface DadosFormularioProduto {
  nome: string
  categoria: string
  preco: string
  estoque: string
  ativo: boolean
}

export function validarProduto(dados: DadosFormularioProduto): ErrosFormularioProduto {
  const erros: ErrosFormularioProduto = {}

  const nome = dados.nome.trim()
  if (!nome) {
    erros.nome = 'Informe o nome do produto.'
  } else if (nome.length < 3) {
    erros.nome = 'O nome precisa ter no mínimo 3 caracteres.'
  }

  const preco = Number(dados.preco.replace(',', '.'))
  if (dados.preco.trim() === '') {
    erros.preco = 'Informe o preço.'
  } else if (Number.isNaN(preco) || preco <= 0) {
    erros.preco = 'O preço precisa ser maior que zero.'
  }

  const estoque = Number(dados.estoque)
  if (dados.estoque.trim() === '') {
    erros.estoque = 'Informe o estoque.'
  } else if (!Number.isInteger(estoque) || estoque < 0) {
    erros.estoque = 'O estoque precisa ser zero ou um número inteiro positivo.'
  }

  return erros
}
