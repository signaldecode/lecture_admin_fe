'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CourseDetailCard } from '@/components/courses/CourseDetailCard';
import { CourseDetailActions } from '@/components/courses/CourseDetailActions';
import { CurriculumEditor } from '@/components/courses/CurriculumEditor';
import uiData from '@/data/uiData.json';
import type { Course, AdminRole } from '@/types';

const tabTexts = uiData.courses.tabs;

interface CourseDetailTabsProps {
  course: Course;
  role: AdminRole;
}

export function CourseDetailTabs({ course, role }: CourseDetailTabsProps) {
  return (
    <Tabs defaultValue="info">
      <TabsList>
        <TabsTrigger value="info">{tabTexts.info}</TabsTrigger>
        <TabsTrigger value="curriculum">{tabTexts.curriculum}</TabsTrigger>
      </TabsList>

      <TabsContent value="info">
        <div className="space-y-4 pt-4">
          <CourseDetailCard course={course} />
          <CourseDetailActions course={course} role={role} />
        </div>
      </TabsContent>

      <TabsContent value="curriculum">
        <div className="pt-4">
          <CurriculumEditor courseId={course.id} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
