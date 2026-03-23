'use client';

import { useCallback, useRef, useState } from 'react';
import { FileUploadZone } from '@/components/composed/FileUploadZone';
import { UploadProgress } from '@/components/composed/UploadProgress';
import { VideoPreview } from '@/components/composed/VideoPreview';
import uiData from '@/data/uiData.json';
import type { UploadStatus } from '@/types';

const uploadTexts = uiData.courses.upload;

const VIDEO_UPLOAD_CONFIG = {
  accept: 'video/mp4,video/webm,video/quicktime',
  maxSizeBytes: 2 * 1024 * 1024 * 1024,
  allowedExtensions: ['mp4', 'webm', 'mov'],
  allowedMimeTypes: ['video/mp4', 'video/webm', 'video/quicktime'],
  texts: {
    dropzoneText: uploadTexts.dropzoneText,
    dropzoneActiveText: uploadTexts.dropzoneActiveText,
    acceptedFormats: uploadTexts.acceptedFormats,
    maxFileSize: uploadTexts.maxFileSize,
    fileSizeError: uploadTexts.fileSizeError,
    fileTypeError: uploadTexts.fileTypeError,
  },
  ariaLabel: uploadTexts.videoAriaLabel,
} as const;

interface VideoUploadPanelProps {
  videoUrl?: string;
  onUploadComplete?: (fileInfo: { name: string; size: number; url: string; duration: number }) => void;
  onRemove?: () => void;
}

interface InternalFileState {
  file: File;
  name: string;
  size: number;
  progress: number;
  status: UploadStatus;
  errorMessage?: string;
  previewUrl?: string;
  duration?: number;
}

export function VideoUploadPanel({
  videoUrl,
  onUploadComplete,
  onRemove,
}: VideoUploadPanelProps) {
  const [fileState, setFileState] = useState<InternalFileState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const uploadTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (uploadTimerRef.current) {
      clearInterval(uploadTimerRef.current);
      uploadTimerRef.current = null;
    }
  }, []);

  const getVideoDuration = useCallback((file: File): Promise<number> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };
      video.onerror = () => {
        URL.revokeObjectURL(video.src);
        resolve(0);
      };
      video.src = URL.createObjectURL(file);
    });
  }, []);

  const simulateUpload = useCallback(
    (file: File, previewUrl: string, duration: number) => {
      clearTimer();
      let progress = 0;

      uploadTimerRef.current = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
          progress = 100;
          clearTimer();
          setFileState((prev) =>
            prev ? { ...prev, progress: 100, status: 'completed' } : null,
          );
          onUploadComplete?.({
            name: file.name,
            size: file.size,
            url: previewUrl,
            duration,
          });
          return;
        }
        setFileState((prev) =>
          prev ? { ...prev, progress: Math.round(progress) } : null,
        );
      }, 300);
    },
    [clearTimer, onUploadComplete],
  );

  const handleFileDrop = useCallback(
    async (file: File) => {
      setError(null);
      const previewUrl = URL.createObjectURL(file);
      const duration = await getVideoDuration(file);

      const state: InternalFileState = {
        file,
        name: file.name,
        size: file.size,
        progress: 0,
        status: 'uploading',
        previewUrl,
        duration,
      };

      setFileState(state);
      simulateUpload(file, previewUrl, duration);
    },
    [getVideoDuration, simulateUpload],
  );

  const handleCancel = useCallback(() => {
    clearTimer();
    if (fileState?.previewUrl) {
      URL.revokeObjectURL(fileState.previewUrl);
    }
    setFileState(null);
  }, [clearTimer, fileState]);

  const handleRetry = useCallback(() => {
    if (!fileState) return;
    setFileState((prev) =>
      prev ? { ...prev, progress: 0, status: 'uploading', errorMessage: undefined } : null,
    );
    simulateUpload(fileState.file, fileState.previewUrl ?? '', fileState.duration ?? 0);
  }, [fileState, simulateUpload]);

  const handleReupload = useCallback(() => {
    if (fileState?.previewUrl) {
      URL.revokeObjectURL(fileState.previewUrl);
    }
    setFileState(null);
    setError(null);
  }, [fileState]);

  const handleRemove = useCallback(() => {
    clearTimer();
    if (fileState?.previewUrl) {
      URL.revokeObjectURL(fileState.previewUrl);
    }
    setFileState(null);
    setError(null);
    onRemove?.();
  }, [clearTimer, fileState, onRemove]);

  const handleError = useCallback((message: string) => {
    setError(message);
  }, []);

  // 이미 업로드된 영상이 있고 새 파일 선택이 없는 경우
  if (videoUrl && !fileState) {
    return (
      <VideoPreview
        fileName={videoUrl.split('/').pop() ?? 'video'}
        fileSize={0}
        previewUrl={videoUrl}
        onReupload={handleReupload}
        onRemove={handleRemove}
      />
    );
  }

  // 파일이 선택되어 업로드 중이거나 완료된 경우
  if (fileState) {
    if (fileState.status === 'completed') {
      return (
        <VideoPreview
          fileName={fileState.name}
          fileSize={fileState.size}
          duration={fileState.duration}
          previewUrl={fileState.previewUrl}
          onReupload={handleReupload}
          onRemove={handleRemove}
        />
      );
    }

    return (
      <UploadProgress
        fileName={fileState.name}
        fileSize={fileState.size}
        progress={fileState.progress}
        status={fileState.status}
        errorMessage={fileState.errorMessage}
        onCancel={handleCancel}
        onRetry={handleRetry}
      />
    );
  }

  // 초기 상태: 드래그앤드롭 영역
  return (
    <div className="space-y-2">
      <FileUploadZone
        accept={VIDEO_UPLOAD_CONFIG.accept}
        maxSizeBytes={VIDEO_UPLOAD_CONFIG.maxSizeBytes}
        allowedExtensions={[...VIDEO_UPLOAD_CONFIG.allowedExtensions]}
        allowedMimeTypes={[...VIDEO_UPLOAD_CONFIG.allowedMimeTypes]}
        texts={VIDEO_UPLOAD_CONFIG.texts}
        ariaLabel={VIDEO_UPLOAD_CONFIG.ariaLabel}
        onFileDrop={handleFileDrop}
        onError={handleError}
      />
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
