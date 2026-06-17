import { NavLink, Outlet } from 'react-router-dom'
import Breadcrumb from '../../components/layout/Breadcrumb'

const SUB_NAV = [
  { label: '회사소개', to: '/about/company' },
  { label: 'CEO 인사말', to: '/about/ceo' },
  { label: '비전', to: '/about/vision' },
  { label: '연혁', to: '/about/history' },
  { label: '오시는 길', to: '/about/location' },
]

export default function AboutLayout() {
  return (
    <div className="max-w-content mx-auto px-4 md:px-6 py-8 md:py-12">
      <Breadcrumb items={[{ label: '회사소개' }]} />

      {/* Mobile sub nav — 콘텐츠 위에 독립 배치 */}
      <div className="md:hidden mb-6">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {SUB_NAV.map(n => (
            <NavLink key={n.to} to={n.to}
              className={({ isActive }) =>
                `text-sm px-4 py-1.5 rounded-full whitespace-nowrap border transition-colors shrink-0 ${isActive ? 'bg-surface-2 border-hairline-strong text-ink' : 'border-hairline text-ink-subtle hover:text-ink'}`
              }>
              {n.label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex gap-10">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-44 shrink-0">
          <p className="text-xs font-medium text-ink-subtle uppercase tracking-[0.4px] mb-4">회사소개</p>
          <nav className="flex flex-col gap-1">
            {SUB_NAV.map(n => (
              <NavLink key={n.to} to={n.to}
                className={({ isActive }) =>
                  `text-sm px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-surface-2 text-ink' : 'text-ink-subtle hover:text-ink hover:bg-surface-1'}`
                }>
                {n.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* 콘텐츠 영역 */}
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
