'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { formatDate } from '@/lib/format';
import type { SupportTicket, TicketStatus } from '@/types';

interface TicketDetailCardProps {
  ticket: SupportTicket;
}

const statusVariantMap: Record<TicketStatus, 'warning' | 'default' | 'success' | 'secondary'> = {
  PENDING: 'warning',
  IN_PROGRESS: 'default',
  RESOLVED: 'success',
  CLOSED: 'secondary',
};

const statusLabelMap: Record<TicketStatus, string> = {
  PENDING: '대기',
  IN_PROGRESS: '처리중',
  RESOLVED: '해결',
  CLOSED: '종료',
};

export function TicketDetailCard({ ticket }: TicketDetailCardProps) {
  const [reply, setReply] = useState('');

  function handleSubmitReply() {
    // TODO: Replace with actual API call to submit reply
    // eslint-disable-next-line no-console
    console.log('TODO: Submit reply', { ticketId: ticket.id, reply });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">문의 내용</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">회원</dt>
              <dd className="font-medium">{ticket.memberName}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">이메일</dt>
              <dd>{ticket.memberEmail}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground">제목</dt>
              <dd className="font-medium">{ticket.title}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground">내용</dt>
              <dd className="whitespace-pre-wrap">{ticket.content}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">상태</dt>
              <dd>
                <StatusBadge
                  label={statusLabelMap[ticket.status]}
                  variant={statusVariantMap[ticket.status]}
                />
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">접수일</dt>
              <dd>{formatDate(ticket.createdAt)}</dd>
            </div>
            {ticket.resolvedAt && (
              <div>
                <dt className="text-muted-foreground">해결일</dt>
                <dd>{formatDate(ticket.resolvedAt)}</dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">답변</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reply">답변 내용</Label>
              <Textarea
                id="reply"
                placeholder="답변을 입력하세요"
                rows={5}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
            </div>
            <Button onClick={handleSubmitReply} disabled={!reply.trim()}>
              답변 등록
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
