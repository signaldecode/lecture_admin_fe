'use client';

import { useCallback, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { VideoUploadPanel } from '@/components/courses/VideoUploadPanel';
import { cn } from '@/lib/utils';
import uiData from '@/data/uiData.json';
import type { Lesson } from '@/types';

const texts = uiData.courses.curriculum;

interface LessonItemProps {
  lesson: Lesson;
  onUpdate: (lesson: Lesson) => void;
  onDelete: (lessonId: number) => void;
  isDragOverlay?: boolean;
}

export function LessonItem({
  lesson,
  onUpdate,
  onDelete,
  isDragOverlay = false,
}: LessonItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `lesson-${lesson.id}`,
    data: { type: 'lesson', lesson },
    disabled: isDragOverlay,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdate({ ...lesson, title: e.target.value });
    },
    [lesson, onUpdate],
  );

  const handleFreeToggle = useCallback(
    (checked: boolean) => {
      onUpdate({ ...lesson, isFree: checked });
    },
    [lesson, onUpdate],
  );

  const handleUploadComplete = useCallback(
    (fileInfo: { name: string; size: number; url: string; duration: number }) => {
      onUpdate({
        ...lesson,
        videoUrl: fileInfo.url,
        duration: Math.round(fileInfo.duration),
      });
    },
    [lesson, onUpdate],
  );

  const handleVideoRemove = useCallback(() => {
    onUpdate({ ...lesson, videoUrl: undefined, duration: undefined });
  }, [lesson, onUpdate]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'rounded-md border bg-background',
        isDragging && 'opacity-40',
        isDragOverlay && 'rotate-1 shadow-lg ring-2 ring-primary',
      )}
    >
      <div className="flex items-center gap-2 p-3">
        <button
          type="button"
          className="cursor-grab touch-none text-muted-foreground hover:text-foreground active:cursor-grabbing"
          aria-label={texts.dragToReorder}
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="shrink-0 text-muted-foreground hover:text-foreground"
          aria-label={isExpanded ? 'collapse' : 'expand'}
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        <span className="shrink-0 text-xs font-medium text-muted-foreground">
          {texts.lessonLabel} {lesson.order}
        </span>

        <Input
          value={lesson.title}
          onChange={handleTitleChange}
          placeholder={texts.lessonPlaceholder}
          className="h-8 flex-1 text-sm"
        />

        {lesson.videoUrl && (
          <span className="shrink-0 text-xs text-green-600 dark:text-green-400">
            {lesson.duration
              ? `${Math.floor(lesson.duration / 60)}:${(lesson.duration % 60).toString().padStart(2, '0')}`
              : ''}
          </span>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(lesson.id)}
          aria-label={texts.deleteLesson}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {isExpanded && !isDragOverlay && (
        <div className="space-y-4 border-t px-3 py-4 pl-12">
          <VideoUploadPanel
            videoUrl={lesson.videoUrl}
            onUploadComplete={handleUploadComplete}
            onRemove={handleVideoRemove}
          />

          <div className="flex items-center gap-2">
            <Switch
              id={`free-${lesson.id}`}
              checked={lesson.isFree}
              onCheckedChange={handleFreeToggle}
            />
            <Label htmlFor={`free-${lesson.id}`} className="text-sm">
              {texts.freeLabel}
            </Label>
          </div>
        </div>
      )}
    </div>
  );
}
