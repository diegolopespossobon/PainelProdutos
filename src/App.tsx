import { Route, Routes } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { ListaProdutosPage } from './pages/ListaProdutosPage'
import { DetalheProdutoPage } from './pages/DetalheProdutoPage'
import { NovoProdutoPage } from './pages/NovoProdutoPage'
import { EditarProdutoPage } from './pages/EditarProdutoPage'

export function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__conteudo">
        <Routes>
          <Route path="/" element={<ListaProdutosPage />} />
          <Route path="/produtos/novo" element={<NovoProdutoPage />} />
          <Route path="/produtos/:id" element={<DetalheProdutoPage />} />
          <Route path="/produtos/:id/editar" element={<EditarProdutoPage />} />
        </Routes>
      </main>
    </div>
  )
}
