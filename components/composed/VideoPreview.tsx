'use client';

import { FileVideo, RefreshCw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import uiData from '@/data/uiData.json';

const texts = uiData.courses.upload;

interface VideoPreviewProps {
  fileName: string;
  fileSize: number;
  duration?: number;
  previewUrl?: string;
  onReupload?: () => void;
  onRemove?: () => void;
  className?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function formatDuration(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

export function VideoPreview({
  fileName,
  fileSize,
  duration,
  previewUrl,
  onReupload,
  onRemove,
  className,
}: VideoPreviewProps) {
  return (
    <div className={cn('rounded-lg border bg-muted/30 p-4', className)}>
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-md bg-muted">
          {previewUrl ? (
            <video
              src={previewUrl}
              className="h-full w-full object-cover"
              muted
              preload="metadata"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <FileVideo className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-1">
          <p className="truncate text-sm font-medium">{fileName}</p>
          <p className="text-xs text-muted-foreground">
            {duration !== undefined && `${formatDuration(duration)} · `}
            {formatFileSize(fileSize)}
          </p>
          <div className="flex gap-2 pt-1">
            {onReupload && (
              <Button
                variant="outline"
                size="sm"
                className="h-7 gap-1.5 text-xs"
                onClick={onReupload}
              >
                <RefreshCw className="h-3 w-3" />
                {texts.reupload}
              </Button>
            )}
            {onRemove && (
              <Button
                variant="outline"
                size="sm"
                className="h-7 gap-1.5 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={onRemove}
              >
                <Trash2 className="h-3 w-3" />
                {texts.removeFile}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
