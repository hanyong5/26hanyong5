import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProduct, deleteProduct } from '../../services/productService'
import { useAuth } from '../../contexts/AuthContext'
import Breadcrumb from '../../components/layout/Breadcrumb'
import Spinner from '../../components/ui/Spinner'
import Button from '../../components/ui/Button'

export default function ProductDetail() {
  const { id } = useParams()
  const { isAdmin } = useAuth()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    getProduct(id).then(r => {
      setProduct(r.data)
      setLoading(false)
    })
  }, [id])

  async function handleDelete() {
    if (!confirm('제품을 삭제하시겠습니까?')) return
    await deleteProduct(id)
    navigate('/products')
  }

  function handlePurchase() {
    const orderNo = `ORD-${Date.now()}`
    const totalPrice = product.price ?? 0
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'purchase', {
        transaction_id: orderNo,
        value: totalPrice,
        currency: 'KRW',
      })
    }
    setShowModal(true)
  }

  if (loading) return <Spinner />
  if (!product) return <div className="max-w-content mx-auto px-6 py-12 text-ink-subtle">제품을 찾을 수 없습니다.</div>

  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: '제품소개', to: '/products' }, { label: product.name }]} />

      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-surface-1 rounded-2xl h-80 flex items-center justify-center border border-hairline overflow-hidden">
          {product.image_url
            ? <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            : <span className="text-ink-tertiary text-sm">이미지 없음</span>}
        </div>

        <div>
          {product.category && <p className="text-xs text-primary mb-2">{product.category}</p>}
          <h1 className="text-[28px] font-semibold text-ink tracking-[-0.6px] mb-4">{product.name}</h1>
          {product.summary && <p className="text-ink-muted mb-4">{product.summary}</p>}
          <p className="text-[22px] font-semibold text-ink mb-6">
            {product.price ? `${product.price.toLocaleString('ko-KR')}원` : '가격 문의'}
          </p>

          <div className="flex gap-3 mb-8">
            <button className="btn-primary" onClick={handlePurchase}>
              구매하기
            </button>
            <Link to={`/inquiry?type=product&title=${encodeURIComponent(product.name + ' 문의')}`} className="btn-secondary">문의하기</Link>
            {isAdmin && (
              <>
                <Link to={`/admin/products/${id}/edit`} className="btn-secondary">수정</Link>
                <Button variant="secondary" onClick={handleDelete}>삭제</Button>
              </>
            )}
          </div>
        </div>
      </div>

      {product.content && (
        <div className="mt-12 border-t border-hairline pt-10">
          <h2 className="headline mb-6">상세 설명</h2>
          <div className="text-ink-muted leading-relaxed whitespace-pre-wrap">{product.content}</div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowModal(false)} />
          <div className="relative bg-[#1a1b1e] border border-[#23252a] rounded-2xl p-8 w-full max-w-sm mx-4 flex flex-col items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-[#27a644]/15 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#27a644" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-[18px] font-semibold text-[#f7f8f8] mb-2">구매가 완료되었습니다</p>
              <p className="text-sm text-[#8a8f98]">{product.name}</p>
            </div>
            <button
              className="btn-primary w-full justify-center"
              onClick={() => navigate('/products')}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
