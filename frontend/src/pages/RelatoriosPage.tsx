const ranking = [
  { item: 'Camiseta Basica Azul M', vendas: 18 },
  { item: 'Jeans Skinny 40', vendas: 11 },
  { item: 'Vestido Floral P', vendas: 7 },
]

export function RelatoriosPage() {
  return (
    <section>
      <header className="page-header">
        <h2>Relatorios</h2>
        <p>Faturamento, inadimplencia, giro de estoque e lucro liquido.</p>
      </header>
      <div className="grid-4">
        <article className="card">
          <h3>Faturamento Mensal</h3>
          <strong>R$ 0,00</strong>
        </article>
        <article className="card">
          <h3>Inadimplencia</h3>
          <strong>R$ 0,00</strong>
        </article>
        <article className="card">
          <h3>Lucro Liquido</h3>
          <strong>R$ 0,00</strong>
        </article>
        <article className="card">
          <h3>Ticket Medio</h3>
          <strong>R$ 0,00</strong>
        </article>
      </div>
      <article className="card">
        <h3>Giro de Estoque (Top itens)</h3>
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Vendas</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((row) => (
              <tr key={row.item}>
                <td>{row.item}</td>
                <td>{row.vendas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  )
}
