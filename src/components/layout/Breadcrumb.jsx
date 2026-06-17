import { Link } from 'react-router-dom'

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-ink-subtle mb-6">
      <Link to="/" className="hover:text-ink transition-colors">홈</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="text-ink-tertiary">/</span>
          {item.to && i < items.length - 1 ? (
            <Link to={item.to} className="hover:text-ink transition-colors">{item.label}</Link>
          ) : (
            <span className="text-ink">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
