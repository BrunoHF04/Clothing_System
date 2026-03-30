import { useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { MenuIcon } from '../components/MenuIcon'
import { menuItems, type MenuItem } from '../navigation/menu'

export function HomePage() {
  const { user } = useAuth()
  const [query, setQuery] = useState('')
  const [selectedGroup, setSelectedGroup] = useState<MenuItem | null>(null)

  const visibleGroups = useMemo(
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

  const normalizedQuery = query.trim().toLowerCase()
  const foundChildren = useMemo(
    () =>
      visibleGroups.flatMap((group) =>
        group.children
          .filter(
            (item) =>
              item.label.toLowerCase().includes(normalizedQuery) ||
              group.label.toLowerCase().includes(normalizedQuery),
          )
          .map((item) => ({
            ...item,
            group: group.label,
          })),
      ),
    [normalizedQuery, visibleGroups],
  )

  return (
    <section className="home-shell">
      <header className="home-hero">
        <h1>
          Clothing System
        </h1>
        <p>Centralize sua gestao e encontre telas rapidamente.</p>
      </header>

      <article className="home-search-card">
        <label className="search-label">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Encontrar tela..."
          />
        </label>
        {normalizedQuery && (
          <div className="search-results">
            {foundChildren.length > 0 ? (
              foundChildren.map((item) => (
                <NavLink key={item.path} to={item.path} className="search-result-link">
                  <strong>{item.label}</strong>
                  <span>{item.group}</span>
                </NavLink>
              ))
            ) : (
              <p className="search-empty">Nenhuma tela encontrada para esta busca.</p>
            )}
          </div>
        )}
      </article>

      <div className="module-grid home-module-grid">
        {visibleGroups.map((group) => (
          <article
            key={group.key}
            className="module-card modern-module-card clickable-module-card"
            onClick={() => setSelectedGroup(group)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                setSelectedGroup(group)
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Abrir submenu de ${group.label}`}
          >
            <div className="module-card-header">
              <span className="module-icon-badge">
                <MenuIcon type={group.icon} />
              </span>
              <div>
                <h3>{group.label}</h3>
                <p>{group.children.length} telas disponiveis</p>
              </div>
              <span className="module-chevron">›</span>
            </div>
          </article>
        ))}
      </div>

      {selectedGroup && (
        <div className="modal-overlay" onClick={() => setSelectedGroup(null)}>
          <div className="modal-card modern-modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h3>Submenus de {selectedGroup.label}</h3>
              <button
                type="button"
                className="modal-close-icon-btn"
                onClick={() => setSelectedGroup(null)}
                aria-label="Fechar modal"
                title="Fechar"
              >
                ×
              </button>
            </div>
            <div className="modal-links">
              {selectedGroup.children.map((child) => (
                <NavLink
                  key={child.path}
                  to={child.path}
                  className="modal-link"
                  onClick={() => setSelectedGroup(null)}
                >
                  {child.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
