import { useEffect, useState } from 'react'
import { getAllInquiries, answerInquiry } from '../../services/inquiryService'
import Spinner from '../../components/ui/Spinner'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'

const TYPE_LABELS = { product: '제품문의', general: '일반문의', other: '기타' }

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [answer, setAnswer] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    getAllInquiries().then(r => { setInquiries(r.data ?? []); setLoading(false) })
  }, [])

  async function handleAnswer(id) {
    if (!answer.trim()) return
    setSubmitting(true)
    const { data } = await answerInquiry(id, answer)
    if (data) {
      setInquiries(prev => prev.map(q => q.id === id ? data : q))
      setSelected(null)
      setAnswer('')
    }
    setSubmitting(false)
  }

  if (loading) return <Spinner />

  return (
    <div>
      <h2 className="headline mb-6">문의관리</h2>
      <div className="flex flex-col gap-4">
        {inquiries.length === 0 ? (
          <div className="card py-12 text-center text-ink-subtle text-sm">문의가 없습니다.</div>
        ) : inquiries.map(q => (
          <div key={q.id} className="card">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="badge bg-surface-2 text-ink-subtle">{TYPE_LABELS[q.type] ?? q.type}</span>
                <span className="text-sm font-medium text-ink">{q.title}</span>
              </div>
              <Badge variant={q.status === 'answered' ? 'success' : 'pending'}>
                {q.status === 'answered' ? '답변완료' : '접수중'}
              </Badge>
            </div>
            <p className="text-xs text-ink-tertiary mb-3">
              {q.profiles?.name} ({q.profiles?.email}) · {new Date(q.created_at).toLocaleDateString('ko-KR')}
            </p>
            <p className="text-sm text-ink-subtle mb-4 whitespace-pre-wrap">{q.content}</p>

            {q.answer ? (
              <div className="bg-surface-2 rounded-lg p-3">
                <p className="text-xs text-primary font-medium mb-1">관리자 답변</p>
                <p className="text-sm text-ink-muted">{q.answer}</p>
              </div>
            ) : (
              selected === q.id ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    className="input-field min-h-24 resize-y text-sm"
                    placeholder="답변을 입력하세요"
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button variant="secondary" onClick={() => { setSelected(null); setAnswer('') }} type="button">취소</Button>
                    <Button onClick={() => handleAnswer(q.id)} disabled={submitting}>
                      {submitting ? '등록 중...' : '답변 등록'}
                    </Button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setSelected(q.id)}
                  className="text-xs text-primary hover:text-primary-hover transition-colors">
                  답변 작성
                </button>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
