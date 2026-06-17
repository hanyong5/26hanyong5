# Design System

> Linear 마케팅 캔버스 기반 다크 테마 디자인 시스템

---

## Overview

Linear의 마케팅 캔버스는 이 컬렉션에서 가장 깊은 다크 서피스를 사용한다. `{colors.canvas}`는 #010102로 미세한 블루 틴트가 섞인 거의 순수한 블랙이다. 그 위에 카드, 패널, 리프트 타일을 위한 4단계 서피스 래더(`{colors.surface-1}` ~ `{colors.surface-4}`)가 있으며, `{colors.hairline}`(#23252a)부터 `{colors.hairline-strong}`, `{colors.hairline-tertiary}`까지 헤어라인 보더가 이어진다. 밝은 회색 텍스트(`{colors.ink}` #f7f8f8)가 본문과 헤드라인을 담당한다.

단 하나의 크로매틱 액센트는 **Linear 라벤더-블루** `{colors.primary}`(#5e6ad2)로 브랜드 마크, 포커스 링, 기본 CTA 버튼에 사용된다. 밝은 호버 상태(`{colors.primary-hover}` #828fff)와 포커스 틴트 변형(`{colors.primary-focus}` #5e69d1)이 같은 색조를 확장한다.

디스플레이 타이포는 Linear 커스텀 산세리프(`SF Pro Display` 폴백)를 사용하며, 웨이트 500~700에 80px에서 -3.0px부터 본문에서 0까지 음수 자간이 스케일링된다.

**핵심 특성:**
- **다크 캔버스 마케팅 시스템** — `{colors.canvas}`(#010102)가 가장 깊은 다크
- **라벤더-블루 브랜드 액센트** (`{colors.primary}` #5e6ad2) — 브랜드 마크, 포커스, 기본 CTA에만 사용
- 4단계 서피스 래더(canvas → surface-1 → surface-2 → surface-3 → surface-4)로 섀도 없이 위계 표현
- 디스플레이 자간 공격적 음수(-3.0px at 80px), 본문은 -0.05px 유지
- 카드는 `{rounded.lg}` 12px 코너 + 1px 헤어라인 보더 — 필 형태 없음
- **제품 UI 스크린샷**이 페이지를 지배
- 두 번째 크로매틱 컬러 없음. 대기 그라디언트 없음. 스포트라이트 카드 없음.

---

## Colors

> 출처: linear.app (home), /intake, /pricing, /contact/sales, /build

### Brand & Accent

| 토큰 | 값 | 설명 |
|------|-----|------|
| `{colors.primary}` | #5e6ad2 | Linear 시그니처 라벤더-블루 — 기본 CTA, 브랜드 마크, 링크 강조 |
| `{colors.primary-hover}` | #828fff | 밝은 라벤더 — 기본 CTA 호버 상태 |
| `{colors.primary-focus}` | #5e69d1 | 포커스 링 틴트 — 포커스된 인풋, 버튼 |
| `{colors.brand-secure}` | #7a7fad | 뮤트된 라벤더-그레이 — "Linear Security" 서피스 |

### Surface

| 토큰 | 설명 |
|------|------|
| `{colors.canvas}` | 기본 페이지 배경 — #010102, 미세 블루 틴트의 거의 순수 블랙 |
| `{colors.surface-1}` | 캔버스 한 단계 위 — 피처 카드, 프라이싱 카드, 제품 스크린샷 패널 |
| `{colors.surface-2}` | 두 단계 위 — 추천 프라이싱 카드, 호버된 카드 |
| `{colors.surface-3}` | 세 단계 위 — 라인-터셔리 배경, 서브 내비 |
| `{colors.surface-4}` | 네 단계 위 — bg-level-3, 가장 깊은 리프트 서피스 |
| `{colors.hairline}` | #23252a — 카드 및 구분선 1px 보더 |
| `{colors.hairline-strong}` | 더 강한 1px 보더 — 인풋 포커스 링 |
| `{colors.hairline-tertiary}` | 중첩 서피스 터셔리 보더 |
| `{colors.inverse-canvas}` | 순수 화이트 — 일부 섹션 오프너의 인버스 필 CTA 서피스 |
| `{colors.inverse-surface-1}` | 인버스 캔버스 한 단계 위 |
| `{colors.inverse-surface-2}` | 인버스 캔버스 두 단계 위 |

### Text

| 토큰 | 값 | 설명 |
|------|-----|------|
| `{colors.ink}` | #f7f8f8 | 모든 헤드라인 및 강조 본문 |
| `{colors.ink-muted}` | #d0d6e0 | 보조 타입 — 히어로 패널 메타 정보 |
| `{colors.ink-subtle}` | #8a8f98 | 터셔리 타입 — 선택 해제된 프라이싱 탭, 푸터 컬럼 |
| `{colors.ink-tertiary}` | #62666d | 쿼터너리 — 비활성, 각주 |

### Semantic

| 토큰 | 값 | 설명 |
|------|-----|------|
| `{colors.semantic-success}` | #27a644 | 상태 필, 성공 인디케이터. 마케팅의 유일한 시맨틱 컬러 |
| `{colors.semantic-overlay}` | 순수 블랙 | 모달용 오버레이 스크림 |

---

## Typography

### Font Family

| 패밀리 | 폴백 | 용도 |
|--------|------|------|
| Linear Display | `SF Pro Display, -apple-system, system-ui, Segoe UI, Roboto` | display-xl ~ subhead |
| Linear Text | 동일 | body 사이즈, 버튼 라벨, 캡션 |
| Linear Mono | `ui-monospace, SF Mono, Menlo` | 코드 스니펫, 상태/ID 토큰 |

> 오픈소스 대체: **Inter** (weight 500/600/700), 모노는 **JetBrains Mono** 또는 **Geist Mono**

### Hierarchy

| 토큰 | 크기 | 웨이트 | 행간 | 자간 | 용도 |
|------|------|--------|------|------|------|
| `{typography.display-xl}` | 80px | 600 | 1.05 | -3.0px | 가장 큰 히어로 헤드라인 |
| `{typography.display-lg}` | 56px | 600 | 1.10 | -1.8px | 섹션 오프너 헤드라인 |
| `{typography.display-md}` | 40px | 600 | 1.15 | -1.0px | 서브섹션 헤드라인 |
| `{typography.headline}` | 28px | 600 | 1.20 | -0.6px | 프라이싱 티어 타이틀, CTA 배너 헤딩 |
| `{typography.card-title}` | 22px | 500 | 1.25 | -0.4px | 피처 카드 타이틀 |
| `{typography.subhead}` | 20px | 400 | 1.40 | -0.2px | 리드 본문, 인트로 단락 |
| `{typography.body-lg}` | 18px | 400 | 1.50 | -0.1px | 히어로 서브헤드, 리드 단락 |
| `{typography.body}` | 16px | 400 | 1.50 | -0.05px | 기본 본문 |
| `{typography.body-sm}` | 14px | 400 | 1.50 | 0 | 카드 본문, 푸터 컬럼 |
| `{typography.caption}` | 12px | 400 | 1.40 | 0 | 캡션, 메타, 상태 |
| `{typography.button}` | 14px | 500 | 1.20 | 0 | 모든 버튼 라벨 |
| `{typography.eyebrow}` | 13px | 500 | 1.30 | +0.4px | 섹션 아이브로우 (양수 자간) |
| `{typography.mono}` | 13px | 400 | 1.50 | 0 | 제품 스크린샷 내 코드 |

### Principles

- 디스플레이에 공격적 음수 자간 적용 (-3.0px at 80px ≈ 크기의 4%)
- 디스플레이-xl 600 → 본문 400 — 동일 패밀리, 점진적 웨이트 감소
- 아이브로우는 양수 자간(+0.4px) — 음수 자간 디스플레이와의 대비로 분류 표시
- Linear Mono는 코드 컨텍스트에서만 사용 — 마케팅 크롬에는 미사용

---

## Layout

### Spacing System

- **기본 단위**: 4px

| 토큰 | 값 | 용도 |
|------|-----|------|
| `{spacing.xxs}` | 4px | 최소 간격 |
| `{spacing.xs}` | 8px | 인라인 간격 |
| `{spacing.sm}` | 12px | 소형 간격 |
| `{spacing.md}` | 16px | 기본 간격 |
| `{spacing.lg}` | 24px | 카드 내부 패딩, 콘텐츠 블록 간격 |
| `{spacing.xl}` | 32px | 테스티모니얼 카드 패딩 |
| `{spacing.xxl}` | 48px | CTA 배너 패딩 |
| `{spacing.section}` | 96px | 섹션 간격 |

- 필 버튼 패딩: 수직 8px · 수평 14px
- 폼 인풋 패딩: 수직 8px · 수평 12px

### Grid & Container

- 최대 콘텐츠 너비: 1280px
- 카드 그리드: 데스크톱 3열, 태블릿 2열, 모바일 1열
- 프라이싱 그리드: 3열
- 제품 스크린샷 패널: 전체 콘텐츠 너비 스팬

### Whitespace Philosophy

다크 캔버스 자체가 공백이다. 섹션은 흰색 여백이 아닌 surface-1 패널로의 리프트로 구분된다.

---

## Elevation & Depth

| 레벨 | 처리 | 용도 |
|------|------|------|
| 0 (flat) | 섀도 없음, 보더 없음 | 기본 본문, 히어로 텍스트, 푸터 |
| 1 (charcoal lift) | `{colors.surface-1}` + 1px `{colors.hairline}` | 기본 카드, 제품 패널 |
| 2 (surface-2 lift) | `{colors.surface-2}` + 1px `{colors.hairline-strong}` | 추천 프라이싱 카드, 호버 카드 |
| 3 (surface-3 lift) | `{colors.surface-3}` | 서브 내비, 드롭다운 메뉴 |
| 4 (focus ring) | 2px `{colors.primary-focus}` 아웃라인 50% 불투명도 | 포커스 인풋, 포커스 버튼 |

> Linear의 깊이는 서피스 래더 + 헤어라인 보더로 표현한다. 다크 배경에서 드롭 섀도는 거의 사용하지 않는다.

---

## Shapes

### Border Radius Scale

| 토큰 | 값 | 용도 |
|------|-----|------|
| `{rounded.xs}` | 4px | 소형 칩, 상태 배지 |
| `{rounded.sm}` | 6px | 인라인 태그 |
| `{rounded.md}` | 8px | 모든 버튼, 폼 인풋 |
| `{rounded.lg}` | 12px | 프라이싱 카드, 피처 카드, 테스티모니얼 카드 |
| `{rounded.xl}` | 16px | 제품 스크린샷 패널 |
| `{rounded.xxl}` | 24px | 대형 CTA 배너 (드물게) |
| `{rounded.pill}` | 9999px | 프라이싱 탭 토글, 상태 필 |
| `{rounded.full}` | 9999px | 아바타 원형 |

---

## Components

### Buttons

**`button-primary`** — 라벤더 CTA
- Background `{colors.primary}`, text `{colors.on-primary}`, type `{typography.button}`, padding 8px 14px, rounded `{rounded.md}`
- Hover: background → `{colors.primary-hover}`
- Pressed: background → `{colors.primary-focus}`

**`button-secondary`** — 차콜 버튼
- Background `{colors.surface-1}`, text `{colors.ink}`, type `{typography.button}`, padding 8px 14px, rounded `{rounded.md}`, 1px `{colors.hairline}` 보더

**`button-tertiary`** — 플레인 텍스트 버튼
- Background `{colors.canvas}`, text `{colors.ink}`, type `{typography.button}`, rounded `{rounded.md}`, padding 8px 14px

**`button-inverse`** — 화이트-온-다크 인버스 CTA
- Background `{colors.inverse-canvas}`, text `{colors.inverse-ink}`, type `{typography.button}`, rounded `{rounded.md}`, padding 8px 14px

### Pricing Tabs

**`pricing-tab-default`** + **`pricing-tab-selected`**
- Default: `{colors.canvas}` background, `{colors.ink-subtle}` text, rounded `{rounded.pill}`, padding 6px 14px
- Selected: `{colors.surface-2}` background, `{colors.ink}` text

### Cards & Containers

| 컴포넌트 | Background | Rounded | Padding | 특이사항 |
|----------|------------|---------|---------|----------|
| `pricing-card` | `{colors.surface-1}` | `{rounded.lg}` | 24px | 1px hairline 보더 |
| `pricing-card-featured` | `{colors.surface-2}` | `{rounded.lg}` | 24px | 추천 티어 |
| `feature-card` | `{colors.surface-1}` | `{rounded.lg}` | 24px | 일반 피처 타일 |
| `product-screenshot-card` | `{colors.surface-1}` | `{rounded.xl}` | 24px | 제품 UI 스크린샷 프레임 |
| `testimonial-card` | `{colors.surface-1}` | `{rounded.lg}` | 32px | 고객 인용구 + 아바타 |
| `customer-logo-tile` | `{colors.canvas}` | `{rounded.xs}` | 16px | 고객 로고 마키 |
| `cta-banner` | `{colors.surface-1}` | `{rounded.lg}` | 48px | 페이지 하단 CTA 패널 |

### Inputs & Forms

**`text-input`** + **`text-input-focused`**
- Background `{colors.surface-1}`, text `{colors.ink}`, type `{typography.body}`, rounded `{rounded.md}`, padding 8px 12px
- 포커스: 2px `{colors.primary-focus}` 아웃라인 50% 불투명도

### Status & Navigation

**`status-badge`** — 소형 상태 필
- Background `{colors.surface-2}`, text `{colors.ink-muted}`, type `{typography.caption}`, rounded `{rounded.pill}`, padding 2px 8px

**`top-nav`** — 스티키 다크 바
- Background `{colors.canvas}`, text `{colors.ink}`, type `{typography.body-sm}`, height 56px
- 좌측: 로고 / 중앙: 주요 내비 링크 / 우측: `button-secondary` + `button-primary`

**`footer`** — 다크 캔버스 위 링크 그리드
- Background `{colors.canvas}`, text `{colors.ink-subtle}`, type `{typography.caption}`, padding 64px 32px

---

## Responsive Behavior

### Breakpoints

| 이름 | 너비 | 주요 변경 |
|------|------|-----------|
| Desktop-XL | 1440px | 기본 데스크톱 레이아웃 |
| Desktop | 1280px | 카드 그리드 3열 유지 |
| Tablet | 1024px | 카드 그리드 3열 → 2열 |
| Mobile-Lg | 768px | 프라이싱 비교 아코디언, 내비 햄버거 |
| Mobile | 480px | 단일 컬럼; display-xl 80px → ~36px |

### Collapsing Strategy

- **Top nav**: 768px 미만에서 햄버거로 링크 접기
- **Card grids**: 3열 → 2열(1024px) → 1열(768px 미만)
- **Pricing comparison**: 768px 미만에서 티어별 아코디언
- **Display type**: `display-xl` 80px → `display-md` 40px으로 모바일 스케일

### Touch Targets

- CTA: 최소 40px 탭 높이
- 프라이싱 탭 필: 최소 36px (터치 뷰포트 44px 이상)
- 폼 인풋: 최소 44px 탭 타겟

---

## Do's and Don'ts

### Do ✅

- `{colors.canvas}` (#010102)를 시스템 앵커 서피스로 예약 — 미세 블루 틴트는 의도적
- `{colors.primary}` 라벤더는 브랜드 마크, 기본 CTA, 포커스 링, 링크 강조에만 사용
- 위계를 위해 4단계 서피스 래더 사용 — 레벨 건너뛰기 금지
- 디스플레이 웨이트 600과 본문 웨이트 400 조합
- 디스플레이에 공격적 음수 자간 적용
- 모든 섹션의 주인공으로 제품 UI 스크린샷 사용
- CTA는 `{rounded.md}` 8px 코너 사용

### Don't ❌

- 라이트 모드 마케팅 페이지 출시 금지
- 라벤더를 섹션 배경이나 카드 필로 사용 금지
- 두 번째 크로매틱 액센트(오렌지, 핑크, 그린) 도입 금지
- 대기 그라디언트 또는 스포트라이트 카드 추가 금지
- CTA 필 형태(pill) 라운딩 금지
- `#000000` 순수 블랙을 캔버스로 사용 금지
- 제품 스크린샷 목업에 여러 밝은 액센트 조합 금지

---

## Iteration Guide

1. 한 번에 하나의 컴포넌트에 집중하고 `components:` 토큰 이름으로 참조
2. 섹션 도입 시 먼저 어떤 서피스 리프트에 위치할지 결정
3. 본문 기본값은 `{typography.body}` weight 400
4. 새 변형은 별도 컴포넌트 항목으로 추가
5. 라벤더는 희소하게 — 브랜드 마크, 기본 CTA, 포커스, 링크 강조
6. 모든 섹션을 제품 UI 스크린샷으로 시작

---

## Known Gaps

- 4단계 서피스 래더 값은 Linear의 CSS 변수에서 직접 추출
- 폼 필드 오류 및 유효성 검사 스타일 미문서화 (대상 페이지에서 미노출)
- 라이트 모드 미문서화 — 마케팅 사이트가 라이트 테마를 출시하지 않음
- Linear 실제 제품 UI는 더 풍부한 컬러 태그 팔레트 사용 (이슈 우선순위, 프로젝트 레이블)
- 커스텀 디스플레이/텍스트/모노 패밀리는 독점 — 오픈소스 대체재 허용
