const movimentacoes = [
  { data: '2026-03-30', sku: 'CAM-AZ-M', tipo: 'AVARIA', quantidade: -1, motivo: 'Defeito de costura' },
  { data: '2026-03-30', sku: 'CAM-PR-G', tipo: 'AJUSTE', quantidade: 2, motivo: 'Contagem inventario' },
]

export function MovimentacoesPage() {
  return (
    <section>
      <header className="page-header">
        <h2>Movimentacoes Manuais</h2>
        <p>Registro de perdas, avarias e ajustes de estoque.</p>
      </header>
      <article className="card">
        <form className="form-grid">
          <label>
            SKU
            <input placeholder="Ex: CAM-AZ-M" />
          </label>
          <label>
            Tipo
            <input placeholder="AJUSTE | AVARIA | PERDA" />
          </label>
          <label>
            Quantidade
            <input type="number" placeholder="-1 ou 2" />
          </label>
          <label>
            Motivo
            <input placeholder="Descricao da movimentacao" />
          </label>
          <div className="actions">
            <button type="button">Registrar</button>
          </div>
        </form>
      </article>

      <article className="card">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>SKU</th>
              <th>Tipo</th>
              <th>Qtd</th>
              <th>Motivo</th>
            </tr>
          </thead>
          <tbody>
            {movimentacoes.map((item) => (
              <tr key={`${item.data}-${item.sku}-${item.tipo}`}>
                <td>{item.data}</td>
                <td>{item.sku}</td>
                <td>{item.tipo}</td>
                <td>{item.quantidade}</td>
                <td>{item.motivo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  )
}
