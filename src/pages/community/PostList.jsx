import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPosts } from '../../services/postService'
import { useAuth } from '../../contexts/AuthContext'
import Breadcrumb from '../../components/layout/Breadcrumb'
import Spinner from '../../components/ui/Spinner'
import Badge from '../../components/ui/Badge'

export default function PostList() {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const LIMIT = 10

  useEffect(() => {
    setLoading(true)
    getPosts({ search, page, limit: LIMIT }).then(r => {
      setPosts(r.data ?? [])
      setTotal(r.count ?? 0)
      setLoading(false)
    })
  }, [search, page])

  const totalPages = Math.ceil(total / LIMIT)

  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: '커뮤니티' }]} />
      <div className="flex items-center justify-between mb-8">
        <h1 className="section-title">커뮤니티</h1>
        {user && <Link to="/community/write" className="btn-primary">글쓰기</Link>}
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="제목 검색..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          className="input-field md:w-72"
        />
      </div>

      {loading ? <Spinner /> : (
        <>
          <div className="card divide-y divide-hairline p-0 overflow-hidden mb-6">
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-2 text-xs text-ink-tertiary font-medium border-b border-hairline">
              <span>제목</span>
              <span className="hidden md:block w-20 text-center">작성자</span>
              <span className="hidden md:block w-16 text-center">조회</span>
              <span className="w-24 text-right">날짜</span>
            </div>
            {posts.length === 0 ? (
              <div className="py-16 text-center text-ink-subtle text-sm">게시글이 없습니다.</div>
            ) : posts.map(p => (
              <Link key={p.id} to={`/community/${p.id}`}
                className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-3 hover:bg-surface-1 transition-colors items-center group">
                <div className="flex items-center gap-2 min-w-0">
                  {p.is_notice && <Badge variant="notice">공지</Badge>}
                  <span className="text-sm text-ink group-hover:text-primary transition-colors truncate">{p.title}</span>
                </div>
                <span className="hidden md:block w-20 text-xs text-ink-subtle text-center">{p.profiles?.name ?? '탈퇴회원'}</span>
                <span className="hidden md:block w-16 text-xs text-ink-tertiary text-center">{p.view_count}</span>
                <span className="w-24 text-xs text-ink-tertiary text-right">
                  {new Date(p.created_at).toLocaleDateString('ko-KR')}
                </span>
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
