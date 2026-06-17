export default function Company() {
  return (
    <div>
      <p className="eyebrow mb-3">About Us</p>
      <h2 className="section-title mb-6">회사소개</h2>
      <div className="bg-surface-1 rounded-2xl h-64 mb-8 flex items-center justify-center border border-hairline">
        <p className="text-ink-tertiary text-sm">회사 대표 이미지</p>
      </div>
      <div className="prose-custom space-y-4">
        <p className="text-ink-muted leading-relaxed">
          hanyong5는 고객 만족을 최우선으로 생각하며, 지속적인 혁신과 품질 향상을 통해 최고의 제품과 서비스를 제공하는 기업입니다.
        </p>
        <p className="text-ink-muted leading-relaxed">
          설립 이래 꾸준한 성장을 거듭해 온 당사는, 우수한 인재와 첨단 기술을 바탕으로 글로벌 시장에서 경쟁력을 갖추고 있습니다.
        </p>
        <p className="text-ink-muted leading-relaxed">
          앞으로도 고객과 함께하는 신뢰의 파트너로서 더욱 발전하는 hanyong5가 되겠습니다.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-10 md:mt-12">
        {[['설립연도', '2010'], ['직원수', '500+'], ['파트너사', '200+'], ['수출국', '30+']].map(([label, value]) => (
          <div key={label} className="card text-center">
            <p className="text-[28px] font-semibold text-ink tracking-[-0.6px]">{value}</p>
            <p className="text-xs text-ink-subtle mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
