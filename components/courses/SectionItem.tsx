'use client';

import { useCallback, useMemo, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LessonItem } from '@/components/courses/LessonItem';
import { cn } from '@/lib/utils';
import uiData from '@/data/uiData.json';
import type { Section, Lesson } from '@/types';

const texts = uiData.courses.curriculum;

interface SectionItemProps {
  section: Section;
  onUpdate: (section: Section) => void;
  onDelete: (sectionId: number) => void;
  isDragOverlay?: boolean;
}

let nextLessonId = 1000;

export function SectionItem({
  section,
  onUpdate,
  onDelete,
  isDragOverlay = false,
}: SectionItemProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `section-${section.id}`,
    data: { type: 'section', section },
    disabled: isDragOverlay,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const lessonIds = useMemo(
    () => section.lessons.map((l) => `lesson-${l.id}`),
    [section.lessons],
  );

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdate({ ...section, title: e.target.value });
    },
    [section, onUpdate],
  );

  const handleAddLesson = useCallback(() => {
    const newLesson: Lesson = {
      id: nextLessonId++,
      sectionId: section.id,
      title: '',
      type: 'VIDEO',
      order: section.lessons.length + 1,
      isFree: false,
    };
    onUpdate({ ...section, lessons: [...section.lessons, newLesson] });
  }, [section, onUpdate]);

  const handleUpdateLesson = useCallback(
    (updatedLesson: Lesson) => {
      const updatedLessons = section.lessons.map((l) =>
        l.id === updatedLesson.id ? updatedLesson : l,
      );
      onUpdate({ ...section, lessons: updatedLessons });
    },
    [section, onUpdate],
  );

  const handleDeleteLesson = useCallback(
    (lessonId: number) => {
      const filtered = section.lessons
        .filter((l) => l.id !== lessonId)
        .map((l, i) => ({ ...l, order: i + 1 }));
      onUpdate({ ...section, lessons: filtered });
    },
    [section, onUpdate],
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'rounded-lg border bg-card',
        isDragging && 'opacity-40',
        isDragOverlay && 'rotate-1 shadow-lg ring-2 ring-primary',
      )}
    >
      <div className="flex items-center gap-2 p-4">
        <button
          type="button"
          className="cursor-grab touch-none text-muted-foreground hover:text-foreground active:cursor-grabbing"
          aria-label={texts.dragToReorder}
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="shrink-0 text-muted-foreground hover:text-foreground"
          aria-label={isExpanded ? 'collapse' : 'expand'}
        >
          {isExpanded ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>

        <span className="shrink-0 text-sm font-semibold text-muted-foreground">
          {texts.sectionLabel} {section.order}
        </span>

        <Input
          value={section.title}
          onChange={handleTitleChange}
          placeholder={texts.sectionPlaceholder}
          className="flex-1 font-medium"
        />

        <span className="shrink-0 text-xs text-muted-foreground">
          {section.lessons.length}{texts.lessonCountUnit}
        </span>

        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(section.id)}
          aria-label={texts.deleteSection}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {isExpanded && !isDragOverlay && (
        <div className="space-y-2 border-t px-4 py-3 pl-12">
          {section.lessons.length === 0 && (
            <p className="py-4 text-center text-sm text-muted-foreground">
              {texts.noLessons}
            </p>
          )}

          <SortableContext items={lessonIds} strategy={verticalListSortingStrategy}>
            {section.lessons.map((lesson) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                onUpdate={handleUpdateLesson}
                onDelete={handleDeleteLesson}
              />
            ))}
          </SortableContext>

          <Button
            variant="outline"
            size="sm"
            className="w-full gap-1.5 border-dashed"
            onClick={handleAddLesson}
          >
            <Plus className="h-4 w-4" />
            {texts.addLesson}
          </Button>
        </div>
      )}
    </div>
  );
}
