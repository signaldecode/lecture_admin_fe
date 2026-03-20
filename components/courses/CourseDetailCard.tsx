'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { formatCurrency, formatDate, formatNumber } from '@/lib/format';
import uiData from '@/data/uiData.json';
import type { Course, CourseStatus } from '@/types';

interface CourseDetailCardProps {
  course: Course;
}

const texts = uiData.courses;
const detailTexts = texts.detail;
const statusLabelMap = texts.statusLabels as Record<CourseStatus, string>;
const difficultyLabelMap = texts.difficultyLabels as Record<string, string>;

const statusVariantMap: Record<CourseStatus, 'secondary' | 'warning' | 'success' | 'destructive'> = {
  DRAFT: 'secondary',
  PENDING: 'warning',
  PUBLISHED: 'success',
  UNPUBLISHED: 'destructive',
};

export function CourseDetailCard({ course }: CourseDetailCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">{detailTexts.cardTitle}</CardTitle>
        <Link
          href={`/courses/${course.id}/edit`}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80"
        >
          {detailTexts.editButton}
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">{course.title}</h2>
          <StatusBadge
            label={statusLabelMap[course.status]}
            variant={statusVariantMap[course.status]}
          />
        </div>

        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">{detailTexts.instructorLabel}</dt>
            <dd className="font-medium">{course.instructorName}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{detailTexts.categoryLabel}</dt>
            <dd>{course.categoryName}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{detailTexts.difficultyLabel}</dt>
            <dd>{difficultyLabelMap[course.difficulty] ?? course.difficulty}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{detailTexts.priceLabel}</dt>
            <dd>{formatCurrency(course.price)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{detailTexts.studentCountLabel}</dt>
            <dd>{formatNumber(course.studentCount)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{detailTexts.ratingLabel}</dt>
            <dd>{course.rating > 0 ? `${course.rating} / 5.0` : '-'}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{detailTexts.createdAtLabel}</dt>
            <dd>{formatDate(course.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{detailTexts.updatedAtLabel}</dt>
            <dd>{formatDate(course.updatedAt)}</dd>
          </div>
        </dl>

        <Separator />

        <div>
          <dt className="text-sm text-muted-foreground mb-1">{detailTexts.descriptionLabel}</dt>
          <dd className="whitespace-pre-wrap text-sm">{course.description}</dd>
        </div>
      </CardContent>
    </Card>
  );
}
