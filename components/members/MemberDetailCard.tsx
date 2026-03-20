'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { formatDate, formatNumber } from '@/lib/format';
import type { Member, MemberGrade, MemberStatus } from '@/types';
import uiData from '@/data/uiData.json';

const texts = uiData.members;
const detailTexts = texts.detail;

interface MemberDetailCardProps {
  member: Member;
}

const gradeLabelMap = texts.gradeLabels as Record<MemberGrade, string>;

const statusLabelMap = texts.statusLabels as Record<MemberStatus, string>;

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
        <CardTitle className="text-base">{detailTexts.cardTitle}</CardTitle>
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
                <dt className="text-muted-foreground">{detailTexts.emailLabel}</dt>
                <dd>{member.email}</dd>
              </div>
              {member.phone && (
                <div>
                  <dt className="text-muted-foreground">{detailTexts.phoneLabel}</dt>
                  <dd>{member.phone}</dd>
                </div>
              )}
              <div>
                <dt className="text-muted-foreground">{detailTexts.gradeLabel}</dt>
                <dd>{gradeLabelMap[member.grade]}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{detailTexts.pointLabel}</dt>
                <dd>{formatNumber(member.point)}P</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{detailTexts.createdAtLabel}</dt>
                <dd>{formatDate(member.createdAt)}</dd>
              </div>
              {member.lastLoginAt && (
                <div>
                  <dt className="text-muted-foreground">{detailTexts.lastLoginAtLabel}</dt>
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
