import type { Metadata } from 'next';
import { CourseDetailTabs } from '@/components/courses/CourseDetailTabs';
import { getServerRole } from '@/lib/auth';
import uiData from '@/data/uiData.json';
import type { Course } from '@/types';

const texts = uiData.courses.detail;

export const metadata: Metadata = {
  title: texts.pageTitle,
};

interface CourseDetailPageProps {
  params: Promise<{ id: string }>;
}

// TODO: Replace with actual API call to GET /api/admin/courses/{id}
const mockCourseMap: Record<string, Course> = {
  '1': { id: 1, title: 'React 완전 정복', description: 'React의 기초부터 심화까지 다루는 강의입니다.\n\nHooks, Context API, 성능 최적화 등을 학습합니다.', instructorId: 1, instructorName: '김강사', categoryId: 1, categoryName: '프론트엔드', price: 89000, status: 'PUBLISHED', difficulty: 'INTERMEDIATE', studentCount: 342, rating: 4.8, createdAt: '2026-01-15T00:00:00', updatedAt: '2026-03-10T00:00:00' },
  '2': { id: 2, title: 'TypeScript 기초부터 실전까지', description: 'TypeScript의 타입 시스템을 깊이 있게 학습합니다.\n\n제네릭, 유틸리티 타입, 고급 패턴까지 다룹니다.', instructorId: 1, instructorName: '김강사', categoryId: 1, categoryName: '프론트엔드', price: 59000, status: 'PUBLISHED', difficulty: 'BEGINNER', studentCount: 518, rating: 4.6, createdAt: '2026-02-01T00:00:00', updatedAt: '2026-03-15T00:00:00' },
  '3': { id: 3, title: 'Next.js 16 마스터클래스', description: 'Next.js 16의 새로운 기능과 App Router를 학습합니다.', instructorId: 2, instructorName: '이강사', categoryId: 1, categoryName: '프론트엔드', price: 99000, status: 'PENDING', difficulty: 'ADVANCED', studentCount: 0, rating: 0, createdAt: '2026-03-18T00:00:00', updatedAt: '2026-03-18T00:00:00' },
  '4': { id: 4, title: 'Spring Boot 실전 가이드', description: 'Spring Boot로 실전 REST API를 구축합니다.', instructorId: 3, instructorName: '박강사', categoryId: 2, categoryName: '백엔드', price: 79000, status: 'DRAFT', difficulty: 'INTERMEDIATE', studentCount: 0, rating: 0, createdAt: '2026-03-20T00:00:00', updatedAt: '2026-03-20T00:00:00' },
};

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { id } = await params;
  const role = await getServerRole();

  // TODO: Fetch from API - GET /api/admin/courses/{id}
  const course = mockCourseMap[id];

  if (!course) return null;

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
      <CourseDetailTabs course={course} role={role ?? 'INSTRUCTOR'} />
    </div>
  );
}
