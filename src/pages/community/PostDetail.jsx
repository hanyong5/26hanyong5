import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getPost, deletePost, incrementViewCount } from '../../services/postService'
import { useAuth } from '../../contexts/AuthContext'
import Breadcrumb from '../../components/layout/Breadcrumb'
import Spinner from '../../components/ui/Spinner'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'

export default function PostDetail() {
  const { id } = useParams()
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPost(id).then(r => {
      setPost(r.data)
      setLoading(false)
      if (r.data) incrementViewCount(id)
    })
  }, [id])

  async function handleDelete() {
    if (!confirm('게시글을 삭제하시겠습니까?')) return
    const { error } = await deletePost(id)
    if (!error) navigate('/community')
  }

  const isOwner = user?.id === post?.user_id

  if (loading) return <Spinner />
  if (!post) return <div className="max-w-content mx-auto px-6 py-12 text-ink-subtle">게시글을 찾을 수 없습니다.</div>

  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: '커뮤니티', to: '/community' }, { label: post.title }]} />

      <div className="card mb-8">
        <div className="flex items-start gap-3 mb-4">
          {post.is_notice && <Badge variant="notice">공지</Badge>}
          <h1 className="text-[22px] font-semibold text-ink tracking-[-0.4px] leading-[1.25]">{post.title}</h1>
        </div>
        <div className="flex items-center gap-4 text-xs text-ink-tertiary pb-4 border-b border-hairline mb-6">
          <span>{post.profiles?.name ?? '탈퇴회원'}</span>
          <span>{new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
          <span>조회 {post.view_count}</span>
        </div>
        <div className="text-ink-muted leading-relaxed whitespace-pre-wrap min-h-40">{post.content}</div>
        {post.file_url && (
          <div className="mt-6 pt-4 border-t border-hairline">
            <a href={post.file_url} download={post.file_name}
              className="text-sm text-primary hover:text-primary-hover flex items-center gap-1.5">
              📎 {post.file_name ?? '첨부파일 다운로드'}
            </a>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Link to="/community" className="btn-secondary">목록</Link>
        {(isOwner || isAdmin) && (
          <div className="flex gap-2">
            <Link to={`/community/${id}/edit`} className="btn-secondary">수정</Link>
            <Button variant="secondary" onClick={handleDelete}>삭제</Button>
          </div>
        )}
      </div>
    </div>
  )
}
