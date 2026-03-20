import type { Metadata } from 'next';
import { InstructorProfileForm } from '@/components/instructor/InstructorProfileForm';
import uiData from '@/data/uiData.json';

const texts = uiData.instructor.profile;

export const metadata: Metadata = {
  title: texts.pageTitle,
};

export default function InstructorProfilePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
      <InstructorProfileForm />
    </div>
  );
}
