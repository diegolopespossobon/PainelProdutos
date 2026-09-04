import type { ReactNode } from 'react'

interface CampoFormularioProps {
  label: string
  htmlFor: string
  erro?: string
  children: ReactNode
}

export function CampoFormulario({ label, htmlFor, erro, children }: CampoFormularioProps) {
  return (
    <div className="campo-formulario">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {erro && (
        <span className="campo-formulario__erro" role="alert">
          {erro}
        </span>
      )}
    </div>
  )
}
