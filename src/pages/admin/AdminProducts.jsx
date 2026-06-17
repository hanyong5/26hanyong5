import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts, deleteProduct } from '../../services/productService'
import Spinner from '../../components/ui/Spinner'
import Button from '../../components/ui/Button'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const LIMIT = 10

  useEffect(() => {
    setLoading(true)
    getProducts({ page, limit: LIMIT }).then(r => {
      setProducts(r.data ?? [])
      setTotal(r.count ?? 0)
      setLoading(false)
    })
  }, [page])

  async function handleDelete(id) {
    if (!confirm('제품을 삭제하시겠습니까?')) return
    await deleteProduct(id)
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  if (loading) return <Spinner />

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="headline">제품관리</h2>
        <Link to="/admin/products/new" className="btn-primary">제품 등록</Link>
      </div>
      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-hairline text-xs text-ink-tertiary">
              <th className="text-left px-4 py-3 font-medium">제품명</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">카테고리</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">메인노출</th>
              <th className="text-left px-4 py-3 font-medium">액션</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {products.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-12 text-center text-ink-subtle text-sm">등록된 제품이 없습니다.</td></tr>
            ) : products.map(p => (
              <tr key={p.id} className="hover:bg-surface-1/50 transition-colors">
                <td className="px-4 py-3 text-ink">{p.name}</td>
                <td className="px-4 py-3 text-ink-subtle hidden md:table-cell">{p.category ?? '-'}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`text-xs ${p.is_featured ? 'text-success' : 'text-ink-tertiary'}`}>
                    {p.is_featured ? '노출' : '-'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link to={`/admin/products/${p.id}/edit`} className="text-xs text-primary hover:text-primary-hover">수정</Link>
                    <button onClick={() => handleDelete(p.id)} className="text-xs text-red-400 hover:text-red-300">삭제</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
