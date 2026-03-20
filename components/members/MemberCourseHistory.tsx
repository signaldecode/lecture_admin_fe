'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { formatDate, formatPercent } from '@/lib/format';
import uiData from '@/data/uiData.json';

const texts = uiData.members.courseHistory;

interface CourseHistoryItem {
  courseId: number;
  courseTitle: string;
  enrolledAt: string;
  progressRate: number;
  completedAt?: string;
}

interface MemberCourseHistoryProps {
  memberId: number;
}

const mockHistory: CourseHistoryItem[] = [
  { courseId: 1, courseTitle: 'React 완전 정복', enrolledAt: '2025-08-10T00:00:00', progressRate: 85.5 },
  { courseId: 2, courseTitle: 'TypeScript 기초부터 실전까지', enrolledAt: '2025-10-01T00:00:00', progressRate: 100, completedAt: '2025-12-15T00:00:00' },
  { courseId: 4, courseTitle: 'Spring Boot 실전 가이드', enrolledAt: '2026-01-20T00:00:00', progressRate: 32.0 },
];

export function MemberCourseHistory({ memberId }: MemberCourseHistoryProps) {
  // TODO: apiClient.get(`members/${memberId}/courses`)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{texts.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{texts.columns.courseTitle}</TableHead>
              <TableHead>{texts.columns.enrolledAt}</TableHead>
              <TableHead>{texts.columns.progressRate}</TableHead>
              <TableHead>{texts.columns.completedAt}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockHistory.map((item) => (
              <TableRow key={item.courseId}>
                <TableCell className="font-medium">{item.courseTitle}</TableCell>
                <TableCell>{formatDate(item.enrolledAt)}</TableCell>
                <TableCell>
                  <StatusBadge
                    label={formatPercent(item.progressRate)}
                    variant={item.progressRate >= 100 ? 'success' : item.progressRate >= 50 ? 'warning' : 'secondary'}
                  />
                </TableCell>
                <TableCell>{item.completedAt ? formatDate(item.completedAt) : '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
