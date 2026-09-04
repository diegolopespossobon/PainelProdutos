import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { FiltroBusca } from '../components/produtos/FiltroBusca'

describe('FiltroBusca', () => {
  it('mostra o valor atual e avisa a cada mudança', async () => {
    const onChange = vi.fn()
    const usuario = userEvent.setup()

    render(<FiltroBusca valor="" onChange={onChange} />)

    const campo = screen.getByPlaceholderText('Buscar por nome...')
    // O campo é controlado e o teste não realimenta o valor, então cada
    // tecla dispara onChange a partir do valor vazio original.
    await usuario.type(campo, 'sd')

    expect(onChange).toHaveBeenCalledWith('s')
    expect(onChange).toHaveBeenCalledWith('d')
    expect(onChange).toHaveBeenCalledTimes(2)
  })
})
