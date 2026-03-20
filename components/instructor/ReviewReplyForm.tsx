'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import type { Review } from '@/types';
import uiData from '@/data/uiData.json';

const reviewTexts = uiData.instructor.review;

interface ReviewReplyFormProps {
  review: Review;
}

function renderStars(rating: number): string {
  const filled = Math.round(rating);
  const empty = 5 - filled;
  return '\u2605'.repeat(filled) + '\u2606'.repeat(empty);
}

export function ReviewReplyForm({ review }: ReviewReplyFormProps) {
  const [reply, setReply] = useState(review.reply ?? '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasExistingReply = !!review.reply;

  const handleSubmit = () => {
    setIsSubmitting(true);
    // TODO: Call review reply API - POST/PUT /api/admin/instructor/reviews/{review.id}/reply
    console.log('Review reply submitted:', { reviewId: review.id, reply });
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{reviewTexts.contentLabel}</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">{reviewTexts.courseLabel}</dt>
              <dd className="font-medium">{review.courseTitle}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{reviewTexts.studentLabel}</dt>
              <dd className="font-medium">{review.studentName}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{reviewTexts.ratingLabel}</dt>
              <dd className="text-yellow-500">{renderStars(review.rating)}</dd>
            </div>
          </dl>
          <Separator className="my-4" />
          <p className="whitespace-pre-wrap text-sm">{review.content}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{reviewTexts.replyLabel}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="review-reply">{reviewTexts.replyLabel}</Label>
            <Textarea
              id="review-reply"
              placeholder={reviewTexts.replyPlaceholder}
              rows={5}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !reply.trim()}
          >
            {hasExistingReply ? reviewTexts.updateButton : reviewTexts.submitButton}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
