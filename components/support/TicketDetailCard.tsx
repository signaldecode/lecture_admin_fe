'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { formatDate } from '@/lib/format';
import type { SupportTicket, TicketStatus } from '@/types';
import uiData from '@/data/uiData.json';

const texts = uiData.support.ticketDetail;

interface TicketDetailCardProps {
  ticket: SupportTicket;
}

const statusVariantMap: Record<TicketStatus, 'warning' | 'default' | 'success' | 'secondary'> = {
  PENDING: 'warning',
  IN_PROGRESS: 'default',
  RESOLVED: 'success',
  CLOSED: 'secondary',
};

const statusLabelMap = texts.statusLabels as Record<TicketStatus, string>;

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
          <CardTitle className="text-base">{texts.inquiryTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">{texts.memberLabel}</dt>
              <dd className="font-medium">{ticket.memberName}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{texts.emailLabel}</dt>
              <dd>{ticket.memberEmail}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground">{texts.titleLabel}</dt>
              <dd className="font-medium">{ticket.title}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground">{texts.contentLabel}</dt>
              <dd className="whitespace-pre-wrap">{ticket.content}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{texts.statusLabel}</dt>
              <dd>
                <StatusBadge
                  label={statusLabelMap[ticket.status]}
                  variant={statusVariantMap[ticket.status]}
                />
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{texts.createdAtLabel}</dt>
              <dd>{formatDate(ticket.createdAt)}</dd>
            </div>
            {ticket.resolvedAt && (
              <div>
                <dt className="text-muted-foreground">{texts.resolvedAtLabel}</dt>
                <dd>{formatDate(ticket.resolvedAt)}</dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{texts.replyTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reply">{texts.replyLabel}</Label>
              <Textarea
                id="reply"
                placeholder={texts.replyPlaceholder}
                rows={5}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
            </div>
            <Button onClick={handleSubmitReply} disabled={!reply.trim()}>
              {texts.replyButton}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
