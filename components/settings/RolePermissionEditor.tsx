'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { AdminRole } from '@/types';
import uiData from '@/data/uiData.json';
import sidebarData from '@/data/sidebarData.json';

const texts = uiData.settings.roles;
const adminTexts = uiData.settings.admins;
const commonTexts = uiData.common;

const roles: { key: AdminRole; label: string }[] = [
  { key: 'SUPER_ADMIN', label: adminTexts.roleLabels.SUPER_ADMIN },
  { key: 'INSTRUCTOR', label: adminTexts.roleLabels.INSTRUCTOR },
  { key: 'CS_AGENT', label: adminTexts.roleLabels.CS_AGENT },
];

const permissions = (sidebarData.menu as { key: string; label: string }[]).map((item) => ({
  key: item.key,
  label: item.label,
}));

const defaultMatrix: Record<AdminRole, Record<string, boolean>> = {
  SUPER_ADMIN: Object.fromEntries(permissions.map((p) => [p.key, true])),
  INSTRUCTOR: { dashboard: true, courses: true, analytics: true, members: false, orders: false, coupons: false, community: false, support: false, content: false, settings: false },
  CS_AGENT: { dashboard: true, members: true, support: true, courses: false, orders: false, coupons: false, community: false, content: false, analytics: false, settings: false },
};

export function RolePermissionEditor() {
  const [matrix, setMatrix] = useState(defaultMatrix);

  function togglePermission(role: AdminRole, permission: string) {
    if (role === 'SUPER_ADMIN') return; // cannot modify super admin
    setMatrix((prev) => ({
      ...prev,
      [role]: { ...prev[role], [permission]: !prev[role][permission] },
    }));
  }

  function handleSave() {
    // TODO: apiClient.put('settings/roles', matrix)
    alert('저장되었습니다. (목 동작)');
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">{texts.cardTitle}</CardTitle>
        <Button onClick={handleSave} size="sm">{commonTexts.save}</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{texts.menuHeader}</TableHead>
              {roles.map((role) => (
                <TableHead key={role.key} className="text-center">{role.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((perm) => (
              <TableRow key={perm.key}>
                <TableCell>{perm.label}</TableCell>
                {roles.map((role) => (
                  <TableCell key={role.key} className="text-center">
                    <Checkbox
                      checked={matrix[role.key][perm.key]}
                      onCheckedChange={() => togglePermission(role.key, perm.key)}
                      disabled={role.key === 'SUPER_ADMIN'}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
