import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { ConsignacaoPage } from './pages/ConsignacaoPage'
import { CrediarioPage } from './pages/CrediarioPage'
import { DashboardPage } from './pages/DashboardPage'
import { EstoquePage } from './pages/EstoquePage'
import { ClientesPage } from './pages/ClientesPage'
import { PdvPage } from './pages/PdvPage'
import { ProdutosPage } from './pages/ProdutosPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/produtos" element={<ProdutosPage />} />
        <Route path="/estoque" element={<EstoquePage />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/crediario" element={<CrediarioPage />} />
        <Route path="/consignacao" element={<ConsignacaoPage />} />
        <Route path="/pdv" element={<PdvPage />} />
      </Route>
    </Routes>
  )
}

export default App
