import type { Metadata } from 'next';
import { InstructorProfileForm } from '@/components/instructor/InstructorProfileForm';

export const metadata: Metadata = {
  title: '강사 프로필',
};

export default function InstructorProfilePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">강사 프로필</h1>
      <InstructorProfileForm />
    </div>
  );
}
