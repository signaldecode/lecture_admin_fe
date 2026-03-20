@AGENTS.md

# LMS Admin Dashboard — Development Guide

> 기획서: `docs/ADMIN_PROJECT_PLAN.md` 참조

## Project Overview

온라인 강의 플랫폼(LMS) **관리자 대시보드**. 기존 `lecture_frontend`(사용자 사이트)와 분리된 독립 프로젝트.
동일한 Spring REST 백엔드를 공유하되, 관리자 전용 API(`/api/admin/...`)를 사용한다.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.9 (strict, `any` 금지)
- **UI**: React 19 + shadcn/ui (Radix UI 기반) + Tailwind CSS 4
- **State**: Zustand
- **Form**: React Hook Form + Zod
- **Table**: TanStack Table + shadcn/ui DataTable
- **Chart**: Recharts (shadcn/ui Charts wrapper)
- **HTTP**: fetch wrapper (`lib/api.ts`) — 인터셉터로 토큰 갱신
- **Auth**: JWT (httpOnly Cookie), 역할: `SUPER_ADMIN` | `INSTRUCTOR` | `CS_AGENT`

---

## 개발 사고 순서 (항상 이 순서로 설계)

레이아웃 → 페이지 → 컨테이너 → 블록/요소 → UI → 데이터 → 접근성(A11y)

---

## Architecture Rules

### 1. 구조 = 코드, 내용 = data, 스타일 = Tailwind

- **UI 텍스트 하드코딩 금지** — `data/*.json`에서 관리
- **inline style 금지** — Tailwind 유틸리티 클래스만 사용
- **임의의 CSS 파일 생성 금지** — 테마 커스터마이징은 `app/globals.css`의 CSS 변수로
- **`cn()` 유틸 필수** — 조건부 클래스 조합 시 항상 `cn()` (clsx + tailwind-merge) 사용

### 2. shadcn/ui 우선

- UI 컴포넌트가 필요하면 **먼저 shadcn/ui에서 찾고**, 없을 때만 직접 구현
- shadcn/ui 컴포넌트는 `components/ui/`에 복사 방식으로 설치 (`npx shadcn@latest add`)
- 프로젝트 전용 조합 컴포넌트는 `components/composed/`에 배치

### 3. 역할 기반 접근 제어 (3 Roles)

| 역할 | 코드 | 범위 |
|------|------|------|
| 슈퍼관리자 | `SUPER_ADMIN` | 전체 접근 |
| 강사 | `INSTRUCTOR` | 본인 강의 CRUD + 수강생/Q&A/매출 |
| CS 담당 | `CS_AGENT` | 고객센터 + 회원 조회(읽기 전용) |

- 프론트 권한 체크는 **UX 용도**. 실제 보안은 백엔드가 담당
- `proxy.ts` → JWT 검증 + 역할별 라우트 보호 (Next.js 16에서 middleware → proxy로 변경)
- `lib/permissions.ts` → `canAccess(role, path)`, `canPerform(role, action)`
- `components/common/RoleGuard.tsx` → 클라이언트 이중 체크
- 사이드바 메뉴 → `data/sidebarData.json`의 `roles` 필드로 필터링

### 4. API 통신

- 모든 admin API는 `/api/admin/` prefix
- Route Handler(`app/api/proxy/[...path]/route.ts`)를 통해 백엔드로 프록시
- `INSTRUCTOR`가 호출하면 백엔드가 자동으로 본인 데이터만 반환

### 5. 보안

- XSS/CSRF/인젝션 방지
- 토큰 콘솔 노출 금지
- `.env` 파일 커밋 금지

---

## Data 설계 원칙

UI 텍스트 / 이미지 경로 / 섹션 정보 / 접근성용 텍스트 등은
**절대 페이지/컴포넌트에 하드코딩하지 않는다.**
반드시 `data/*.json` 파일에서 관리한다.

**반드시 data에서 가져올 것:**
- 사이드바 메뉴 라벨/아이콘/경로/역할 (`sidebarData.json`)
- 대시보드 위젯 라벨/단위 (`dashboardData.json`)
- 역할별 라우트/기능 접근 권한 (`permissionsData.json`)
- 버튼/상태/에러 메시지 등 공통 UI 문구 (`uiData.json`)
- 이미지 alt 텍스트
- 버튼/링크의 label, aria-label

**필드 네이밍 규칙:**
- `name`, `title`, `label`, `description`, `summary`
- `alt`, `ariaLabel`, `ariaDescription`
- `key`, `path`, `icon`, `roles`
- `slug`, `category`, `level`, `duration`, `price`
- `country`, `city`, `address`, `postalCode`

**data 파일 확장 시:**
- SEO가 필요 없는 admin이지만, 접근성 텍스트(alt/aria)는 반드시 data에서 관리
- 새 도메인 추가 시 해당 도메인의 UI 문구도 `uiData.json`에 추가

---

## 접근성 (A11y) 규칙

관리자 대시보드여도 기본 접근성은 준수한다.
shadcn/ui가 Radix UI 기반이라 기본 a11y가 내장되어 있으나, 추가 속성은 data 기반으로 관리.

- **alt/aria 텍스트**: 항상 `data/*.json`에서 가져온다. 컴포넌트 내부에 문자열 직접 쓰지 않는다
- **키보드 접근성**: 인터랙션 요소는 `<button>`, `<a>`, `<input>` 사용. Tab 순서는 논리적 DOM 순서
- **폼 레이블링**: `<label htmlFor="id">` + `<input id="id">` 매칭 필수
- **시맨틱 마크업**: `<main>`, `<nav>`, `<section>`, `<article>` 등 의미 있는 태그 사용
- **Heading 계층**: 페이지당 H1 1개, 이후 H2 → H3 순서 준수

---

## Folder Structure

```
app/
├─ (auth)/login/              # 통합 로그인
├─ (dashboard)/               # 인증 후 메인 (사이드바+헤더 레이아웃)
│  ├─ page.tsx                # 대시보드 (역할별 위젯)
│  ├─ members/                # 회원 관리
│  ├─ courses/                # 강의 관리 (역할별 스코프)
│  ├─ instructor/             # 강사 전용 (INSTRUCTOR only)
│  ├─ orders/                 # 주문/결제 (SUPER_ADMIN)
│  ├─ coupons/                # 쿠폰 (SUPER_ADMIN)
│  ├─ community/              # 커뮤니티 (SUPER_ADMIN)
│  ├─ support/                # 고객센터 (SUPER_ADMIN, CS_AGENT)
│  ├─ content/                # 콘텐츠 (SUPER_ADMIN)
│  ├─ analytics/              # 통계 (역할별 탭)
│  └─ settings/               # 시스템 설정 (SUPER_ADMIN)
├─ api/                       # Route Handler (프록시, 인증)
components/
├─ ui/                        # shadcn/ui 컴포넌트 (자동 생성)
├─ composed/                  # 프로젝트 전용 조합 컴포넌트
├─ common/                    # 전역 공통 (Header, Sidebar, RoleGuard 등)
├─ dashboard/                 # 대시보드 위젯
├─ [domain]/                  # 도메인별 컴포넌트
data/                         # JSON 데이터 (sidebarData, permissionsData 등)
hooks/                        # 커스텀 훅
lib/                          # 유틸리티 (api, auth, permissions, format, utils)
stores/                       # Zustand 스토어
types/                        # TypeScript 타입
config/                       # 환경 설정
```

---

## Naming Conventions

### 컴포넌트 파일명 (PascalCase)

- 큰 섹션/블록: `XxxContainer.tsx` (예: `CourseDetailContainer.tsx`)
- 소규모 래퍼: `XxxWrap.tsx`
- 범용 박스: `XxxBox.tsx`
- 테이블: `XxxListTable.tsx` (예: `MemberListTable.tsx`)
- 폼: `XxxForm.tsx` (예: `CourseForm.tsx`)
- 모달: `XxxModal.tsx` (예: `RefundProcessModal.tsx`)
- 패널: `XxxPanel.tsx` (예: `TicketReplyPanel.tsx`)

### 리스트 요소

- ul → `XxxList`
- li → `XxxListItem`

### 기타

- 훅: camelCase with `use` prefix (`useAuth.ts`)
- 유틸/lib: camelCase (`format.ts`, `permissions.ts`)
- 타입: PascalCase for types/interfaces, UPPER_SNAKE_CASE for enum-like constants
- 경로 별칭: `@/` → 프로젝트 루트 (`@/components/...`, `@/lib/...`)

### CSS 클래스 (Tailwind 보조)

- 커스텀 클래스가 필요한 경우 kebab-case
- 스타일 용도의 id 사용 금지 (form label용 id/for는 허용)

---

## Development Phases

현재 Phase 1 (MVP) 진행 중:

1. ~~프로젝트 초기화~~ (완료)
2. 인증 + 역할 라우팅
3. 레이아웃 + 역할 사이드바
4. 공통 UI (shadcn/ui)
5. 대시보드 (역할별 위젯)
6. 강의 관리 (역할별 스코프)
7. 회원 관리

---

## Key Patterns

### 페이지 구조
```tsx
// app/(dashboard)/[domain]/page.tsx
// Server Component로 작성, 데이터 fetching은 서버에서
// 클라이언트 인터랙션이 필요한 부분만 Client Component로 분리
```

### 역할별 조건부 렌더링
```tsx
// 같은 페이지에서 역할에 따라 다른 UI 제공
// RoleGuard로 섹션 감싸기 또는 useRole 훅으로 분기
```

### DataTable 패턴
```tsx
// TanStack Table + shadcn/ui Table 조합
// columns 정의 → DataTable 컴포넌트에 전달
// 페이지네이션, 정렬, 필터는 DataTableToolbar/DataTablePagination 사용
```

---

## Backend API 계약 (Spring REST)

모든 admin API는 `/api/admin/` prefix를 사용하며, 관리자 JWT 필수.
상세 엔드포인트는 `docs/ADMIN_PROJECT_PLAN.md` 섹션 5 참조.

**주요 규칙:**
- 프론트 라우팅은 id 기준 (`/courses/[id]`, `/members/[id]`)
- 목록 API는 공통 파라미터: `page`, `pageSize`, `sort`, `query`
- `INSTRUCTOR` 호출 시 백엔드가 `WHERE instructorId = JWT.userId` 자동 적용
- 접근성 텍스트(alt/aria), UI 카피는 data에서 관리 (백엔드에 의존하지 않는다)
- Route Handler(`app/api/proxy/[...path]/route.ts`)로 프록시하여 인증 정책 안정화

---

## Environment Variables

```env
NEXT_PUBLIC_API_BASE=/api
BACKEND_API_BASE=http://localhost:8080
NEXT_PUBLIC_SITE_NAME=LMS Admin
NEXT_PUBLIC_ADMIN_DOMAIN=admin.example.com
```

---

## 금지 사항 (절대)

- inline style
- UI 텍스트/alt/aria 하드코딩 (반드시 data에서)
- `any` 타입 사용
- 임의의 CSS 파일 생성
- data 구조 무시하고 임의 문자열 삽입
- 컴포넌트 내부에 접근성 문자열 직접 작성
- 불필요한 추상화/과설계

---

## MCP 서버 설정

`.mcp.json`에 아래를 구성한다.

```json
{
  "context7": { "type": "http", "url": "https://mcp.context7.com/mcp" },
  "sequential-thinking": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
  },
  "playwright": {
    "type": "stdio",
    "command": "npx",
    "args": ["@playwright/mcp@latest"],
    "env": {}
  }
}
```

---

## Commands

```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
npm run lint     # ESLint
```
