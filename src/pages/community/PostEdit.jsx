import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, useParams } from 'react-router-dom'
import { getPost, updatePost } from '../../services/postService'
import { useAuth } from '../../contexts/AuthContext'
import Breadcrumb from '../../components/layout/Breadcrumb'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'
import { useState } from 'react'

const schema = z.object({
  title: z.string().min(1, '제목을 입력해주세요').max(200),
  content: z.string().min(1, '내용을 입력해주세요'),
})

export default function PostEdit() {
  const { id } = useParams()
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    getPost(id).then(r => {
      if (!r.data) { navigate('/community'); return }
      if (r.data.user_id !== user?.id && !isAdmin) { navigate('/community'); return }
      reset({ title: r.data.title, content: r.data.content })
      setLoading(false)
    })
  }, [id])

  async function onSubmit(values) {
    const { data, error } = await updatePost(id, values)
    if (error) { alert('수정 실패: ' + error.message); return }
    navigate(`/community/${data.id}`)
  }

  if (loading) return <Spinner />

  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: '커뮤니티', to: '/community' }, { label: '수정' }]} />
      <h1 className="section-title mb-8">게시글 수정</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="card flex flex-col gap-5">
        <Input label="제목" error={errors.title?.message} {...register('title')} />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink-muted">내용</label>
          <textarea className="input-field min-h-64 resize-y" {...register('content')} />
          {errors.content && <p className="text-xs text-red-400">{errors.content.message}</p>}
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={() => navigate(`/community/${id}`)} type="button">취소</Button>
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? '수정 중...' : '수정'}</Button>
        </div>
      </form>
    </div>
  )
}
