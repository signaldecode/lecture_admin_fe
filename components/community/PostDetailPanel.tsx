'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { ConfirmDialog } from '@/components/composed/ConfirmDialog';
import { formatDateTime } from '@/lib/format';
import type { CommunityPost, PostStatus } from '@/types';
import uiData from '@/data/uiData.json';

const postTexts = uiData.community.post;
const statusLabels = postTexts.statusLabels;

interface PostDetailPanelProps {
  post: CommunityPost;
}

const statusVariantMap: Record<PostStatus, 'success' | 'secondary' | 'destructive'> = {
  PUBLISHED: 'success',
  UNPUBLISHED: 'secondary',
  DELETED: 'destructive',
};

export function PostDetailPanel({ post }: PostDetailPanelProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleToggleVisibility = () => {
    // TODO: Call toggle visibility API - PATCH /api/admin/community/posts/{post.id}/toggle
    const action = post.status === 'PUBLISHED' ? 'unpublish' : 'publish';
    console.log('Toggle visibility:', { postId: post.id, action });
  };

  const handleDelete = () => {
    // TODO: Call delete API - DELETE /api/admin/community/posts/{post.id}
    console.log('Post deleted:', post.id);
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">{postTexts.authorLabel}</dt>
              <dd className="font-medium">{post.authorName}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{postTexts.categoryLabel}</dt>
              <dd className="font-medium">{post.categoryName}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{postTexts.statusLabel}</dt>
              <dd>
                <StatusBadge
                  label={statusLabels[post.status]}
                  variant={statusVariantMap[post.status]}
                />
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{postTexts.createdAtLabel}</dt>
              <dd>{formatDateTime(post.createdAt)}</dd>
            </div>
          </dl>
          <Separator className="my-4" />
          <section aria-label={postTexts.contentLabel}>
            <h3 className="sr-only">{postTexts.contentLabel}</h3>
            <div className="min-h-24 whitespace-pre-wrap text-sm">
              {/* TODO: post.content is not in CommunityPost type — render when available */}
            </div>
          </section>
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="outline" onClick={handleToggleVisibility}>
            {post.status === 'PUBLISHED'
              ? postTexts.unpublishButton
              : postTexts.publishButton}
          </Button>
          <Button
            variant="destructive"
            onClick={() => setDeleteDialogOpen(true)}
          >
            {postTexts.deleteButton}
          </Button>
        </CardFooter>
      </Card>

      <ConfirmDialog
        title={postTexts.deleteConfirmTitle}
        description={postTexts.deleteConfirmDescription}
        onConfirm={handleDelete}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </>
  );
}
