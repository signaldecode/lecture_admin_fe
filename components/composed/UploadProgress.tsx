'use client';

import { FileVideo, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import uiData from '@/data/uiData.json';
import type { UploadStatus } from '@/types';

const texts = uiData.courses.upload;

interface UploadProgressProps {
  fileName: string;
  fileSize: number;
  progress: number;
  status: UploadStatus;
  errorMessage?: string;
  onCancel?: () => void;
  onRetry?: () => void;
  className?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export function UploadProgress({
  fileName,
  fileSize,
  progress,
  status,
  errorMessage,
  onCancel,
  onRetry,
  className,
}: UploadProgressProps) {
  const isUploading = status === 'uploading';
  const isError = status === 'error';
  const isCompleted = status === 'completed';

  return (
    <div
      className={cn(
        'rounded-lg border p-4',
        isError && 'border-destructive/50 bg-destructive/5',
        isCompleted && 'border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-900/10',
        className,
      )}
      aria-label={texts.progressAriaLabel}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
            isError ? 'bg-destructive/10' : 'bg-muted',
          )}
        >
          <FileVideo
            className={cn(
              'h-5 w-5',
              isError ? 'text-destructive' : 'text-muted-foreground',
            )}
          />
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm font-medium">{fileName}</p>
            <div className="flex shrink-0 items-center gap-1">
              {isUploading && onCancel && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={onCancel}
                  aria-label={texts.cancelUpload}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              {isError && onRetry && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={onRetry}
                  aria-label={texts.retryUpload}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <Progress value={progress}>
            <ProgressLabel className="sr-only">{texts.progressAriaLabel}</ProgressLabel>
            <ProgressValue />
          </Progress>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatFileSize(fileSize)}</span>
            <span>
              {isUploading && texts.uploading}
              {isCompleted && texts.uploadComplete}
              {isError && (errorMessage ?? texts.uploadError)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
