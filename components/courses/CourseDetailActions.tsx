'use client';

import { CourseStatusToggle } from '@/components/courses/CourseStatusToggle';
import { CoursePublishRequest } from '@/components/courses/CoursePublishRequest';
import type { AdminRole, Course } from '@/types';

interface CourseDetailActionsProps {
  course: Course;
  role: AdminRole;
}

export function CourseDetailActions({ course, role }: CourseDetailActionsProps) {
  const isSuperAdmin = role === 'SUPER_ADMIN';
  const isInstructor = role === 'INSTRUCTOR';
  const canPublishRequest = isInstructor && course.status === 'DRAFT';
  const canToggleStatus = isSuperAdmin && (course.status === 'PUBLISHED' || course.status === 'UNPUBLISHED');

  if (!canPublishRequest && !canToggleStatus) return null;

  return (
    <div className="flex items-center gap-4">
      {canToggleStatus && (
        <CourseStatusToggle
          courseId={course.id}
          currentStatus={course.status}
        />
      )}
      {canPublishRequest && (
        <CoursePublishRequest courseId={course.id} />
      )}
    </div>
  );
}
