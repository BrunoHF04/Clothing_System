import { useEffect, useState } from 'react'

type HealthStatus = {
  status: string
  service: string
  db: string
}

export function DashboardPage() {
  const [health, setHealth] = useState<HealthStatus | null>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('http://localhost:3333/health')
        const data = (await response.json()) as HealthStatus
        setHealth(data)
      } catch {
        setError('Nao foi possivel conectar na API em localhost:3333.')
      }
    }

    void load()
  }, [])

  return (
    <section>
      <header className="page-header">
        <h2>Dashboard</h2>
        <p>Visao geral operacional da loja.</p>
      </header>

      <div className="grid-4">
        <article className="card">
          <h3>Faturamento Diario</h3>
          <strong>R$ 0,00</strong>
        </article>
        <article className="card">
          <h3>Inadimplencia</h3>
          <strong>R$ 0,00</strong>
        </article>
        <article className="card">
          <h3>Itens em Consignacao</h3>
          <strong>0 pecas</strong>
        </article>
        <article className="card">
          <h3>Caixa Aberto</h3>
          <strong>Fechado</strong>
        </article>
      </div>

      <article className="card">
        <h3>Status da API</h3>
        {health && (
          <p>
            Servico: <b>{health.service}</b> | API: <b>{health.status}</b> | DB:{' '}
            <b>{health.db}</b>
          </p>
        )}
        {error && <p className="error">{error}</p>}
      </article>
    </section>
  )
}
