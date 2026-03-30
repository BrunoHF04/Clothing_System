import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { RoleRoute } from './components/RoleRoute'
import { AppLayout } from './components/AppLayout'
import { BackupPage } from './pages/BackupPage'
import { CaixaPage } from './pages/CaixaPage'
import { ComprasPage } from './pages/ComprasPage'
import { ConsignacaoPage } from './pages/ConsignacaoPage'
import { ConfiguracoesPage } from './pages/ConfiguracoesPage'
import { CrediarioPage } from './pages/CrediarioPage'
import { DashboardPage } from './pages/DashboardPage'
import { EtiquetasPage } from './pages/EtiquetasPage'
import { EstoquePage } from './pages/EstoquePage'
import { ClientesPage } from './pages/ClientesPage'
import { LoginPage } from './pages/LoginPage'
import { MovimentacoesPage } from './pages/MovimentacoesPage'
import { PdvPage } from './pages/PdvPage'
import { ProdutosPage } from './pages/ProdutosPage'
import { RelatoriosPage } from './pages/RelatoriosPage'
import { HomePage } from './pages/HomePage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/inicio" replace />} />
          <Route path="/inicio" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/produtos" element={<ProdutosPage />} />
          <Route path="/estoque" element={<EstoquePage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/crediario" element={<CrediarioPage />} />
          <Route path="/consignacao" element={<ConsignacaoPage />} />
          <Route path="/pdv" element={<PdvPage />} />
          <Route path="/caixa" element={<CaixaPage />} />
          <Route path="/compras" element={<ComprasPage />} />
          <Route path="/movimentacoes" element={<MovimentacoesPage />} />
          <Route path="/etiquetas" element={<EtiquetasPage />} />
          <Route path="/relatorios" element={<RelatoriosPage />} />
          <Route path="/backup" element={<BackupPage />} />
          <Route element={<RoleRoute allowedRoles={['DONO']} />}>
            <Route path="/configuracoes" element={<ConfiguracoesPage />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/inicio" replace />} />
    </Routes>
  )
}

export default App
