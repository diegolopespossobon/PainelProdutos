import { useState, type FormEvent } from 'react'
import { useCategorias } from '../../hooks/useCategorias'
import { CampoFormulario } from './CampoFormulario'
import { validarProduto, type DadosFormularioProduto } from './validarProduto'
import type { ErrosFormularioProduto, Produto, ProdutoInput } from '../../types/produto'

interface ProdutoFormProps {
  produtoInicial?: Produto
  salvando: boolean
  onSalvar: (input: ProdutoInput) => void
  onCancelar: () => void
}

function paraFormulario(produto?: Produto): DadosFormularioProduto {
  return {
    nome: produto?.nome ?? '',
    categoria: produto?.categoria ?? '',
    preco: produto ? String(produto.preco) : '',
    estoque: produto ? String(produto.estoque) : '',
    ativo: produto?.ativo ?? true,
  }
}

export function ProdutoForm({ produtoInicial, salvando, onSalvar, onCancelar }: ProdutoFormProps) {
  const categorias = useCategorias()
  const [dados, setDados] = useState<DadosFormularioProduto>(paraFormulario(produtoInicial))
  const [erros, setErros] = useState<ErrosFormularioProduto>({})

  function atualizarCampo<K extends keyof DadosFormularioProduto>(
    campo: K,
    valor: DadosFormularioProduto[K]
  ) {
    setDados((atual) => ({ ...atual, [campo]: valor }))
  }

  function aoSubmeter(evento: FormEvent) {
    evento.preventDefault()
    const errosEncontrados = validarProduto(dados)
    setErros(errosEncontrados)
    if (Object.keys(errosEncontrados).length > 0) return

    onSalvar({
      nome: dados.nome.trim(),
      categoria: dados.categoria.trim() || 'Sem categoria',
      preco: Number(dados.preco.replace(',', '.')),
      estoque: Number(dados.estoque),
      ativo: dados.ativo,
    })
  }

  return (
    <form className="formulario-produto" onSubmit={aoSubmeter} noValidate>
      <CampoFormulario label="Nome" htmlFor="nome" erro={erros.nome}>
        <input
          id="nome"
          type="text"
          value={dados.nome}
          onChange={(e) => atualizarCampo('nome', e.target.value)}
          aria-invalid={Boolean(erros.nome)}
        />
      </CampoFormulario>

      <CampoFormulario label="Categoria" htmlFor="categoria">
        <input
          id="categoria"
          type="text"
          list="lista-categorias"
          placeholder="Ex: Periféricos"
          value={dados.categoria}
          onChange={(e) => atualizarCampo('categoria', e.target.value)}
        />
        <datalist id="lista-categorias">
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria} />
          ))}
        </datalist>
      </CampoFormulario>

      <div className="formulario-produto__linha">
        <CampoFormulario label="Preço (R$)" htmlFor="preco" erro={erros.preco}>
          <input
            id="preco"
            type="text"
            inputMode="decimal"
            placeholder="0,00"
            value={dados.preco}
            onChange={(e) => atualizarCampo('preco', e.target.value)}
            aria-invalid={Boolean(erros.preco)}
          />
        </CampoFormulario>

        <CampoFormulario label="Estoque" htmlFor="estoque" erro={erros.estoque}>
          <input
            id="estoque"
            type="text"
            inputMode="numeric"
            placeholder="0"
            value={dados.estoque}
            onChange={(e) => atualizarCampo('estoque', e.target.value)}
            aria-invalid={Boolean(erros.estoque)}
          />
        </CampoFormulario>
      </div>

      <label className="campo-checkbox">
        <input
          type="checkbox"
          checked={dados.ativo}
          onChange={(e) => atualizarCampo('ativo', e.target.checked)}
        />
        Produto ativo
      </label>

      <div className="formulario-produto__acoes">
        <button type="button" className="botao botao--secundario" onClick={onCancelar}>
          Cancelar
        </button>
        <button type="submit" className="botao botao--primario" disabled={salvando}>
          {salvando ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  )
}
