export type UserRole = 'DONO' | 'VENDEDOR'

export type MenuChild = {
  path: string
  label: string
  onlyRole?: UserRole
}

export type MenuItem = {
  key: string
  label: string
  icon: 'gestao' | 'comercial' | 'estoque'
  children: MenuChild[]
}

export type QuickAction = {
  path: string
  label: string
  icon: 'home' | 'sale' | 'consignacao' | 'cliente'
  onlyRole?: UserRole
}

export const menuItems: MenuItem[] = [
  {
    key: 'gestao',
    label: 'Gestao',
    icon: 'gestao',
    children: [
      { path: '/inicio', label: 'Inicio' },
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

export const quickActions: QuickAction[] = [
  { path: '/inicio', label: 'Tela Inicial', icon: 'home' },
  { path: '/pdv', label: 'Nova Venda', icon: 'sale' },
  { path: '/consignacao', label: 'Nova Consignacao', icon: 'consignacao' },
  { path: '/clientes', label: 'Novo Cliente', icon: 'cliente' },
]
