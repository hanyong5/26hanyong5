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
          {product.summary && <p className="text-ink-muted mb-6">{product.summary}</p>}

          <div className="flex gap-3 mb-8">
            <Link to="/inquiry" className="btn-primary">문의하기</Link>
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
    </div>
  )
}
