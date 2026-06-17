import { useEffect, useState } from 'react'
import { getAllProfiles, updateUserRole } from '../../services/authService'
import Spinner from '../../components/ui/Spinner'
import Badge from '../../components/ui/Badge'

export default function AdminMembers() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllProfiles().then(r => { setMembers(r.data ?? []); setLoading(false) })
  }, [])

  async function handleRoleChange(id, role) {
    const { data } = await updateUserRole(id, role)
    if (data) setMembers(prev => prev.map(m => m.id === id ? data : m))
  }

  if (loading) return <Spinner />

  return (
    <div>
      <h2 className="headline mb-6">회원관리</h2>
      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-hairline text-xs text-ink-tertiary">
              <th className="text-left px-4 py-3 font-medium">이름</th>
              <th className="text-left px-4 py-3 font-medium">이메일</th>
              <th className="text-left px-4 py-3 font-medium">역할</th>
              <th className="text-left px-4 py-3 font-medium">가입일</th>
              <th className="text-left px-4 py-3 font-medium">액션</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {members.map(m => (
              <tr key={m.id} className="hover:bg-surface-1/50 transition-colors">
                <td className="px-4 py-3 text-ink">{m.name ?? '-'}</td>
                <td className="px-4 py-3 text-ink-subtle">{m.email}</td>
                <td className="px-4 py-3">
                  <Badge variant={m.role === 'admin' ? 'notice' : 'default'}>
                    {m.role === 'admin' ? '관리자' : '일반회원'}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-ink-tertiary text-xs">
                  {new Date(m.created_at).toLocaleDateString('ko-KR')}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleRoleChange(m.id, m.role === 'admin' ? 'user' : 'admin')}
                    className="text-xs text-primary hover:text-primary-hover transition-colors">
                    {m.role === 'admin' ? '일반으로 변경' : '관리자로 변경'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
