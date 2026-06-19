import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function LoginSuccess() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-[#010102] flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <div className="bg-[#1a1b1e] rounded-xl border border-[#23252a] p-8 flex flex-col items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-[#27a644]/15 flex items-center justify-center">
            <svg className="w-7 h-7 text-[#27a644]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-[28px] font-semibold tracking-[-0.6px] leading-[1.20] text-[#f7f8f8]">
              로그인 완료
            </h1>
            <p className="text-sm text-[#8a8f98]">
              {user?.email && (
                <span className="text-[#d0d6e0]">{user.email}</span>
              )}
              {user?.email ? '으로 로그인되었습니다' : '로그인되었습니다'}
            </p>
          </div>

          <Link
            to="/"
            className="w-full bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium px-[14px] py-2 rounded-lg text-center transition-colors"
          >
            홈으로 이동
          </Link>
        </div>
      </div>
    </div>
  )
}
