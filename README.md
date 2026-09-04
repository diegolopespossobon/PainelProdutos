# Painel de Produtos

Painel de gerenciamento de produtos em React + TypeScript, consumindo a API
fake (`json-server`) fornecida no teste prático.

## Stack

- React 18 + TypeScript
- Vite
- React Router (URLs refletem página, busca e categoria)
- Vitest + React Testing Library

## Como rodar

### 1. Instalar as dependências

```bash
npm install
```

### 2. Subir a API fake

Em um terminal, na raiz do projeto (o `db.json` já está aqui):

```bash
npx json-server@0.17.4 --watch db.json --port 3001
```

Isso deixa a API disponível em `http://localhost:3001/produtos`.

### 3. Rodar a aplicação

Em outro terminal:

```bash
npm run dev
```

Acesse `http://localhost:5173`.

### 4. Rodar os testes

```bash
npm run test
```

## Estrutura do projeto

```
src/
  components/
    layout/        -> cabeçalho
    produtos/       -> tabela, filtros, paginação, estados de loading/erro/vazio
    produto-form/    -> formulário de criar/editar + validação (função pura)
    ui/             -> modal de confirmação, genérico e reutilizável
  context/          -> ToastContext (feedback de sucesso/erro)
  hooks/            -> useProdutos, useProduto, useCategorias, useDebounce
  pages/            -> as 4 telas (lista, detalhe, novo, editar)
  services/         -> apiClient.ts (fetch wrapper) e produtosService.ts
                       (único lugar que conhece os endpoints de /produtos)
  types/            -> tipos do domínio Produto e da API
  tests/            -> testes de validação e de um componente com RTL
```

Todas as chamadas HTTP passam por `services/produtosService.ts`. Nenhum
componente usa `fetch` diretamente.

## Funcionalidades implementadas

- Listagem com busca por nome (com debounce de 400ms), filtro por categoria
  e paginação real via `_page`/`_limit`, mostrando o total vindo do header
  `X-Total-Count`.
- Estados de carregando, erro (com botão de tentar novamente) e "nenhum
  resultado" tratados separadamente.
- Detalhe do produto em tela própria.
- Criar/editar em formulário único, com validação (nome mín. 3 caracteres,
  preço > 0, estoque >= 0) e mensagens de erro por campo.
- Feedback de sucesso/erro via toast após salvar, editar ou excluir.
- Exclusão com modal de confirmação.
- Página, busca e categoria refletidos na URL (dá pra recarregar ou
  compartilhar o link e manter o filtro).

## O que eu faria com mais tempo

- Cache/otimismo na lista após criar ou editar (hoje ela só é recarregada
  de fato ao navegar de volta para `/`; a UX já funciona, mas dava pra
  evitar uma request extra).
- Mais testes de componente (o formulário e a página de lista são os
  candidatos naturais, além do teste de validação e do teste de
  `FiltroBusca` já incluídos).
- Ordenação por coluna na tabela.
- Um combobox de categoria mais amigável no formulário, em vez do
  input + datalist atual (funciona bem, mas um select com opção de criar
  categoria nova seria mais claro).

## Sobre a categoria no formulário

O campo de categoria é um texto livre com sugestões (`datalist`) baseadas
nas categorias já existentes, para não travar o cadastro numa lista fixa
caso surja uma categoria nova.
