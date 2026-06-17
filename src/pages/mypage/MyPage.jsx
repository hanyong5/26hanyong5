import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../../contexts/AuthContext'
import { updateProfile } from '../../services/authService'
import Breadcrumb from '../../components/layout/Breadcrumb'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

const schema = z.object({
  name: z.string().min(2, '이름은 2자 이상'),
  phone: z.string().optional(),
})

export default function MyPage() {
  const { profile, user } = useAuth()
  const [saved, setSaved] = useState(false)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (profile) reset({ name: profile.name ?? '', phone: profile.phone ?? '' })
  }, [profile])

  async function onSubmit(values) {
    const { error } = await updateProfile(user.id, values)
    if (!error) { setSaved(true); setTimeout(() => setSaved(false), 2000) }
  }

  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: '마이페이지' }]} />
      <h1 className="section-title mb-8">마이페이지</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="card col-span-1 text-center">
          <div className="w-20 h-20 rounded-full bg-surface-2 border border-hairline mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl text-ink-tertiary">👤</span>
          </div>
          <p className="text-ink font-semibold">{profile?.name}</p>
          <p className="text-sm text-ink-subtle mt-1">{user?.email}</p>
          <span className="badge bg-primary/20 text-primary mt-3 inline-block">
            {profile?.role === 'admin' ? '관리자' : '일반회원'}
          </span>
        </div>

        <div className="card col-span-2">
          <h2 className="headline mb-6">프로필 수정</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input label="이메일" value={user?.email ?? ''} disabled className="opacity-50" readOnly />
            <Input label="이름" error={errors.name?.message} {...register('name')} />
            <Input label="연락처" placeholder="010-0000-0000" error={errors.phone?.message} {...register('phone')} />
            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? '저장 중...' : '저장'}
              </Button>
              {saved && <span className="text-sm text-success">저장되었습니다.</span>}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
