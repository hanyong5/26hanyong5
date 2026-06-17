import { NavLink, Outlet } from 'react-router-dom'

const ADMIN_NAV = [
  { label: '회원관리', to: '/admin/members' },
  { label: '제품관리', to: '/admin/products' },
  { label: '게시판관리', to: '/admin/posts' },
  { label: '문의관리', to: '/admin/inquiries' },
  { label: '사이트설정', to: '/admin/settings' },
]

export default function AdminLayout() {
  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        <span className="badge bg-primary/20 text-primary">Admin</span>
        <h1 className="headline">관리자 페이지</h1>
      </div>
      <div className="flex gap-8">
        <aside className="w-44 shrink-0">
          <nav className="flex flex-col gap-1">
            {ADMIN_NAV.map(n => (
              <NavLink key={n.to} to={n.to}
                className={({ isActive }) =>
                  `text-sm px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-surface-2 text-ink' : 'text-ink-subtle hover:text-ink hover:bg-surface-1'}`
                }>
                {n.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
