import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMyInquiries } from '../../services/inquiryService'
import { useAuth } from '../../contexts/AuthContext'
import Breadcrumb from '../../components/layout/Breadcrumb'
import Spinner from '../../components/ui/Spinner'
import Badge from '../../components/ui/Badge'

const TYPE_LABELS = { product: '제품문의', general: '일반문의', other: '기타' }

export default function InquiryList() {
  const { user } = useAuth()
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    getMyInquiries(user.id).then(r => {
      setInquiries(r.data ?? [])
      setLoading(false)
    })
  }, [user])

  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: '온라인문의' }, { label: '문의내역' }]} />
      <div className="flex items-center justify-between mb-8">
        <h1 className="section-title">문의내역</h1>
        <Link to="/inquiry" className="btn-primary">새 문의</Link>
      </div>

      {loading ? <Spinner /> : (
        <div className="flex flex-col gap-4">
          {inquiries.length === 0 ? (
            <div className="card py-16 text-center">
              <p className="text-ink-subtle mb-4">등록된 문의가 없습니다.</p>
              <Link to="/inquiry" className="btn-primary">첫 문의 등록</Link>
            </div>
          ) : inquiries.map(q => (
            <div key={q.id} className="card">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="badge bg-surface-2 text-ink-subtle">{TYPE_LABELS[q.type] ?? q.type}</span>
                  <h3 className="text-sm font-medium text-ink">{q.title}</h3>
                </div>
                <Badge variant={q.status === 'answered' ? 'success' : 'pending'}>
                  {q.status === 'answered' ? '답변완료' : '접수중'}
                </Badge>
              </div>
              <p className="text-xs text-ink-tertiary mb-4">
                {new Date(q.created_at).toLocaleDateString('ko-KR')}
              </p>
              <p className="text-sm text-ink-subtle line-clamp-2">{q.content}</p>
              {q.answer && (
                <div className="mt-4 pt-4 border-t border-hairline bg-surface-2 rounded-lg p-3">
                  <p className="text-xs text-primary font-medium mb-1">관리자 답변</p>
                  <p className="text-sm text-ink-muted">{q.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
