'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MemberEditForm } from '@/components/members/MemberEditForm';
import { PointAdjustModal } from '@/components/members/PointAdjustModal';
import type { Member } from '@/types';

interface MemberDetailActionsProps {
  member: Member;
}

export function MemberDetailActions({ member }: MemberDetailActionsProps) {
  const [pointModalOpen, setPointModalOpen] = useState(false);

  return (
    <>
      <MemberEditForm member={member} onSave={(values) => alert(`저장: ${JSON.stringify(values)} (목 동작)`)} />

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setPointModalOpen(true)}>
          포인트 조정
        </Button>
      </div>

      <PointAdjustModal
        memberId={member.id}
        memberName={member.name}
        currentPoint={member.point}
        open={pointModalOpen}
        onOpenChange={setPointModalOpen}
        onAdjust={(amount, reason) => alert(`포인트 ${amount > 0 ? '+' : ''}${amount}P / 사유: ${reason} (목 동작)`)}
      />
    </>
  );
}
