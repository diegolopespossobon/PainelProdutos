export function EstadoCarregando() {
  return (
    <div className="estado estado--carregando" role="status">
      <span className="spinner" aria-hidden="true" />
      <p>Carregando produtos...</p>
    </div>
  )
}

export function EstadoErro({ mensagem, onTentarNovamente }: { mensagem: string; onTentarNovamente: () => void }) {
  return (
    <div className="estado estado--erro" role="alert">
      <p>{mensagem}</p>
      <button type="button" className="botao botao--secundario" onClick={onTentarNovamente}>
        Tentar novamente
      </button>
    </div>
  )
}

export function EstadoVazio({ termoBusca }: { termoBusca?: string }) {
  return (
    <div className="estado estado--vazio">
      <p>
        {termoBusca
          ? `Nenhum produto encontrado para "${termoBusca}".`
          : 'Nenhum produto cadastrado ainda.'}
      </p>
    </div>
  )
}
