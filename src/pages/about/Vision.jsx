const VALUES = [
  { title: '혁신', desc: '끊임없는 연구개발로 미래를 선도합니다.' },
  { title: '신뢰', desc: '고객과의 약속을 최우선으로 생각합니다.' },
  { title: '품질', desc: '최고의 품질로 고객 만족을 실현합니다.' },
  { title: '협력', desc: '파트너와 함께 더 큰 가치를 만듭니다.' },
]

export default function Vision() {
  return (
    <div>
      <p className="eyebrow mb-3">Vision</p>
      <h2 className="section-title mb-4">비전</h2>
      <p className="text-ink-muted leading-relaxed mb-12">
        "고객과 함께 성장하는 글로벌 리딩 기업"
      </p>
      <div className="bg-surface-1 rounded-2xl p-8 border border-hairline mb-12 text-center">
        <p className="text-[28px] font-semibold text-ink tracking-[-0.6px]">
          "세상을 더 나은 곳으로 만드는 기술"
        </p>
      </div>
      <h3 className="headline mb-6">핵심 가치</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {VALUES.map(v => (
          <div key={v.title} className="card">
            <h4 className="text-base font-semibold text-ink mb-2">{v.title}</h4>
            <p className="text-sm text-ink-subtle">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
