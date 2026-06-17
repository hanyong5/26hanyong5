import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../../services/postService'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import Breadcrumb from '../../components/layout/Breadcrumb'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

const schema = z.object({
  title: z.string().min(1, '제목을 입력해주세요').max(200),
  content: z.string().min(1, '내용을 입력해주세요'),
})

export default function PostWrite() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  })

  async function onSubmit(values) {
    const { data, error } = await createPost({
      ...values,
      user_id: user.id,
    })
    if (error) { alert('작성 실패: ' + error.message); return }
    navigate(`/community/${data.id}`)
  }

  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: '커뮤니티', to: '/community' }, { label: '글쓰기' }]} />
      <h1 className="section-title mb-8">글쓰기</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="card flex flex-col gap-5">
        <Input label="제목" placeholder="제목을 입력하세요"
          error={errors.title?.message} {...register('title')} />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink-muted">내용</label>
          <textarea
            className="input-field min-h-64 resize-y"
            placeholder="내용을 입력하세요"
            {...register('content')}
          />
          {errors.content && <p className="text-xs text-red-400">{errors.content.message}</p>}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={() => navigate('/community')} type="button">취소</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '등록 중...' : '등록'}
          </Button>
        </div>
      </form>
    </div>
  )
}
