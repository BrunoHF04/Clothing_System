import { NavLink, Outlet } from 'react-router-dom'

const menuItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/produtos', label: 'Produtos' },
  { path: '/estoque', label: 'Estoque' },
  { path: '/clientes', label: 'Clientes' },
  { path: '/crediario', label: 'Crediario' },
  { path: '/consignacao', label: 'Consignacao' },
  { path: '/pdv', label: 'PDV' },
]

export function AppLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1>ERP Fashion</h1>
        <p className="sidebar-subtitle">Servidor local</p>
        <nav className="menu">
          {menuItems.map((item) => (
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
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}
