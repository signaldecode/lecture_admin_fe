'use client';

import { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
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

function getInitialOpenKeys(
  menu: SidebarMenuItemType[],
  role: AdminRole | undefined,
  pathname: string,
): Set<string> {
  const keys = new Set<string>();
  for (const item of menu) {
    if (!item.children?.length) continue;
    if (!role || !(item.roles as AdminRole[]).includes(role)) continue;
    const hasActive = item.children.some(
      (child) =>
        role &&
        (child.roles as AdminRole[]).includes(role) &&
        isActive(pathname, child.path),
    );
    if (hasActive) keys.add(item.key);
  }
  return keys;
}

export function AdminSidebar() {
  const pathname = usePathname();
  const role = useAuthStore((state) => state.user?.role);

  const menu = sidebarData.menu as SidebarMenuItemType[];

  const filteredMenu = useMemo(
    () => menu.filter((item) => role && (item.roles as AdminRole[]).includes(role)),
    [menu, role],
  );

  const [openKeys, setOpenKeys] = useState<Set<string>>(() =>
    getInitialOpenKeys(menu, role, pathname),
  );

  const toggleKey = useCallback((key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

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
                      <Collapsible
                        open={openKeys.has(item.key)}
                        onOpenChange={() => toggleKey(item.key)}
                        className="group/collapsible"
                      >
                        <CollapsibleTrigger
                          render={
                            <SidebarMenuButton
                              tooltip={item.label}
                              data-active={active}
                            />
                          }
                        >
                          <Icon />
                          <span>{item.label}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[open]/collapsible:rotate-90" />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
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
                        </CollapsibleContent>
                      </Collapsible>
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
