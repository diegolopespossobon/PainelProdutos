// Ponto único de configuração da API. Se a porta ou o host mudarem,
// é aqui (e só aqui) que se ajusta.
const BASE_URL = 'http://localhost:3001'

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
}

// Wrapper fino sobre fetch: monta a URL, serializa o body, trata erro
// HTTP como exceção e devolve o header X-Total-Count quando existir
// (o json-server usa esse header para informar o total em listas paginadas).
async function request<T>(
  path: string,
  { method = 'GET', body }: RequestOptions = {}
): Promise<{ data: T; totalCount: number | null }> {
  let response: Response
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError(
      'Não foi possível conectar à API. Verifique se o json-server está rodando em localhost:3001.',
      0
    )
  }

  if (!response.ok) {
    throw new ApiError(`Erro na API: ${response.status}`, response.status)
  }

  const totalCountHeader = response.headers.get('X-Total-Count')
  const totalCount = totalCountHeader ? Number(totalCountHeader) : null

  // DELETE do json-server responde 200 com corpo "{}"
  const data = (await response.json().catch(() => null)) as T

  return { data, totalCount }
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path, { method: 'GET' }),
  post: <T>(path: string, body: unknown) => request<T>(path, { method: 'POST', body }),
  put: <T>(path: string, body: unknown) => request<T>(path, { method: 'PUT', body }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
}
