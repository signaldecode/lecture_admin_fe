'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import sidebarData from '@/data/sidebarData.json';
import uiData from '@/data/uiData.json';
import type { SidebarMenuItem } from '@/types';

const breadcrumbTexts = uiData.breadcrumb;

function findLabel(path: string): string | null {
  const menu = sidebarData.menu as SidebarMenuItem[];

  for (const item of menu) {
    if (item.path === path) return item.label;
    if (item.children) {
      for (const child of item.children) {
        if (child.path === path) return child.label;
      }
    }
  }
  return null;
}

export function AdminBreadcrumb() {
  const pathname = usePathname();

  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  const crumbs: { label: string; path: string }[] = [];

  let currentPath = '';
  for (const segment of segments) {
    currentPath += `/${segment}`;
    const label = findLabel(currentPath) ?? segment;
    crumbs.push({ label, path: currentPath });
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/" />}>
            {breadcrumbTexts.dashboard}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {crumbs.map((crumb, i) => (
          <React.Fragment key={crumb.path}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {i === crumbs.length - 1 ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink render={<Link href={crumb.path} />}>
                  {crumb.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
