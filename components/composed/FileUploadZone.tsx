'use client';

import { useCallback, useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadZoneTexts {
  dropzoneText: string;
  dropzoneActiveText: string;
  acceptedFormats: string;
  maxFileSize: string;
  fileSizeError: string;
  fileTypeError: string;
}

interface FileUploadZoneProps {
  accept: string;
  maxSizeBytes: number;
  allowedExtensions: string[];
  allowedMimeTypes: string[];
  texts: FileUploadZoneTexts;
  onFileDrop: (file: File) => void;
  onError?: (message: string) => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function FileUploadZone({
  accept,
  maxSizeBytes,
  allowedExtensions,
  allowedMimeTypes,
  texts,
  onFileDrop,
  onError,
  disabled = false,
  className,
  ariaLabel,
}: FileUploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback(
    (file: File): string | null => {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
      if (!allowedExtensions.includes(ext) && !allowedMimeTypes.includes(file.type)) {
        return texts.fileTypeError;
      }
      if (file.size > maxSizeBytes) {
        return texts.fileSizeError;
      }
      return null;
    },
    [maxSizeBytes, allowedExtensions, allowedMimeTypes, texts],
  );

  const handleFile = useCallback(
    (file: File) => {
      const error = validateFile(file);
      if (error) {
        onError?.(error);
        return;
      }
      onFileDrop(file);
    },
    [validateFile, onFileDrop, onError],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragOver(true);
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      if (disabled) return;

      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [disabled, handleFile],
  );

  const handleClick = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      e.target.value = '';
    },
    [handleFile],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick],
  );

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 text-center transition-colors',
        'cursor-pointer hover:border-primary/50 hover:bg-muted/50',
        isDragOver && 'border-primary bg-primary/5',
        disabled && 'pointer-events-none cursor-default opacity-50',
        className,
      )}
    >
      <div
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-full bg-muted',
          isDragOver && 'bg-primary/10',
        )}
      >
        <Upload
          className={cn(
            'h-6 w-6 text-muted-foreground',
            isDragOver && 'text-primary',
          )}
        />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium">
          {isDragOver ? texts.dropzoneActiveText : texts.dropzoneText}
        </p>
        <p className="text-xs text-muted-foreground">
          {texts.acceptedFormats} · {texts.maxFileSize}
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
        aria-hidden="true"
      />
    </div>
  );
}
