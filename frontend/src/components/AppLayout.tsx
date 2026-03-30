import { useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

type MenuItem = {
  key: string
  label: string
  icon: 'gestao' | 'comercial' | 'estoque'
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
    icon: 'gestao',
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
    icon: 'comercial',
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
    icon: 'estoque',
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

function MenuIcon({ type }: { type: MenuItem['icon'] }) {
  if (type === 'gestao') {
    return (
      <svg viewBox="0 0 24 24" className="menu-icon" aria-hidden="true">
        <path d="M4 19h16" />
        <path d="M7 16V9" />
        <path d="M12 16V5" />
        <path d="M17 16v-3" />
      </svg>
    )
  }
  if (type === 'comercial') {
    return (
      <svg viewBox="0 0 24 24" className="menu-icon" aria-hidden="true">
        <path d="M4 7h16l-1 4H5L4 7Z" />
        <path d="M6 11l1 7h10l1-7" />
        <path d="M9 18a1 1 0 1 0 0.001 0" />
        <path d="M15 18a1 1 0 1 0 0.001 0" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className="menu-icon" aria-hidden="true">
      <path d="M4 8h16v10H4z" />
      <path d="M9 8V5h6v3" />
      <path d="M4 12h16" />
    </svg>
  )
}

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
                      <span className="menu-group-icon-wrap">
                        <MenuIcon type={group.icon} />
                      </span>
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
