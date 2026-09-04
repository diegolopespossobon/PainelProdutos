interface FiltroBuscaProps {
  valor: string
  onChange: (valor: string) => void
}

export function FiltroBusca({ valor, onChange }: FiltroBuscaProps) {
  return (
    <label className="campo-busca">
      <span className="sr-only">Buscar produto por nome</span>
      <input
        type="search"
        placeholder="Buscar por nome..."
        value={valor}
        onChange={(evento) => onChange(evento.target.value)}
      />
    </label>
  )
}
