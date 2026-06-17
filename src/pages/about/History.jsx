const HISTORY = [
  { year: '2024', events: ['글로벌 파트너십 체결', '매출 1,000억 달성'] },
  { year: '2022', events: ['신제품 라인업 출시', '직원 500명 돌파'] },
  { year: '2020', events: ['ISO 9001 인증 획득', '해외 수출 30개국 달성'] },
  { year: '2018', events: ['R&D 센터 설립', '기업부설연구소 인정'] },
  { year: '2015', events: ['코스닥 상장', '본사 이전'] },
  { year: '2010', events: ['hanyong5 창립'] },
]

export default function History() {
  return (
    <div>
      <p className="eyebrow mb-3">History</p>
      <h2 className="section-title mb-10">연혁</h2>
      <div className="relative">
        <div className="absolute left-[7.5rem] top-0 bottom-0 w-px bg-hairline hidden md:block" />
        <div className="flex flex-col gap-8">
          {HISTORY.map(h => (
            <div key={h.year} className="flex gap-8 items-start">
              <div className="hidden md:flex w-24 shrink-0 justify-end">
                <span className="text-sm font-semibold text-primary">{h.year}</span>
              </div>
              <div className="hidden md:block w-4 h-4 rounded-full bg-surface-2 border-2 border-primary shrink-0 mt-0.5 z-10" />
              <div className="card flex-1">
                <p className="text-xs font-semibold text-primary mb-2 md:hidden">{h.year}</p>
                <ul className="space-y-1">
                  {h.events.map((e, i) => (
                    <li key={i} className="text-sm text-ink-muted flex items-start gap-2">
                      <span className="text-ink-tertiary mt-1">·</span>{e}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
