'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { formatDate, formatNumber } from '@/lib/format';
import type { Member, MemberGrade, MemberStatus } from '@/types';

interface MemberDetailCardProps {
  member: Member;
}

const gradeLabelMap: Record<MemberGrade, string> = {
  BASIC: '일반',
  SILVER: '실버',
  GOLD: '골드',
  PLATINUM: '플래티넘',
};

const statusLabelMap: Record<MemberStatus, string> = {
  ACTIVE: '활성',
  SUSPENDED: '정지',
  WITHDRAWN: '탈퇴',
};

const statusVariantMap: Record<MemberStatus, 'success' | 'destructive' | 'secondary'> = {
  ACTIVE: 'success',
  SUSPENDED: 'destructive',
  WITHDRAWN: 'secondary',
};

export function MemberDetailCard({ member }: MemberDetailCardProps) {
  const initials = member.name.slice(0, 2);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">회원 정보</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          <Avatar className="size-16">
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div className="grid gap-3 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">{member.name}</h2>
              <StatusBadge
                label={statusLabelMap[member.status]}
                variant={statusVariantMap[member.status]}
              />
            </div>
            <dl className="grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground">이메일</dt>
                <dd>{member.email}</dd>
              </div>
              {member.phone && (
                <div>
                  <dt className="text-muted-foreground">전화번호</dt>
                  <dd>{member.phone}</dd>
                </div>
              )}
              <div>
                <dt className="text-muted-foreground">등급</dt>
                <dd>{gradeLabelMap[member.grade]}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">포인트</dt>
                <dd>{formatNumber(member.point)}P</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">가입일</dt>
                <dd>{formatDate(member.createdAt)}</dd>
              </div>
              {member.lastLoginAt && (
                <div>
                  <dt className="text-muted-foreground">마지막 로그인</dt>
                  <dd>{formatDate(member.lastLoginAt)}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
