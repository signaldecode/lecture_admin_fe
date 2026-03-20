import type { Metadata } from 'next';
import { RolePermissionEditor } from '@/components/settings/RolePermissionEditor';
import uiData from '@/data/uiData.json';

const texts = uiData.settings.roles;

export const metadata: Metadata = { title: texts.pageTitle };

export default function RolesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
      <RolePermissionEditor />
    </div>
  );
}
