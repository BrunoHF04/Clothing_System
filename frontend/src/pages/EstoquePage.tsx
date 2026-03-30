const estoqueMock = [
  { sku: 'CAM-AZ-M', produto: 'Camiseta Basica', cor: 'Azul', tamanho: 'M', disponivel: 12, consignado: 1 },
  { sku: 'CAM-PR-G', produto: 'Camiseta Basica', cor: 'Preto', tamanho: 'G', disponivel: 7, consignado: 0 },
]

export function EstoquePage() {
  return (
    <section>
      <header className="page-header">
        <h2>Estoque</h2>
        <p>Controle por SKU de grade (cor x tamanho).</p>
      </header>
      <article className="card">
        <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Produto</th>
              <th>Cor</th>
              <th>Tamanho</th>
              <th>Disponivel</th>
              <th>Consignado</th>
            </tr>
          </thead>
          <tbody>
            {estoqueMock.map((item) => (
              <tr key={item.sku}>
                <td>{item.sku}</td>
                <td>{item.produto}</td>
                <td>{item.cor}</td>
                <td>{item.tamanho}</td>
                <td>{item.disponivel}</td>
                <td>{item.consignado}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </article>
    </section>
  )
}
