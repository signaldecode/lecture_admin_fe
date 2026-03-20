'use client';

import { useEffect } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/common/AdminSidebar';
import { AdminHeader } from '@/components/common/AdminHeader';
import { AdminBreadcrumb } from '@/components/common/AdminBreadcrumb';
import { useAuthStore } from '@/stores/useAuthStore';
import type { AdminUser } from '@/types';

interface DashboardShellProps {
  children: React.ReactNode;
  user: AdminUser;
}

export function DashboardShell({ children, user }: DashboardShellProps) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <AdminHeader />
        <div className="flex-1 overflow-auto">
          <div className="p-4">
            <AdminBreadcrumb />
          </div>
          <main className="px-4 pb-8">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
