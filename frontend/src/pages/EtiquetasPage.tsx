export function EtiquetasPage() {
  return (
    <section>
      <header className="page-header">
        <h2>Etiquetas</h2>
        <p>Geracao e impressao de codigo de barras por SKU.</p>
      </header>
      <article className="card">
        <form className="form-grid">
          <label>
            SKU / Codigo de barras
            <input placeholder="Ex: CAM-AZ-M ou 7890000012345" />
          </label>
          <label>
            Quantidade de etiquetas
            <input type="number" placeholder="1" />
          </label>
          <label>
            Modelo
            <input placeholder="Padrão 3x1" />
          </label>
          <div className="actions">
            <button type="button">Gerar Etiquetas</button>
            <button type="button">Imprimir</button>
          </div>
        </form>
      </article>
    </section>
  )
}
