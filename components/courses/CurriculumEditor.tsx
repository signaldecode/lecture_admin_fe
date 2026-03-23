'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { Plus, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionItem } from '@/components/courses/SectionItem';
import { LessonItem } from '@/components/courses/LessonItem';
import uiData from '@/data/uiData.json';
import type { Section, Lesson } from '@/types';

const texts = uiData.courses.curriculum;

interface CurriculumEditorProps {
  courseId: number;
  initialSections?: Section[];
}

let nextSectionId = 100;

// TODO: Replace with actual API data
const mockSections: Section[] = [
  {
    id: 1,
    courseId: 1,
    title: 'React 기초',
    order: 1,
    lessons: [
      { id: 1, sectionId: 1, title: 'JSX 소개', type: 'VIDEO', order: 1, isFree: true, duration: 754 },
      { id: 2, sectionId: 1, title: '컴포넌트와 Props', type: 'VIDEO', order: 2, isFree: false },
      { id: 3, sectionId: 1, title: '이벤트 핸들링', type: 'VIDEO', order: 3, isFree: false, duration: 612 },
    ],
  },
  {
    id: 2,
    courseId: 1,
    title: 'React Hooks',
    order: 2,
    lessons: [
      { id: 4, sectionId: 2, title: 'useState 사용법', type: 'VIDEO', order: 1, isFree: false },
      { id: 5, sectionId: 2, title: 'useEffect 이해하기', type: 'VIDEO', order: 2, isFree: false },
    ],
  },
];

type ActiveDragItem =
  | { type: 'section'; section: Section }
  | { type: 'lesson'; lesson: Lesson };

export function CurriculumEditor({ courseId, initialSections }: CurriculumEditorProps) {
  const [sections, setSections] = useState<Section[]>(initialSections ?? mockSections);
  const [activeItem, setActiveItem] = useState<ActiveDragItem | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const sectionIds = useMemo(
    () => sections.map((s) => `section-${s.id}`),
    [sections],
  );

  const handleAddSection = useCallback(() => {
    const newSection: Section = {
      id: nextSectionId++,
      courseId,
      title: '',
      order: sections.length + 1,
      lessons: [],
    };
    setSections((prev) => [...prev, newSection]);
  }, [courseId, sections.length]);

  const handleUpdateSection = useCallback((updated: Section) => {
    setSections((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s)),
    );
  }, []);

  const handleDeleteSection = useCallback((sectionId: number) => {
    setSections((prev) =>
      prev
        .filter((s) => s.id !== sectionId)
        .map((s, i) => ({ ...s, order: i + 1 })),
    );
  }, []);

  // ─── Drag Handlers ───

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    const data = active.data.current as { type: string; section?: Section; lesson?: Lesson } | undefined;

    if (data?.type === 'section' && data.section) {
      setActiveItem({ type: 'section', section: data.section });
    } else if (data?.type === 'lesson' && data.lesson) {
      setActiveItem({ type: 'lesson', lesson: data.lesson });
    }
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    setActiveItem(null);

    if (!over || active.id === over.id) return;

    const activeData = active.data.current as { type: string } | undefined;
    const overData = over.data.current as { type: string } | undefined;

    // 섹션 정렬
    if (activeData?.type === 'section' && overData?.type === 'section') {
      setSections((prev) => {
        const oldIndex = prev.findIndex((s) => `section-${s.id}` === active.id);
        const newIndex = prev.findIndex((s) => `section-${s.id}` === over.id);
        if (oldIndex === -1 || newIndex === -1) return prev;

        const moved = arrayMove(prev, oldIndex, newIndex);
        return moved.map((s, i) => ({ ...s, order: i + 1 }));
      });
      return;
    }

    // 레슨 정렬 (같은 섹션 내)
    if (activeData?.type === 'lesson' && overData?.type === 'lesson') {
      const activeIdStr = String(active.id);
      const overIdStr = String(over.id);
      const activeLessonId = Number(activeIdStr.replace('lesson-', ''));
      const overLessonId = Number(overIdStr.replace('lesson-', ''));

      setSections((prev) => {
        const sectionIndex = prev.findIndex((s) =>
          s.lessons.some((l) => l.id === activeLessonId),
        );
        if (sectionIndex === -1) return prev;

        const section = prev[sectionIndex];
        const oldIndex = section.lessons.findIndex((l) => l.id === activeLessonId);
        const newIndex = section.lessons.findIndex((l) => l.id === overLessonId);
        if (oldIndex === -1 || newIndex === -1) return prev;

        const movedLessons = arrayMove(section.lessons, oldIndex, newIndex).map(
          (l, i) => ({ ...l, order: i + 1 }),
        );

        const updated = [...prev];
        updated[sectionIndex] = { ...section, lessons: movedLessons };
        return updated;
      });
    }
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveItem(null);
  }, []);

  // noop handlers for overlay items
  const noop = useCallback(() => {}, []);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const noopWithId = useCallback((_id: number) => {}, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="space-y-4">
        {sections.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed py-12 text-center">
            <BookOpen className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{texts.noSections}</p>
          </div>
        )}

        <SortableContext items={sectionIds} strategy={verticalListSortingStrategy}>
          {sections.map((section) => (
            <SectionItem
              key={section.id}
              section={section}
              onUpdate={handleUpdateSection}
              onDelete={handleDeleteSection}
            />
          ))}
        </SortableContext>

        <Button
          variant="outline"
          className="w-full gap-2 border-dashed"
          onClick={handleAddSection}
        >
          <Plus className="h-4 w-4" />
          {texts.addSection}
        </Button>
      </div>

      <DragOverlay dropAnimation={{ duration: 200, easing: 'ease' }}>
        {activeItem?.type === 'section' && (
          <SectionItem
            section={activeItem.section}
            onUpdate={noop as (section: Section) => void}
            onDelete={noopWithId}
            isDragOverlay
          />
        )}
        {activeItem?.type === 'lesson' && (
          <LessonItem
            lesson={activeItem.lesson}
            onUpdate={noop as (lesson: Lesson) => void}
            onDelete={noopWithId}
            isDragOverlay
          />
        )}
      </DragOverlay>
    </DndContext>
  );
}
