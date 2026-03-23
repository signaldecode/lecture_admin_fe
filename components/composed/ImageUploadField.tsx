'use client';

import { useCallback, useState } from 'react';
import { RefreshCw, Trash2, ImageIcon } from 'lucide-react';
import { FileUploadZone } from '@/components/composed/FileUploadZone';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import uiData from '@/data/uiData.json';

const texts = uiData.common.imageUpload;

const IMAGE_CONFIG = {
  accept: 'image/jpeg,image/png,image/webp,image/gif',
  maxSizeBytes: 5 * 1024 * 1024,
  allowedExtensions: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
  allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  texts: {
    dropzoneText: texts.dropzoneText,
    dropzoneActiveText: texts.dropzoneActiveText,
    acceptedFormats: texts.acceptedFormats,
    maxFileSize: texts.maxFileSize,
    fileSizeError: texts.fileSizeError,
    fileTypeError: texts.fileTypeError,
  },
} as const;

interface ImageUploadFieldProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
}

export function ImageUploadField({
  value,
  onChange,
  className,
}: ImageUploadFieldProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const displayUrl = previewUrl ?? value;

  const handleFileDrop = useCallback(
    (file: File) => {
      setError(null);
      // 기존 blob URL 해제
      if (previewUrl) URL.revokeObjectURL(previewUrl);

      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      // TODO: 실제 S3 업로드 후 URL로 교체
      onChange(objectUrl);
    },
    [previewUrl, onChange],
  );

  const handleRemove = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setError(null);
    onChange('');
  }, [previewUrl, onChange]);

  const handleReupload = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setError(null);
  }, [previewUrl]);

  const handleError = useCallback((message: string) => {
    setError(message);
  }, []);

  // 이미지가 있는 경우 미리보기
  if (displayUrl) {
    return (
      <div className={cn('space-y-2', className)}>
        <div className="relative overflow-hidden rounded-lg border bg-muted">
          <div className="flex items-center gap-4 p-3">
            <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-md bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={displayUrl}
                alt=""
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <p className="truncate text-sm text-muted-foreground">
                {displayUrl.startsWith('blob:') ? previewUrl ? 'uploaded-image' : '' : displayUrl}
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1.5 text-xs"
                  onClick={handleReupload}
                >
                  <RefreshCw className="h-3 w-3" />
                  {texts.changeImage}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1.5 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={handleRemove}
                >
                  <Trash2 className="h-3 w-3" />
                  {texts.removeImage}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 이미지가 없는 경우 드래그앤드롭 영역
  return (
    <div className={cn('space-y-2', className)}>
      <FileUploadZone
        accept={IMAGE_CONFIG.accept}
        maxSizeBytes={IMAGE_CONFIG.maxSizeBytes}
        allowedExtensions={[...IMAGE_CONFIG.allowedExtensions]}
        allowedMimeTypes={[...IMAGE_CONFIG.allowedMimeTypes]}
        texts={IMAGE_CONFIG.texts}
        ariaLabel={texts.ariaLabel}
        onFileDrop={handleFileDrop}
        onError={handleError}
        className="p-6"
      />
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
