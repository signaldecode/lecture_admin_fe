import type { AdminRole } from '@/types';
import permissionsData from '@/data/permissionsData.json';

export function canAccess(role: AdminRole, path: string): boolean {
  const normalizedPath = path === '/' ? '/' : path.replace(/\/$/, '');

  for (const route of permissionsData.routes) {
    if (
      normalizedPath === route.path ||
      normalizedPath.startsWith(route.path + '/')
    ) {
      return (route.roles as AdminRole[]).includes(role);
    }
  }

  return false;
}

export function canPerform(role: AdminRole, action: string): boolean {
  const actions = permissionsData.actions as Record<string, AdminRole[]>;
  const allowedRoles = actions[action];
  if (!allowedRoles) return false;
  return allowedRoles.includes(role);
}

export function getDefaultPath(role: AdminRole): string {
  const defaults = permissionsData.roleDefaultPaths as Record<AdminRole, string>;
  return defaults[role] ?? '/';
}
