import type { Metadata } from 'next';
import Link from 'next/link';
import { QnaReplyPanel } from '@/components/instructor/QnaReplyPanel';
import uiData from '@/data/uiData.json';
import type { Qna } from '@/types';

const texts = uiData.instructor.qna;

export const metadata: Metadata = {
  title: texts.detailTitle,
};

interface QnaDetailPageProps {
  params: Promise<{ id: string }>;
}

// TODO: Replace with actual API call to GET /api/admin/instructor/qna/{id}
const mockQnaMap: Record<string, Qna> = {
  '1': { id: 1, courseId: 1, courseTitle: 'React 완전 정복', studentName: '김철수', question: 'useEffect에서 cleanup 함수는 언제 호출되나요?', status: 'PENDING', createdAt: '2026-03-15T10:30:00' },
  '2': { id: 2, courseId: 1, courseTitle: 'React 완전 정복', studentName: '이영희', question: 'useState와 useRef의 차이점이 궁금합니다.', answer: 'useState는 리렌더링을 유발하고 useRef는 유발하지 않습니다.', status: 'ANSWERED', createdAt: '2026-03-10T14:00:00', answeredAt: '2026-03-11T09:00:00' },
  '3': { id: 3, courseId: 2, courseTitle: 'TypeScript 기초부터 실전까지', studentName: '박민수', question: 'Generic에서 extends 키워드는 어떤 역할을 하나요?', status: 'PENDING', createdAt: '2026-03-18T16:20:00' },
  '4': { id: 4, courseId: 2, courseTitle: 'TypeScript 기초부터 실전까지', studentName: '정수연', question: 'interface와 type alias의 차이를 알고 싶습니다.', answer: '대부분의 경우 동일하게 사용할 수 있지만 몇 가지 차이가 있습니다.', status: 'CLOSED', createdAt: '2026-02-28T11:00:00', answeredAt: '2026-03-01T08:30:00' },
};

export default async function QnaDetailPage({ params }: QnaDetailPageProps) {
  const { id } = await params;

  // TODO: Fetch from API - GET /api/admin/instructor/qna/{id}
  const qna = mockQnaMap[id];

  if (!qna) return null;

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="flex items-center gap-2">
        <Link
          href="/instructor/qna"
          className="text-sm text-muted-foreground hover:underline"
        >
          {texts.pageTitle}
        </Link>
        <span className="text-sm text-muted-foreground">/</span>
        <h1 className="text-2xl font-bold">{texts.detailTitle}</h1>
      </div>
      <QnaReplyPanel qna={qna} />
    </div>
  );
}
