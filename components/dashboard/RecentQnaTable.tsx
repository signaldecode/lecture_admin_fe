'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatRelativeDate } from '@/lib/format';
import dashboardData from '@/data/dashboardData.json';

interface QnaItem {
  id: number;
  courseTitle: string;
  question: string;
  studentName: string;
  createdAt: string;
  isAnswered: boolean;
}

interface RecentQnaTableProps {
  items: QnaItem[];
}

const texts = dashboardData.tables.recentQna;

export function RecentQnaTable({ items }: RecentQnaTableProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">{texts.title}</CardTitle>
        <Link
          href={texts.viewAllPath}
          className="text-sm text-muted-foreground hover:underline"
        >
          {texts.viewAllLabel}
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>강의</TableHead>
              <TableHead>질문</TableHead>
              <TableHead>수강생</TableHead>
              <TableHead>답변</TableHead>
              <TableHead>등록일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="max-w-[150px] truncate">
                  {item.courseTitle}
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {item.question}
                </TableCell>
                <TableCell>{item.studentName}</TableCell>
                <TableCell>
                  <span
                    className={
                      item.isAnswered
                        ? 'text-green-600'
                        : 'text-yellow-600 font-medium'
                    }
                  >
                    {item.isAnswered ? '완료' : '대기'}
                  </span>
                </TableCell>
                <TableCell>{formatRelativeDate(item.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
