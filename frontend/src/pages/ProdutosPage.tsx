export function ProdutosPage() {
  return (
    <section>
      <header className="page-header">
        <h2>Produtos e Grade</h2>
        <p>Cadastro de produto base e variacoes por cor/tamanho.</p>
      </header>

      <article className="card">
        <form className="form-grid">
          <label>
            Nome do Produto
            <input placeholder="Ex: Camiseta Basica" />
          </label>
          <label>
            Categoria
            <input placeholder="Ex: Camisetas" />
          </label>
          <label>
            Marca
            <input placeholder="Ex: ModaX" />
          </label>
          <label>
            Preco de Custo
            <input type="number" placeholder="0.00" />
          </label>
          <label>
            Margem de Lucro (%)
            <input type="number" placeholder="0" />
          </label>
          <label>
            Preco de Venda
            <input type="number" placeholder="0.00" />
          </label>
          <label>
            Cor
            <input placeholder="Ex: Azul" />
          </label>
          <label>
            Tamanho
            <input placeholder="Ex: M" />
          </label>
          <label>
            Codigo de Barras
            <input placeholder="Ex: 7890000012345" />
          </label>
          <div className="actions">
            <button type="button">Salvar Produto</button>
          </div>
        </form>
      </article>
    </section>
  )
}
