import { describe, expect, it } from 'vitest'
import { validarProduto } from '../components/produto-form/validarProduto'

const dadosValidos = {
  nome: 'Teclado Mecanico',
  categoria: 'Perifericos',
  preco: '199,90',
  estoque: '10',
  ativo: true,
}

describe('validarProduto', () => {
  it('não retorna erros para dados válidos', () => {
    expect(validarProduto(dadosValidos)).toEqual({})
  })

  it('exige nome com no mínimo 3 caracteres', () => {
    const erros = validarProduto({ ...dadosValidos, nome: 'ab' })
    expect(erros.nome).toBe('O nome precisa ter no mínimo 3 caracteres.')
  })

  it('exige nome preenchido', () => {
    const erros = validarProduto({ ...dadosValidos, nome: '   ' })
    expect(erros.nome).toBe('Informe o nome do produto.')
  })

  it('rejeita preço zero ou negativo', () => {
    expect(validarProduto({ ...dadosValidos, preco: '0' }).preco).toBeDefined()
    expect(validarProduto({ ...dadosValidos, preco: '-5' }).preco).toBeDefined()
  })

  it('aceita preço com vírgula decimal', () => {
    expect(validarProduto({ ...dadosValidos, preco: '49,90' }).preco).toBeUndefined()
  })

  it('rejeita estoque negativo ou não inteiro', () => {
    expect(validarProduto({ ...dadosValidos, estoque: '-1' }).estoque).toBeDefined()
    expect(validarProduto({ ...dadosValidos, estoque: '2.5' }).estoque).toBeDefined()
  })

  it('aceita estoque zero', () => {
    expect(validarProduto({ ...dadosValidos, estoque: '0' }).estoque).toBeUndefined()
  })
})
