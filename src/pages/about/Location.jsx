export default function Location() {
  return (
    <div>
      <p className="eyebrow mb-3">Location</p>
      <h2 className="section-title mb-8">오시는 길</h2>
      <div className="bg-surface-1 rounded-2xl h-72 mb-8 flex items-center justify-center border border-hairline">
        <p className="text-ink-tertiary text-sm">지도 영역</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-base font-semibold text-ink mb-4">주소</h3>
          <div className="space-y-2 text-sm text-ink-muted">
            <p>서울특별시 강남구 테헤란로 123</p>
            <p>hanyong5 빌딩 5층</p>
          </div>
        </div>
        <div className="card">
          <h3 className="text-base font-semibold text-ink mb-4">교통편</h3>
          <div className="space-y-2 text-sm text-ink-muted">
            <p><span className="text-primary font-medium">지하철</span> 2호선 강남역 3번 출구 도보 5분</p>
            <p><span className="text-primary font-medium">버스</span> 140, 401, 3412번</p>
            <p><span className="text-primary font-medium">주차</span> 건물 지하 주차장 2시간 무료</p>
          </div>
        </div>
        <div className="card md:col-span-2">
          <h3 className="text-base font-semibold text-ink mb-4">연락처</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-ink-muted">
            <p><span className="text-ink font-medium">대표전화</span><br />02-1234-5678</p>
            <p><span className="text-ink font-medium">팩스</span><br />02-1234-5679</p>
            <p><span className="text-ink font-medium">이메일</span><br />info@hanyong5.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
