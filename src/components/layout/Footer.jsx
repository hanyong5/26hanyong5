import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-canvas border-t border-hairline mt-24">
      <div className="max-w-content mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <p className="text-ink font-semibold mb-2">hanyong5</p>
          <p className="text-xs text-ink-subtle leading-relaxed">
            기업형 홈페이지<br />
            최고의 서비스를 제공합니다.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-ink-subtle mb-3 uppercase tracking-[0.4px]">회사</p>
          <ul className="flex flex-col gap-2">
            {[['회사소개', '/about/company'], ['CEO 인사말', '/about/ceo'], ['비전', '/about/vision'], ['연혁', '/about/history']].map(([label, to]) => (
              <li key={to}><Link to={to} className="text-xs text-ink-subtle hover:text-ink transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium text-ink-subtle mb-3 uppercase tracking-[0.4px]">서비스</p>
          <ul className="flex flex-col gap-2">
            {[['제품소개', '/products'], ['커뮤니티', '/community'], ['온라인문의', '/inquiry']].map(([label, to]) => (
              <li key={to}><Link to={to} className="text-xs text-ink-subtle hover:text-ink transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium text-ink-subtle mb-3 uppercase tracking-[0.4px]">계정</p>
          <ul className="flex flex-col gap-2">
            {[['로그인', '/login'], ['회원가입', '/register'], ['마이페이지', '/mypage']].map(([label, to]) => (
              <li key={to}><Link to={to} className="text-xs text-ink-subtle hover:text-ink transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-hairline">
        <div className="max-w-content mx-auto px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-ink-tertiary">© 2026 hanyong5. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
