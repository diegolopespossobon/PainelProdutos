import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useProdutos } from '../hooks/useProdutos'
import { useCategorias } from '../hooks/useCategorias'
import { useDebounce } from '../hooks/useDebounce'
import { useToast } from '../context/ToastContext'
import { produtosService } from '../services/produtosService'
import { FiltroBusca } from '../components/produtos/FiltroBusca'
import { FiltroCategoria } from '../components/produtos/FiltroCategoria'
import { TabelaProdutos } from '../components/produtos/TabelaProdutos'
import { Paginacao } from '../components/produtos/Paginacao'
import { EstadoCarregando, EstadoErro, EstadoVazio } from '../components/produtos/EstadosLista'
import { ModalConfirmacao } from '../components/ui/ModalConfirmacao'
import type { Produto } from '../types/produto'

const ITENS_POR_PAGINA = 8

export function ListaProdutosPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categorias = useCategorias()
  const { mostrarToast } = useToast()

  const pagina = Number(searchParams.get('pagina') ?? '1')
  const busca = searchParams.get('busca') ?? ''
  const categoria = searchParams.get('categoria') ?? ''

  // Campo de texto local, independente da URL, para não disparar uma
  // navegação a cada tecla — só o valor "assentado" (debounced) vira busca.
  const [textoBusca, setTextoBusca] = useState(busca)
  const buscaComDebounce = useDebounce(textoBusca)

  // Mantém o campo em dia se a URL mudar por fora (botão voltar do navegador).
  useEffect(() => {
    setTextoBusca(busca)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busca])

  const [produtoParaExcluir, setProdutoParaExcluir] = useState<Produto | null>(null)
  const [excluindo, setExcluindo] = useState(false)

  const { produtos, total, status, mensagemErro, recarregar } = useProdutos({
    pagina,
    itensPorPagina: ITENS_POR_PAGINA,
    nome: buscaComDebounce,
    categoria,
  })

  // Sincroniza o valor com debounce para a URL, sempre voltando pra página 1.
  useEffect(() => {
    if (buscaComDebounce === busca) return
    setSearchParams(
      (atuais) => {
        const novos = new URLSearchParams(atuais)
        if (buscaComDebounce) novos.set('busca', buscaComDebounce)
        else novos.delete('busca')
        novos.set('pagina', '1')
        return novos
      },
      { replace: true }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buscaComDebounce])

  function mudarCategoria(novaCategoria: string) {
    setSearchParams((atuais) => {
      const novos = new URLSearchParams(atuais)
      if (novaCategoria) novos.set('categoria', novaCategoria)
      else novos.delete('categoria')
      novos.set('pagina', '1')
      return novos
    })
  }

  function mudarPagina(novaPagina: number) {
    setSearchParams((atuais) => {
      const novos = new URLSearchParams(atuais)
      novos.set('pagina', String(novaPagina))
      return novos
    })
  }

  async function confirmarExclusao() {
    if (!produtoParaExcluir) return
    setExcluindo(true)
    try {
      await produtosService.excluir(produtoParaExcluir.id)
      mostrarToast('sucesso', `"${produtoParaExcluir.nome}" foi excluído.`)
      setProdutoParaExcluir(null)
      recarregar()
    } catch (erro) {
      mostrarToast('erro', erro instanceof Error ? erro.message : 'Não foi possível excluir.')
    } finally {
      setExcluindo(false)
    }
  }

  return (
    <div className="pagina-lista">
      <div className="pagina-lista__topo">
        <h1>Produtos</h1>
        <Link to="/produtos/novo" className="botao botao--primario">
          Novo produto
        </Link>
      </div>

      <div className="pagina-lista__filtros">
        <FiltroBusca valor={textoBusca} onChange={setTextoBusca} />
        <FiltroCategoria categorias={categorias} valor={categoria} onChange={mudarCategoria} />
      </div>

      {status === 'carregando' && <EstadoCarregando />}
      {status === 'erro' && <EstadoErro mensagem={mensagemErro ?? 'Erro ao carregar.'} onTentarNovamente={recarregar} />}
      {status === 'sucesso' && produtos.length === 0 && <EstadoVazio termoBusca={buscaComDebounce} />}
      {status === 'sucesso' && produtos.length > 0 && (
        <>
          <TabelaProdutos produtos={produtos} onExcluir={setProdutoParaExcluir} />
          <Paginacao
            pagina={pagina}
            itensPorPagina={ITENS_POR_PAGINA}
            total={total}
            onMudarPagina={mudarPagina}
          />
        </>
      )}

      {produtoParaExcluir && (
        <ModalConfirmacao
          titulo="Excluir produto"
          descricao={`Tem certeza que deseja excluir "${produtoParaExcluir.nome}"? Essa ação não pode ser desfeita.`}
          textoConfirmar="Excluir"
          carregando={excluindo}
          onConfirmar={confirmarExclusao}
          onCancelar={() => setProdutoParaExcluir(null)}
        />
      )}
    </div>
  )
}
