import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="cabecalho">
      <Link to="/" className="cabecalho__marca">
        Painel de Produtos
      </Link>
    </header>
  )
}
