import { useMemo, useState } from 'react'
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const currentLabel =
    menuItems
      .flatMap((group) => group.children)
      .find((child) => child.path === location.pathname)?.label ?? 'Sistema'

  const visibleMenuItems = useMemo(
    () =>
      menuItems
        .map((group) => ({
          ...group,
          children: group.children.filter(
            (item) => !item.onlyRole || item.onlyRole === user?.role,
          ),
        }))
        .filter((group) => group.children.length > 0),
    [user?.role],
  )

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    gestao: true,
    comercial: true,
    estoque: true,
  })

  const toggleGroup = (groupKey: string) => {
    if (isSidebarCollapsed) {
      setIsSidebarCollapsed(false)
      return
    }
    setOpenGroups((prev) => ({ ...prev, [groupKey]: !prev[groupKey] }))
  }

  return (
    <div className={isSidebarCollapsed ? 'app-shell sidebar-collapsed' : 'app-shell'}>
      <aside className="sidebar">
        <div className="sidebar-head">
          <div>
            <h1>ERP Fashion</h1>
            <p className="sidebar-subtitle">Servidor local</p>
          </div>
          <button
            type="button"
            className="sidebar-toggle"
            onClick={() => setIsSidebarCollapsed((prev) => !prev)}
            title={isSidebarCollapsed ? 'Expandir menu' : 'Colapsar menu'}
          >
            {isSidebarCollapsed ? '»' : '«'}
          </button>
        </div>
        <p className="sidebar-user">
          Perfil: <b>{user?.role}</b>
          <br />
          Usuario: <b>{user?.name}</b>
        </p>
        <nav className="menu">
          {visibleMenuItems.map((group) => {
              const isOpen = !!openGroups[group.key]
              return (
                <section key={group.key} className="menu-group">
                  <button
                    type="button"
                    className="menu-group-toggle"
                    onClick={() => toggleGroup(group.key)}
                    title={group.label}
                  >
                    <span className="menu-group-title">
                      <span>{group.icon}</span>
                      <span className="menu-group-label">{group.label}</span>
                    </span>
                    <span className="menu-group-caret">{isOpen ? '▾' : '▸'}</span>
                  </button>
                  <div className={isOpen ? 'submenu submenu-open' : 'submenu submenu-closed'}>
                    {group.children.map((item) => (
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
