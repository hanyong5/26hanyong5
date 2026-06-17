export default function CEO() {
  return (
    <div>
      <p className="eyebrow mb-3">Message</p>
      <h2 className="section-title mb-8">CEO 인사말</h2>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="bg-surface-1 rounded-2xl w-full md:w-48 h-56 shrink-0 flex items-center justify-center border border-hairline">
          <p className="text-ink-tertiary text-xs">CEO 사진</p>
        </div>
        <div className="space-y-4">
          <p className="text-ink-muted leading-relaxed">
            안녕하세요, hanyong5 대표이사입니다.
          </p>
          <p className="text-ink-muted leading-relaxed">
            저희 회사를 방문해 주신 여러분을 진심으로 환영합니다. hanyong5는 창업 이래 고객의 신뢰를 바탕으로 꾸준히 성장해 왔습니다.
          </p>
          <p className="text-ink-muted leading-relaxed">
            우리는 혁신적인 기술과 품질 높은 제품을 통해 고객의 삶에 가치를 더하고자 끊임없이 노력하고 있습니다. 앞으로도 더욱 발전하는 hanyong5가 되겠습니다.
          </p>
          <p className="text-ink-muted leading-relaxed">
            감사합니다.
          </p>
          <p className="text-ink font-semibold mt-6">hanyong5 대표이사 한 용 오</p>
        </div>
      </div>
    </div>
  )
}
