export function BackupPage() {
  return (
    <section>
      <header className="page-header">
        <h2>Backup Automatico</h2>
        <p>Configuracao e historico do backup diario local/externo/nuvem.</p>
      </header>
      <article className="card">
        <form className="form-grid">
          <label>
            Horario do backup diario
            <input type="time" defaultValue="23:30" />
          </label>
          <label>
            Pasta local
            <input placeholder="D:/Backups/FashionERP" />
          </label>
          <label>
            Destino externo/nuvem
            <input placeholder="E:/Backup ou pasta sync cloud" />
          </label>
          <div className="actions">
            <button type="button">Salvar Configuracao</button>
            <button type="button">Executar Backup Agora</button>
          </div>
        </form>
      </article>
      <article className="card">
        <h3>Ultimas execucoes</h3>
        <table>
          <thead>
            <tr>
              <th>Data/Hora</th>
              <th>Status</th>
              <th>Arquivo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>-</td>
              <td>Sem execucoes</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  )
}
