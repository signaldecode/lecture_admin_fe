'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ConfirmDialog } from '@/components/composed/ConfirmDialog';
import type { CourseStatus } from '@/types';

interface CourseStatusToggleProps {
  courseId: number;
  currentStatus: CourseStatus;
  onStatusChange?: (newStatus: CourseStatus) => void;
}

export function CourseStatusToggle({
  courseId,
  currentStatus,
  onStatusChange,
}: CourseStatusToggleProps) {
  const isPublished = currentStatus === 'PUBLISHED';
  const [confirmOpen, setConfirmOpen] = useState(false);

  function handleToggle() {
    setConfirmOpen(true);
  }

  function handleConfirm() {
    const newStatus: CourseStatus = isPublished ? 'UNPUBLISHED' : 'PUBLISHED';
    // TODO: apiClient.patch(`courses/${courseId}/status`, { status: newStatus })
    onStatusChange?.(newStatus);
    setConfirmOpen(false);
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Switch
          id={`course-status-${courseId}`}
          checked={isPublished}
          onCheckedChange={handleToggle}
        />
        <Label htmlFor={`course-status-${courseId}`}>
          {isPublished ? '공개' : '비공개'}
        </Label>
      </div>
      <ConfirmDialog
        title={isPublished ? '강의 비공개 전환' : '강의 공개 전환'}
        description={
          isPublished
            ? '이 강의를 비공개로 전환하시겠습니까? 수강생은 더 이상 접근할 수 없습니다.'
            : '이 강의를 공개하시겠습니까?'
        }
        confirmLabel="전환"
        onConfirm={handleConfirm}
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
      />
    </>
  );
}
