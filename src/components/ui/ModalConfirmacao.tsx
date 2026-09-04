interface ModalConfirmacaoProps {
  titulo: string
  descricao: string
  textoConfirmar?: string
  textoCancelar?: string
  carregando?: boolean
  onConfirmar: () => void
  onCancelar: () => void
}

export function ModalConfirmacao({
  titulo,
  descricao,
  textoConfirmar = 'Confirmar',
  textoCancelar = 'Cancelar',
  carregando = false,
  onConfirmar,
  onCancelar,
}: ModalConfirmacaoProps) {
  return (
    <div className="overlay" role="presentation" onClick={onCancelar}>
      <div
        className="modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        onClick={(evento) => evento.stopPropagation()}
      >
        <h2 id="modal-titulo">{titulo}</h2>
        <p>{descricao}</p>
        <div className="modal__acoes">
          <button type="button" className="botao botao--secundario" onClick={onCancelar}>
            {textoCancelar}
          </button>
          <button
            type="button"
            className="botao botao--perigo"
            onClick={onConfirmar}
            disabled={carregando}
          >
            {carregando ? 'Excluindo...' : textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  )
}
