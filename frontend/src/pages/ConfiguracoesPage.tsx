export function ConfiguracoesPage() {
  return (
    <section>
      <header className="page-header">
        <h2>Configuracoes Gerais</h2>
        <p>Parametros globais de crediario, consignacao e permissao.</p>
      </header>
      <article className="card">
        <form className="form-grid">
          <label>
            Juros diario por atraso (%)
            <input type="number" defaultValue="0.33" />
          </label>
          <label>
            Prazo padrao consignacao (dias)
            <input type="number" defaultValue="3" />
          </label>
          <label>
            Limite minimo de credito
            <input type="number" defaultValue="100.00" />
          </label>
          <label>
            Permitir venda sem estoque
            <input placeholder="NAO" />
          </label>
          <div className="actions">
            <button type="button">Salvar Configuracoes</button>
          </div>
        </form>
      </article>
    </section>
  )
}
