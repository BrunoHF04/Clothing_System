export function CaixaPage() {
  return (
    <section>
      <header className="page-header">
        <h2>Fluxo de Caixa</h2>
        <p>Abertura, sangria e fechamento do caixa do dia.</p>
      </header>

      <div className="grid-3">
        <article className="card">
          <h3>Abertura</h3>
          <label>
            Valor inicial
            <input type="number" placeholder="0.00" />
          </label>
          <button type="button">Abrir Caixa</button>
        </article>
        <article className="card">
          <h3>Sangria</h3>
          <label>
            Valor da retirada
            <input type="number" placeholder="0.00" />
          </label>
          <label>
            Motivo
            <input placeholder="Despesa miuda" />
          </label>
          <button type="button">Registrar Sangria</button>
        </article>
        <article className="card">
          <h3>Fechamento</h3>
          <label>
            Valor em caixa
            <input type="number" placeholder="0.00" />
          </label>
          <button type="button">Fechar Caixa</button>
        </article>
      </div>
    </section>
  )
}
