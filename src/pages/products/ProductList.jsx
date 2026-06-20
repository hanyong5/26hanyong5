import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts, getCategories } from '../../services/productService'
import Breadcrumb from '../../components/layout/Breadcrumb'
import Spinner from '../../components/ui/Spinner'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const LIMIT = 12

  useEffect(() => { getCategories().then(r => setCategories(r.data ?? [])) }, [])

  useEffect(() => {
    setLoading(true)
    getProducts({ search, category, page, limit: LIMIT }).then(r => {
      setProducts(r.data ?? [])
      setTotal(r.count ?? 0)
      setLoading(false)
    })
  }, [search, category, page])

  const totalPages = Math.ceil(total / LIMIT)

  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: '제품소개' }]} />
      <div className="flex items-center justify-between mb-8">
        <h1 className="section-title">제품소개</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="제품명 검색..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          className="input-field md:w-72"
        />
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => { setCategory(''); setPage(1) }}
            className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${!category ? 'bg-surface-2 border-hairline-strong text-ink' : 'border-hairline text-ink-subtle hover:text-ink'}`}>
            전체
          </button>
          {categories.map(c => (
            <button key={c} onClick={() => { setCategory(c); setPage(1) }}
              className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${category === c ? 'bg-surface-2 border-hairline-strong text-ink' : 'border-hairline text-ink-subtle hover:text-ink'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {loading ? <Spinner /> : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {products.length === 0 ? (
              <p className="text-ink-subtle col-span-3 py-20 text-center">검색 결과가 없습니다.</p>
            ) : products.map(p => (
              <Link key={p.id} to={`/products/${p.id}`} className="card hover:bg-surface-2 transition-colors group">
                <div className="bg-surface-2 rounded-xl h-44 mb-4 flex items-center justify-center overflow-hidden">
                  {p.image_url
                    ? <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                    : <span className="text-ink-tertiary text-xs">이미지 없음</span>}
                </div>
                {p.category && <p className="text-xs text-primary mb-1">{p.category}</p>}
                <h3 className="text-base font-medium text-ink mb-1 group-hover:text-primary transition-colors">{p.name}</h3>
                {p.summary && <p className="text-sm text-ink-subtle line-clamp-2 mb-2">{p.summary}</p>}
                <p className="text-sm font-medium text-ink-muted mt-auto">
                  {p.price ? `${p.price.toLocaleString('ko-KR')}원` : '가격 문의'}
                </p>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => setPage(n)}
                  className={`w-9 h-9 rounded-lg text-sm transition-colors ${page === n ? 'bg-primary text-white' : 'bg-surface-1 text-ink-subtle hover:bg-surface-2 border border-hairline'}`}>
                  {n}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
