import type { MenuItem } from '../navigation/menu'

export function MenuIcon({ type }: { type: MenuItem['icon'] }) {
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
