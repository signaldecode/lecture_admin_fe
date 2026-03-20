'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { formatDateTime } from '@/lib/format';
import type { Qna, QnaStatus } from '@/types';
import uiData from '@/data/uiData.json';

const qnaTexts = uiData.instructor.qna;

interface QnaReplyPanelProps {
  qna: Qna;
}

const statusVariantMap: Record<QnaStatus, 'warning' | 'success' | 'secondary'> = {
  PENDING: 'warning',
  ANSWERED: 'success',
  CLOSED: 'secondary',
};

const statusLabelMap = qnaTexts.statusLabels as Record<QnaStatus, string>;

export function QnaReplyPanel({ qna }: QnaReplyPanelProps) {
  const [answer, setAnswer] = useState(qna.answer ?? '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasExistingAnswer = !!qna.answer;

  const handleSubmit = () => {
    setIsSubmitting(true);
    // TODO: Call Q&A answer API - POST/PUT /api/admin/instructor/qna/{qna.id}/answer
    console.log('QnA answer submitted:', { qnaId: qna.id, answer });
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{qnaTexts.questionLabel}</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">{qnaTexts.courseLabel}</dt>
              <dd className="font-medium">{qna.courseTitle}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{qnaTexts.studentLabel}</dt>
              <dd className="font-medium">{qna.studentName}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{qnaTexts.createdAtLabel}</dt>
              <dd>{formatDateTime(qna.createdAt)}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{qnaTexts.statusLabel}</dt>
              <dd>
                <StatusBadge
                  label={statusLabelMap[qna.status]}
                  variant={statusVariantMap[qna.status]}
                />
              </dd>
            </div>
          </dl>
          <Separator className="my-4" />
          <p className="whitespace-pre-wrap text-sm">{qna.question}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{qnaTexts.answerLabel}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="qna-answer">{qnaTexts.answerLabel}</Label>
            <Textarea
              id="qna-answer"
              className="resize-none"
              placeholder={qnaTexts.answerPlaceholder}
              rows={6}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !answer.trim()}
          >
            {hasExistingAnswer ? qnaTexts.updateButton : qnaTexts.submitButton}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
