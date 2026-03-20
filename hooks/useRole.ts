'use client';

import { useAuthStore } from '@/stores/useAuthStore';
import { canAccess, canPerform } from '@/lib/permissions';
import type { AdminRole } from '@/types';

export function useRole() {
  const role = useAuthStore((state) => state.user?.role ?? null);

  return {
    role,
    isRole: (r: AdminRole) => role === r,
    canAccess: (path: string) => (role ? canAccess(role, path) : false),
    canPerform: (action: string) => (role ? canPerform(role, action) : false),
  };
}
