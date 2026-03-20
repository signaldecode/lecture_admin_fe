'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { AdminRole } from '@/types';

const roles: { key: AdminRole; label: string }[] = [
  { key: 'SUPER_ADMIN', label: '슈퍼관리자' },
  { key: 'INSTRUCTOR', label: '강사' },
  { key: 'CS_AGENT', label: 'CS 담당' },
];

const permissions = [
  { key: 'dashboard', label: '대시보드' },
  { key: 'members', label: '회원 관리' },
  { key: 'courses', label: '강의 관리' },
  { key: 'orders', label: '주문/결제' },
  { key: 'coupons', label: '쿠폰/포인트' },
  { key: 'community', label: '커뮤니티' },
  { key: 'support', label: '고객센터' },
  { key: 'content', label: '콘텐츠' },
  { key: 'analytics', label: '통계/분석' },
  { key: 'settings', label: '시스템 설정' },
];

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
        <CardTitle className="text-base">역할별 메뉴 접근 권한</CardTitle>
        <Button onClick={handleSave} size="sm">저장</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>메뉴</TableHead>
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
