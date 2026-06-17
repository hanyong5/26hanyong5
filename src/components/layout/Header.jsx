import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'

const NAV = [
  { label: '회사소개', to: '/about/company' },
  { label: '제품소개', to: '/products' },
  { label: '커뮤니티', to: '/community' },
  { label: '온라인문의', to: '/inquiry' },
]

export default function Header() {
  const { user, isAdmin, signOut } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-canvas border-b border-hairline h-14 flex items-center">
      <div className="max-w-content mx-auto px-6 w-full flex items-center justify-between">
        <Link to="/" className="text-ink font-semibold text-lg tracking-tight">
          hanyong5
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV.map(n => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `text-sm transition-colors ${isActive ? 'text-ink' : 'text-ink-subtle hover:text-ink'}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="btn-tertiary text-sm">관리자</Link>
              )}
              <Link to="/mypage" className="btn-secondary text-sm">마이페이지</Link>
              <button onClick={handleSignOut} className="btn-secondary text-sm">로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary">로그인</Link>
              <Link to="/register" className="btn-primary">회원가입</Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-ink-subtle" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-14 left-0 right-0 bg-surface-1 border-b border-hairline p-4 flex flex-col gap-3 md:hidden">
          {NAV.map(n => (
            <NavLink key={n.to} to={n.to} onClick={() => setMenuOpen(false)}
              className="text-sm text-ink-subtle hover:text-ink">
              {n.label}
            </NavLink>
          ))}
          <hr className="border-hairline" />
          {user ? (
            <>
              <Link to="/mypage" onClick={() => setMenuOpen(false)} className="text-sm text-ink-subtle">마이페이지</Link>
              <button onClick={() => { handleSignOut(); setMenuOpen(false) }} className="text-sm text-left text-ink-subtle">로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm text-ink-subtle">로그인</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="text-sm text-ink-subtle">회원가입</Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}
