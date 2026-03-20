import type { Metadata } from 'next';
import Link from 'next/link';
import { ReviewReplyForm } from '@/components/instructor/ReviewReplyForm';
import uiData from '@/data/uiData.json';
import type { Review } from '@/types';

const texts = uiData.instructor.reviews;

export const metadata: Metadata = {
  title: texts.detailTitle,
};

interface ReviewDetailPageProps {
  params: Promise<{ id: string }>;
}

// TODO: Replace with actual API call to GET /api/admin/instructor/reviews/{id}
const mockReviewMap: Record<string, Review> = {
  '1': { id: 1, courseId: 1, courseTitle: 'React 완전 정복', studentName: '김철수', rating: 5, content: '정말 유익한 강의였습니다. 실무에 바로 적용할 수 있었어요.', reply: '감사합니다! 앞으로도 좋은 강의 만들겠습니다.', createdAt: '2026-03-10T00:00:00' },
  '2': { id: 2, courseId: 1, courseTitle: 'React 완전 정복', studentName: '이영희', rating: 4, content: '전반적으로 좋지만 후반부 내용이 조금 어렵습니다.', createdAt: '2026-03-12T00:00:00' },
  '3': { id: 3, courseId: 2, courseTitle: 'TypeScript 기초부터 실전까지', studentName: '박민수', rating: 5, content: '타입스크립트를 처음 배우는 사람에게 강력 추천합니다.', reply: '추천 감사합니다!', createdAt: '2026-02-25T00:00:00' },
  '4': { id: 4, courseId: 2, courseTitle: 'TypeScript 기초부터 실전까지', studentName: '정수연', rating: 3, content: '예제가 더 다양했으면 좋겠습니다.', createdAt: '2026-03-05T00:00:00' },
};

export default async function ReviewDetailPage({ params }: ReviewDetailPageProps) {
  const { id } = await params;
  const review = mockReviewMap[id];
  if (!review) return null;

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="flex items-center gap-2">
        <Link href="/instructor/reviews" className="text-sm text-muted-foreground hover:underline">
          {texts.pageTitle}
        </Link>
        <span className="text-sm text-muted-foreground">/</span>
        <h1 className="text-2xl font-bold">{texts.detailTitle}</h1>
      </div>
      <ReviewReplyForm review={review} />
    </div>
  );
}
