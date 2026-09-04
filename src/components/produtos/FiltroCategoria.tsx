interface FiltroCategoriaProps {
  categorias: string[]
  valor: string
  onChange: (valor: string) => void
}

export function FiltroCategoria({ categorias, valor, onChange }: FiltroCategoriaProps) {
  return (
    <label className="campo-categoria">
      <span className="sr-only">Filtrar por categoria</span>
      <select value={valor} onChange={(evento) => onChange(evento.target.value)}>
        <option value="">Todas as categorias</option>
        {categorias.map((categoria) => (
          <option key={categoria} value={categoria}>
            {categoria}
          </option>
        ))}
      </select>
    </label>
  )
}
