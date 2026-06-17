import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPosts, deletePost, updatePost } from '../../services/postService'
import Spinner from '../../components/ui/Spinner'
import Badge from '../../components/ui/Badge'

export default function AdminPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const LIMIT = 10

  useEffect(() => {
    setLoading(true)
    getPosts({ page, limit: LIMIT }).then(r => {
      setPosts(r.data ?? [])
      setTotal(r.count ?? 0)
      setLoading(false)
    })
  }, [page])

  async function handleDelete(id) {
    if (!confirm('게시글을 삭제하시겠습니까?')) return
    await deletePost(id)
    setPosts(prev => prev.filter(p => p.id !== id))
  }

  async function toggleNotice(post) {
    const { data } = await updatePost(post.id, { is_notice: !post.is_notice })
    if (data) setPosts(prev => prev.map(p => p.id === post.id ? data : p))
  }

  if (loading) return <Spinner />

  return (
    <div>
      <h2 className="headline mb-6">게시판관리</h2>
      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-hairline text-xs text-ink-tertiary">
              <th className="text-left px-4 py-3 font-medium">제목</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">작성자</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">날짜</th>
              <th className="text-left px-4 py-3 font-medium">공지</th>
              <th className="text-left px-4 py-3 font-medium">액션</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {posts.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-ink-subtle text-sm">게시글이 없습니다.</td></tr>
            ) : posts.map(p => (
              <tr key={p.id} className="hover:bg-surface-1/50 transition-colors">
                <td className="px-4 py-3">
                  <Link to={`/community/${p.id}`} className="text-ink hover:text-primary transition-colors line-clamp-1">{p.title}</Link>
                </td>
                <td className="px-4 py-3 text-ink-subtle hidden md:table-cell">{p.profiles?.name ?? '-'}</td>
                <td className="px-4 py-3 text-ink-tertiary text-xs hidden md:table-cell">
                  {new Date(p.created_at).toLocaleDateString('ko-KR')}
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleNotice(p)}
                    className={`text-xs transition-colors ${p.is_notice ? 'text-primary' : 'text-ink-tertiary hover:text-primary'}`}>
                    {p.is_notice ? '공지 해제' : '공지 설정'}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(p.id)} className="text-xs text-red-400 hover:text-red-300">삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
