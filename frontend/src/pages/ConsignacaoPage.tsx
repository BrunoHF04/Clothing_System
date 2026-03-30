const consignacoesMock = [
  { id: 'CSG-001', cliente: 'Ana Paula', retirada: '2026-03-27', devolucao: '2026-03-30', status: 'Atrasada' },
  { id: 'CSG-002', cliente: 'Beatriz Lima', retirada: '2026-03-29', devolucao: '2026-04-02', status: 'Aberta' },
]

export function ConsignacaoPage() {
  return (
    <section>
      <header className="page-header">
        <h2>Consignacao</h2>
        <p>Saida de sacola, retorno parcial e fechamento com venda.</p>
      </header>

      <div className="grid-2">
        <article className="card">
          <h3>Nova Consignacao</h3>
          <form className="form-grid">
            <label>
              Cliente
              <input placeholder="Selecione o cliente" />
            </label>
            <label>
              Data de Devolucao
              <input type="date" />
            </label>
            <label>
              SKU ou Codigo de Barras
              <input placeholder="Bipe o item aqui" />
            </label>
            <div className="actions">
              <button type="button">Adicionar Item</button>
              <button type="button">Abrir Sacola</button>
            </div>
          </form>
        </article>

        <article className="card">
          <h3>Fechar Consignacao</h3>
          <p>Marque itens como devolvidos ou vendidos no retorno do cliente.</p>
          <div className="actions">
            <button type="button">Marcar Devolvidos</button>
            <button type="button">Gerar Venda dos Itens</button>
          </div>
        </article>
      </div>

      <article className="card">
        <h3>Alertas de Prazo</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Retirada</th>
              <th>Devolucao</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {consignacoesMock.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.cliente}</td>
                <td>{item.retirada}</td>
                <td>{item.devolucao}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  )
}
