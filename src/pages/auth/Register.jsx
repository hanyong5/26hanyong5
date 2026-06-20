import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useState } from 'react'

const schema = z.object({
  name: z.string().min(2, '이름은 2자 이상이어야 합니다'),
  email: z.string().email('올바른 이메일을 입력해주세요'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다'),
  confirm: z.string(),
}).refine(d => d.password === d.confirm, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirm'],
})

export default function Register() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  })

  async function onSubmit(values) {
    setServerError('')
    const { error } = await signUp(values.email, values.password, values.name)
    if (error) { setServerError(error.message); return }
    navigate('/register/success')
  }

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="text-xl font-semibold text-ink">hanyong5</Link>
          <p className="text-ink-muted text-sm mt-2">새 계정을 만드세요</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="card flex flex-col gap-4">
          <Input label="이름" type="text" placeholder="이름을 입력하세요"
            error={errors.name?.message} {...register('name')} />
          <Input label="이메일" type="email" placeholder="이메일을 입력하세요"
            error={errors.email?.message} {...register('email')} />
          <Input label="비밀번호" type="password" placeholder="6자 이상"
            error={errors.password?.message} {...register('password')} />
          <Input label="비밀번호 확인" type="password" placeholder="비밀번호를 다시 입력하세요"
            error={errors.confirm?.message} {...register('confirm')} />
          {serverError && <p className="text-xs text-red-400">{serverError}</p>}
          <Button type="submit" disabled={isSubmitting} className="w-full justify-center mt-2">
            {isSubmitting ? '가입 중...' : '회원가입'}
          </Button>
        </form>
        <p className="text-center text-sm text-ink-subtle mt-6">
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="text-primary hover:text-primary-hover">로그인</Link>
        </p>
      </div>
    </div>
  )
}
