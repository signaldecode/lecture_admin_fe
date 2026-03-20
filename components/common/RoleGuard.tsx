'use client';

import { useAuthStore } from '@/stores/useAuthStore';
import type { AdminRole } from '@/types';

interface RoleGuardProps {
  allowedRoles: AdminRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGuard({ allowedRoles, children, fallback = null }: RoleGuardProps) {
  const role = useAuthStore((state) => state.user?.role);

  if (!role || !allowedRoles.includes(role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
