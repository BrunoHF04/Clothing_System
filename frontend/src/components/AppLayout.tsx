import { useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { MenuIcon } from './MenuIcon'
import { menuItems, quickActions } from '../navigation/menu'

function QuickActionIcon({ type }: { type: 'home' | 'sale' | 'consignacao' | 'cliente' }) {
  if (type === 'home') {
    return (
      <svg viewBox="0 0 24 24" className="quick-action-icon" aria-hidden="true">
        <path d="M4 10.5 12 4l8 6.5" />
        <path d="M6.5 9.5V20h11V9.5" />
      </svg>
    )
  }
  if (type === 'sale') {
    return (
      <svg viewBox="0 0 24 24" className="quick-action-icon" aria-hidden="true">
        <path d="M3.5 7.5h17l-1 4H4.5l-1-4Z" />
        <path d="M5.5 11.5 7 18h10l1.5-6.5" />
        <path d="M9 18.5h.01M15 18.5h.01" />
      </svg>
    )
  }
  if (type === 'consignacao') {
    return (
      <svg viewBox="0 0 24 24" className="quick-action-icon" aria-hidden="true">
        <path d="M6 8h12v11H6z" />
        <path d="M9 8V6.5A3 3 0 0 1 12 4a3 3 0 0 1 3 2.5V8" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className="quick-action-icon" aria-hidden="true">
      <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M5 19a7 7 0 0 1 14 0" />
    </svg>
  )
}

export function AppLayout() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true)

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
    gestao: false,
    comercial: false,
    estoque: false,
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
            <h1>Clothing System</h1>
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
            <p className="topbar-breadcrumb">Clothing System / {currentLabel}</p>
            <h2 className="topbar-title">{currentLabel}</h2>
          </div>
          <div className="topbar-actions">
            {quickActions
              .filter((action) => !action.onlyRole || action.onlyRole === user?.role)
              .map((action) => (
                <NavLink
                  key={action.path}
                  to={action.path}
                  className="quick-action"
                  title={action.label}
                  aria-label={action.label}
                >
                  <QuickActionIcon type={action.icon} />
                </NavLink>
              ))}
          </div>
        </header>
        <div key={location.pathname} className="page-transition">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
