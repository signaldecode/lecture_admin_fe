'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/composed/ConfirmDialog';
import { SendHorizonal } from 'lucide-react';

interface CoursePublishRequestProps {
  courseId: number;
  onRequest?: () => void;
}

export function CoursePublishRequest({
  courseId,
  onRequest,
}: CoursePublishRequestProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [requested, setRequested] = useState(false);

  function handleConfirm() {
    // TODO: apiClient.post(`courses/${courseId}/publish-request`)
    setRequested(true);
    onRequest?.();
    setConfirmOpen(false);
  }

  if (requested) {
    return (
      <p className="text-sm text-muted-foreground">발행 요청이 전송되었습니다.</p>
    );
  }

  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setConfirmOpen(true)}>
        <SendHorizonal className="size-4" />
        발행 요청
      </Button>
      <ConfirmDialog
        title="강의 발행 요청"
        description="이 강의를 관리자에게 발행 요청하시겠습니까? 검토 후 승인/거절됩니다."
        confirmLabel="요청"
        onConfirm={handleConfirm}
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
      />
    </>
  );
}
