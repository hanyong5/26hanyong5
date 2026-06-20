import { Link } from 'react-router-dom'

export default function RegisterSuccess() {
  return (
    <div className="min-h-screen bg-[#010102] flex items-center justify-center px-4">
      <div className="bg-[#1a1b1e] rounded-xl border border-[#23252a] p-8 max-w-sm w-full text-center">
        <div className="w-14 h-14 rounded-full bg-[#222327] flex items-center justify-center mx-auto mb-6">
          <svg className="w-7 h-7 text-[#5e6ad2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-[28px] font-semibold tracking-[-0.6px] leading-[1.20] text-[#f7f8f8] mb-3">
          회원가입 완료
        </h2>
        <p className="text-sm font-normal leading-[1.50] text-[#8a8f98] mb-1">
          가입하신 이메일로 인증 링크를 보냈습니다.
        </p>
        <p className="text-sm font-normal leading-[1.50] text-[#8a8f98] mb-8">
          이메일을 확인한 후 로그인해주세요.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            to="/login"
            className="bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium px-[14px] py-2 rounded-lg text-center transition-colors"
          >
            로그인하기
          </Link>
          <Link
            to="/"
            className="bg-[#1a1b1e] hover:bg-[#222327] text-[#f7f8f8] text-sm font-medium px-[14px] py-2 rounded-lg border border-[#23252a] text-center transition-colors"
          >
            홈으로
          </Link>
        </div>
      </div>
    </div>
  )
}
