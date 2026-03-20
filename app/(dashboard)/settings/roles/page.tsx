import type { Metadata } from 'next';
import { RolePermissionEditor } from '@/components/settings/RolePermissionEditor';

export const metadata: Metadata = { title: '역할/권한' };

export default function RolesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">역할/권한</h1>
      <RolePermissionEditor />
    </div>
  );
}
