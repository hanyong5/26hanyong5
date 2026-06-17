export default function AdminSettings() {
  return (
    <div>
      <h2 className="headline mb-6">사이트설정</h2>
      <div className="card max-w-2xl">
        <p className="text-sm text-ink-subtle">사이트 기본 정보를 관리합니다.</p>
        <div className="mt-6 flex flex-col gap-4">
          {[
            { label: '사이트명', placeholder: 'hanyong5' },
            { label: '대표 이메일', placeholder: 'info@hanyong5.com' },
            { label: '대표전화', placeholder: '02-1234-5678' },
            { label: '주소', placeholder: '서울특별시 강남구 테헤란로 123' },
          ].map(f => (
            <div key={f.label} className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-ink-muted">{f.label}</label>
              <input className="input-field" placeholder={f.placeholder} />
            </div>
          ))}
          <div className="flex justify-end pt-2">
            <button className="btn-primary">저장</button>
          </div>
        </div>
      </div>
    </div>
  )
}
