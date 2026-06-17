import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFeaturedProducts } from '../services/productService'
import { getPosts } from '../services/postService'
import Spinner from '../components/ui/Spinner'

export default function Home() {
  const [products, setProducts] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getFeaturedProducts(),
      getPosts({ limit: 5 }),
    ]).then(([p, b]) => {
      setProducts(p.data ?? [])
      setPosts(b.data ?? [])
      setLoading(false)
    })
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="bg-canvas py-32 px-6">
        <div className="max-w-content mx-auto text-center">
          <p className="eyebrow mb-4">hanyong5</p>
          <h1 className="text-[56px] md:text-[80px] font-semibold tracking-[-3px] leading-[1.05] text-ink mb-6">
            최고의 제품,<br />최고의 서비스
          </h1>
          <p className="text-lg text-ink-muted max-w-xl mx-auto mb-10 leading-relaxed">
            고객과 함께 성장하는 기업, hanyong5입니다.<br />
            품질과 신뢰를 바탕으로 최선을 다합니다.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/products" className="btn-primary text-base px-6 py-3">제품 보기</Link>
            <Link to="/inquiry" className="btn-secondary text-base px-6 py-3">문의하기</Link>
          </div>
        </div>
      </section>

      {/* 회사소개 요약 */}
      <section className="py-24 px-6 border-t border-hairline">
        <div className="max-w-content mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="eyebrow mb-3">회사소개</p>
            <h2 className="section-title mb-6">신뢰와 혁신으로<br />함께하는 기업</h2>
            <p className="text-ink-muted leading-relaxed mb-8">
              hanyong5는 고객 만족을 최우선으로 생각하며, 지속적인 혁신과 품질 향상을 통해 최고의 제품을 제공합니다.
            </p>
            <Link to="/about/company" className="btn-secondary">자세히 보기</Link>
          </div>
          <div className="bg-surface-1 rounded-2xl h-64 flex items-center justify-center border border-hairline">
            <p className="text-ink-tertiary text-sm">회사 이미지</p>
          </div>
        </div>
      </section>

      {/* 대표 제품 */}
      <section className="py-24 px-6 bg-surface-1/30 border-t border-hairline">
        <div className="max-w-content mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="eyebrow mb-2">제품소개</p>
              <h2 className="headline">대표 제품</h2>
            </div>
            <Link to="/products" className="btn-secondary hidden md:inline-flex">전체 보기</Link>
          </div>
          {loading ? <Spinner /> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length === 0 ? (
                <p className="text-ink-subtle col-span-3 py-12 text-center">등록된 제품이 없습니다.</p>
              ) : products.map(p => (
                <Link key={p.id} to={`/products/${p.id}`} className="card hover:bg-surface-2 transition-colors group">
                  <div className="bg-surface-2 rounded-xl h-40 mb-4 flex items-center justify-center">
                    {p.image_url
                      ? <img src={p.image_url} alt={p.name} className="w-full h-full object-cover rounded-xl" />
                      : <span className="text-ink-tertiary text-xs">이미지 없음</span>}
                  </div>
                  {p.category && <p className="text-xs text-primary mb-1">{p.category}</p>}
                  <h3 className="text-base font-medium text-ink mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
                  {p.summary && <p className="text-sm text-ink-subtle line-clamp-2">{p.summary}</p>}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 문의하기 CTA */}
      <section className="py-24 px-6 border-t border-hairline">
        <div className="max-w-content mx-auto">
          <div className="card bg-surface-1 rounded-2xl p-12 text-center">
            <p className="eyebrow mb-3">온라인문의</p>
            <h2 className="headline mb-4">궁금한 점이 있으신가요?</h2>
            <p className="text-ink-muted mb-8">제품 및 서비스에 대한 문의를 남겨주시면 빠르게 답변드리겠습니다.</p>
            <Link to="/inquiry" className="btn-primary text-base px-8 py-3">문의하기</Link>
          </div>
        </div>
      </section>

      {/* 최신 게시글 */}
      <section className="py-24 px-6 border-t border-hairline">
        <div className="max-w-content mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="headline">최신 게시글</h2>
            <Link to="/community" className="btn-secondary hidden md:inline-flex">전체 보기</Link>
          </div>
          {loading ? <Spinner /> : (
            <div className="flex flex-col divide-y divide-hairline">
              {posts.length === 0 ? (
                <p className="text-ink-subtle py-12 text-center">게시글이 없습니다.</p>
              ) : posts.map(p => (
                <Link key={p.id} to={`/community/${p.id}`}
                  className="flex items-center justify-between py-4 hover:bg-surface-1/50 px-2 rounded-lg transition-colors group">
                  <div className="flex items-center gap-3">
                    {p.is_notice && <span className="badge bg-primary/20 text-primary">공지</span>}
                    <span className="text-sm text-ink group-hover:text-primary transition-colors">{p.title}</span>
                  </div>
                  <span className="text-xs text-ink-tertiary shrink-0 ml-4">
                    {new Date(p.created_at).toLocaleDateString('ko-KR')}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
