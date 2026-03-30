import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

type MenuItem = {
  path: string
  label: string
  onlyRole?: 'DONO' | 'VENDEDOR'
}

const menuItems: MenuItem[] = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/caixa', label: 'Caixa' },
  { path: '/produtos', label: 'Produtos' },
  { path: '/estoque', label: 'Estoque' },
  { path: '/compras', label: 'Compras' },
  { path: '/movimentacoes', label: 'Movimentacoes' },
  { path: '/etiquetas', label: 'Etiquetas' },
  { path: '/clientes', label: 'Clientes' },
  { path: '/crediario', label: 'Crediario' },
  { path: '/consignacao', label: 'Consignacao' },
  { path: '/pdv', label: 'PDV' },
  { path: '/relatorios', label: 'Relatorios' },
  { path: '/backup', label: 'Backup' },
  { path: '/configuracoes', label: 'Configuracoes', onlyRole: 'DONO' },
]

export function AppLayout() {
  const { user, logout } = useAuth()

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1>ERP Fashion</h1>
        <p className="sidebar-subtitle">Servidor local</p>
        <p className="sidebar-user">
          Perfil: <b>{user?.role}</b>
          <br />
          Usuario: <b>{user?.name}</b>
        </p>
        <nav className="menu">
          {menuItems
            .filter((item) => !item.onlyRole || item.onlyRole === user?.role)
            .map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? 'menu-link menu-link-active' : 'menu-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button type="button" className="logout-btn" onClick={logout}>
          Sair
        </button>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}
