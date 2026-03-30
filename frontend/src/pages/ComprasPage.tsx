export function ComprasPage() {
  return (
    <section>
      <header className="page-header">
        <h2>Compras de Fornecedor</h2>
        <p>Entrada de mercadorias e atualizacao de estoque por grade.</p>
      </header>
      <article className="card">
        <form className="form-grid">
          <label>
            Fornecedor
            <input placeholder="Nome do fornecedor" />
          </label>
          <label>
            Numero da nota
            <input placeholder="NF-e" />
          </label>
          <label>
            Data da compra
            <input type="date" />
          </label>
          <label>
            SKU
            <input placeholder="Ex: CAM-AZ-M" />
          </label>
          <label>
            Quantidade
            <input type="number" placeholder="0" />
          </label>
          <label>
            Custo unitario
            <input type="number" placeholder="0.00" />
          </label>
          <div className="actions">
            <button type="button">Adicionar Item</button>
            <button type="button">Lancar Entrada no Estoque</button>
          </div>
        </form>
      </article>
    </section>
  )
}
