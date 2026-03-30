import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

type MenuItem = {
  key: string
  label: string
  icon: string
  children: Array<{
    path: string
    label: string
    onlyRole?: 'DONO' | 'VENDEDOR'
  }>
}

type QuickAction = {
  path: string
  label: string
  onlyRole?: 'DONO' | 'VENDEDOR'
}

const menuItems: MenuItem[] = [
  {
    key: 'gestao',
    label: 'Gestao',
    icon: '📊',
    children: [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/relatorios', label: 'Relatorios' },
      { path: '/backup', label: 'Backup' },
      { path: '/configuracoes', label: 'Configuracoes', onlyRole: 'DONO' },
    ],
  },
  {
    key: 'comercial',
    label: 'Comercial',
    icon: '🛍️',
    children: [
      { path: '/pdv', label: 'PDV' },
      { path: '/caixa', label: 'Caixa' },
      { path: '/consignacao', label: 'Consignacao' },
      { path: '/crediario', label: 'Crediario' },
      { path: '/clientes', label: 'Clientes' },
    ],
  },
  {
    key: 'estoque',
    label: 'Estoque',
    icon: '📦',
    children: [
      { path: '/produtos', label: 'Produtos e Grade' },
      { path: '/estoque', label: 'Saldo de Estoque' },
      { path: '/compras', label: 'Compras' },
      { path: '/movimentacoes', label: 'Movimentacoes' },
      { path: '/etiquetas', label: 'Etiquetas' },
    ],
  },
]

const quickActions: QuickAction[] = [
  { path: '/pdv', label: 'Nova Venda' },
  { path: '/consignacao', label: 'Nova Consignacao' },
  { path: '/clientes', label: 'Novo Cliente' },
]

export function AppLayout() {
  const { user, logout } = useAuth()
  const location = useLocation()

  const currentLabel =
    menuItems
      .flatMap((group) => group.children)
      .find((child) => child.path === location.pathname)?.label ?? 'Sistema'

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
            .map((group) => {
              const visibleChildren = group.children.filter(
                (item) => !item.onlyRole || item.onlyRole === user?.role,
              )
              if (visibleChildren.length === 0) {
                return null
              }
              return (
                <section key={group.key} className="menu-group">
                  <p className="menu-group-title">
                    <span>{group.icon}</span> {group.label}
                  </p>
                  <div className="submenu">
                    {visibleChildren.map((item) => (
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
                  </div>
                </section>
              )
            })}
        </nav>
        <button type="button" className="logout-btn" onClick={logout}>
          Sair
        </button>
      </aside>
      <main className="content">
        <header className="topbar">
          <div>
            <p className="topbar-breadcrumb">ERP Fashion / {currentLabel}</p>
            <h2 className="topbar-title">{currentLabel}</h2>
          </div>
          <div className="topbar-actions">
            {quickActions
              .filter((action) => !action.onlyRole || action.onlyRole === user?.role)
              .map((action) => (
                <NavLink key={action.path} to={action.path} className="quick-action">
                  {action.label}
                </NavLink>
              ))}
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  )
}
