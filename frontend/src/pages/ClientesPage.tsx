export function ClientesPage() {
  return (
    <section>
      <header className="page-header">
        <h2>Clientes</h2>
        <p>Cadastro para venda, crediario e consignacao.</p>
      </header>
      <article className="card">
        <form className="form-grid">
          <label>
            Nome Completo
            <input placeholder="Nome do cliente" />
          </label>
          <label>
            Documento
            <input placeholder="CPF/RG" />
          </label>
          <label>
            Telefone
            <input placeholder="(00) 00000-0000" />
          </label>
          <label>
            Limite de Credito
            <input type="number" placeholder="0.00" />
          </label>
          <div className="actions">
            <button type="button">Salvar Cliente</button>
          </div>
        </form>
      </article>
    </section>
  )
}
