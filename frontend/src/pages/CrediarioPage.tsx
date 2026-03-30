const parcelasMock = [
  { cliente: 'Maria Silva', vencimento: '2026-04-05', valor: 150, status: 'Em aberto' },
  { cliente: 'Joao Souza', vencimento: '2026-03-20', valor: 220, status: 'Atrasado' },
]

export function CrediarioPage() {
  return (
    <section>
      <header className="page-header">
        <h2>Crediario</h2>
        <p>Controle de parcelas, baixa e inadimplencia.</p>
      </header>
      <article className="card">
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Vencimento</th>
              <th>Valor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {parcelasMock.map((item) => (
              <tr key={`${item.cliente}-${item.vencimento}`}>
                <td>{item.cliente}</td>
                <td>{item.vencimento}</td>
                <td>R$ {item.valor.toFixed(2)}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  )
}
