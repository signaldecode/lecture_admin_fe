'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarFooter,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useAuthStore } from '@/stores/useAuthStore';
import { getIcon } from '@/lib/iconMap';
import { AdminLogo } from '@/components/common/AdminLogo';
import sidebarData from '@/data/sidebarData.json';
import uiData from '@/data/uiData.json';
import type { AdminRole, SidebarMenuItem as SidebarMenuItemType } from '@/types';

const sidebarTexts = uiData.sidebar;

function isActive(pathname: string, itemPath: string): boolean {
  if (itemPath === '/') return pathname === '/';
  return pathname === itemPath || pathname.startsWith(itemPath + '/');
}

export function AdminSidebar() {
  const pathname = usePathname();
  const role = useAuthStore((state) => state.user?.role);

  const filteredMenu = (sidebarData.menu as SidebarMenuItemType[]).filter(
    (item) => role && (item.roles as AdminRole[]).includes(role),
  );

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <AdminLogo />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="sr-only">
            {sidebarTexts.logoText}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenu.map((item) => {
                const Icon = getIcon(item.icon);
                const active = isActive(pathname, item.path);

                if (item.children && item.children.length > 0) {
                  const filteredChildren = item.children.filter(
                    (child) =>
                      role && (child.roles as AdminRole[]).includes(role),
                  );

                  return (
                    <SidebarMenuItem key={item.key}>
                      <SidebarMenuButton
                        tooltip={item.label}
                        data-active={active}
                      >
                        <Icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        {filteredChildren.map((child) => {
                          const childActive = isActive(pathname, child.path);
                          return (
                            <SidebarMenuSubItem key={child.key}>
                              <SidebarMenuSubButton
                                data-active={childActive}
                                render={<Link href={child.path} />}
                              >
                                <span>{child.label}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                  );
                }

                return (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      tooltip={item.label}
                      data-active={active}
                      render={<Link href={item.path} />}
                    >
                      <Icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
