interface PaginacaoProps {
  pagina: number
  itensPorPagina: number
  total: number
  onMudarPagina: (novaPagina: number) => void
}

export function Paginacao({ pagina, itensPorPagina, total, onMudarPagina }: PaginacaoProps) {
  const totalPaginas = Math.max(1, Math.ceil(total / itensPorPagina))
  const inicio = total === 0 ? 0 : (pagina - 1) * itensPorPagina + 1
  const fim = Math.min(pagina * itensPorPagina, total)

  return (
    <div className="paginacao">
      <span className="paginacao__resumo">
        {total === 0 ? 'Nenhum registro' : `${inicio}–${fim} de ${total}`}
      </span>
      <div className="paginacao__controles">
        <button
          type="button"
          className="botao botao--secundario"
          onClick={() => onMudarPagina(pagina - 1)}
          disabled={pagina <= 1}
        >
          Anterior
        </button>
        <span className="paginacao__pagina-atual">
          Página {pagina} de {totalPaginas}
        </span>
        <button
          type="button"
          className="botao botao--secundario"
          onClick={() => onMudarPagina(pagina + 1)}
          disabled={pagina >= totalPaginas}
        >
          Próxima
        </button>
      </div>
    </div>
  )
}
