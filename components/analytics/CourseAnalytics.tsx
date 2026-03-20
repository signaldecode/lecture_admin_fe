'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatCard } from '@/components/composed/StatCard';
import { formatNumber, formatPercent, formatCurrency } from '@/lib/format';
import type { CourseStats } from '@/types';

const mockData: CourseStats[] = [
  { courseId: 1, courseTitle: 'React 완전 정복', studentCount: 342, completionRate: 68.5, revenue: 30438000 },
  { courseId: 2, courseTitle: 'TypeScript 기초부터 실전까지', studentCount: 518, completionRate: 72.1, revenue: 30562000 },
  { courseId: 3, courseTitle: 'Next.js 16 마스터클래스', studentCount: 156, completionRate: 45.3, revenue: 15444000 },
  { courseId: 4, courseTitle: 'Spring Boot 실전 가이드', studentCount: 289, completionRate: 61.8, revenue: 22831000 },
  { courseId: 5, courseTitle: 'Python 데이터 분석', studentCount: 412, completionRate: 55.7, revenue: 24720000 },
];

export function CourseAnalytics() {
  const totalStudents = mockData.reduce((s, d) => s + d.studentCount, 0);
  const avgCompletion = mockData.reduce((s, d) => s + d.completionRate, 0) / mockData.length;

  return (
    <div className="space-y-6 pt-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="총 수강생" value={formatNumber(totalStudents)} unit="명" icon="UserCheck" />
        <StatCard title="평균 완료율" value={formatPercent(avgCompletion)} icon="CheckCircle" />
        <StatCard title="강의 수" value={formatNumber(mockData.length)} unit="개" icon="BookOpen" />
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">강의별 수강 현황</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>강의명</TableHead>
                <TableHead>수강생</TableHead>
                <TableHead>완료율</TableHead>
                <TableHead>매출</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((course) => (
                <TableRow key={course.courseId}>
                  <TableCell className="font-medium">{course.courseTitle}</TableCell>
                  <TableCell>{formatNumber(course.studentCount)}명</TableCell>
                  <TableCell>{formatPercent(course.completionRate)}</TableCell>
                  <TableCell>{formatCurrency(course.revenue)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
