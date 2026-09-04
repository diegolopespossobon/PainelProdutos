import { useEffect, useState } from 'react'
import { produtosService } from '../services/produtosService'

export function useCategorias() {
  const [categorias, setCategorias] = useState<string[]>([])

  useEffect(() => {
    let cancelado = false
    produtosService
      .listarCategorias()
      .then((resultado) => {
        if (!cancelado) setCategorias(resultado)
      })
      .catch(() => {
        // Filtro de categoria é auxiliar: se falhar, a lista de produtos
        // continua funcionando sem ele.
      })
    return () => {
      cancelado = true
    }
  }, [])

  return categorias
}
