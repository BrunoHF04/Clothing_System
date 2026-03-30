export function PdvPage() {
  return (
    <section>
      <header className="page-header">
        <h2>PDV</h2>
        <p>Venda rapida com leitura de codigo e fechamento por forma de pagamento.</p>
      </header>

      <div className="grid-2">
        <article className="card">
          <h3>Carrinho</h3>
          <label>
            Codigo de barras / nome
            <input placeholder="Bipe o produto ou pesquise por nome" />
          </label>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qtd</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={3}>Nenhum item adicionado.</td>
              </tr>
            </tbody>
          </table>
        </article>

        <article className="card">
          <h3>Fechamento</h3>
          <p>Total: <b>R$ 0,00</b></p>
          <div className="actions">
            <button type="button">Dinheiro</button>
            <button type="button">Cartao Debito</button>
            <button type="button">Cartao Credito</button>
            <button type="button">PIX</button>
            <button type="button">Crediario</button>
          </div>
        </article>
      </div>
    </section>
  )
}
