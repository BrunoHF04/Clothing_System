import { useEffect, useState } from 'react'

type HealthStatus = {
  status: string
  service: string
  db: string
}

type Summary = {
  faturamentoDiario: number
  inadimplencia: number
  itensEmConsignacao: number
  caixaAberto: boolean
  consignacoesAtrasadas: number
}

export function DashboardPage() {
  const [health, setHealth] = useState<HealthStatus | null>(null)
  const [summary, setSummary] = useState<Summary | null>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('http://localhost:3333/health')
        const data = (await response.json()) as HealthStatus
        setHealth(data)
        const summaryResponse = await fetch('http://localhost:3333/dashboard/summary')
        const summaryData = (await summaryResponse.json()) as Summary
        setSummary(summaryData)
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
        <article className="card stat-card">
          <h3>Faturamento Diario</h3>
          <strong className="stat-value">R$ {summary?.faturamentoDiario.toFixed(2) ?? '0,00'}</strong>
        </article>
        <article className="card stat-card">
          <h3>Inadimplencia</h3>
          <strong className="stat-value">R$ {summary?.inadimplencia.toFixed(2) ?? '0,00'}</strong>
        </article>
        <article className="card stat-card">
          <h3>Itens em Consignacao</h3>
          <strong className="stat-value">{summary?.itensEmConsignacao ?? 0} pecas</strong>
        </article>
        <article className="card stat-card">
          <h3>Caixa Aberto</h3>
          <strong className="stat-value">{summary?.caixaAberto ? 'Aberto' : 'Fechado'}</strong>
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
        <p>
          Consignacoes atrasadas:{' '}
          <span className="status-pill status-pill-warn">{summary?.consignacoesAtrasadas ?? 0}</span>
        </p>
        {error && <p className="error">{error}</p>}
      </article>
    </section>
  )
}
