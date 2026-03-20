'use client';

import { useCallback } from 'react';
import { DataTable } from '@/components/composed/DataTable';
import { DataTableToolbar } from '@/components/composed/DataTableToolbar';
import { DataTablePagination } from '@/components/composed/DataTablePagination';
import { useDataTable } from '@/hooks/useDataTable';
import { orderColumns } from '@/components/orders/orderColumns';
import type { Order, PaginatedResponse } from '@/types';
import uiData from '@/data/uiData.json';

const ordersTexts = uiData.orders;

// TODO: Replace with actual API call
const mockOrders: Order[] = [
  {
    id: 1001,
    memberName: '김철수',
    memberEmail: 'kim@example.com',
    courseTitle: 'React 완벽 가이드: 기초부터 고급까지',
    amount: 89000,
    status: 'COMPLETED',
    paymentMethod: '카드',
    createdAt: '2026-03-15T10:30:00',
  },
  {
    id: 1002,
    memberName: '이영희',
    memberEmail: 'lee@example.com',
    courseTitle: 'TypeScript 마스터 클래스',
    amount: 69000,
    status: 'REFUND_REQUESTED',
    paymentMethod: '카드',
    createdAt: '2026-03-14T14:20:00',
  },
  {
    id: 1003,
    memberName: '박민수',
    memberEmail: 'park@example.com',
    courseTitle: 'Next.js 실전 프로젝트',
    amount: 99000,
    status: 'REFUNDED',
    paymentMethod: '계좌이체',
    createdAt: '2026-03-13T09:15:00',
  },
  {
    id: 1004,
    memberName: '정수연',
    memberEmail: 'jung@example.com',
    courseTitle: 'Python 데이터 분석 입문',
    amount: 55000,
    status: 'COMPLETED',
    paymentMethod: '카드',
    createdAt: '2026-03-12T16:45:00',
  },
  {
    id: 1005,
    memberName: '최지훈',
    memberEmail: 'choi@example.com',
    courseTitle: 'AWS 클라우드 실무',
    amount: 120000,
    status: 'CANCELLED',
    paymentMethod: '카카오페이',
    createdAt: '2026-03-11T11:00:00',
  },
];

export function OrderListTable() {
  const fetchOrders = useCallback(
    async (params: {
      page: number;
      pageSize: number;
      query?: string;
    }): Promise<PaginatedResponse<Order>> => {
      // TODO: Replace with actual API call
      // return apiClient.get<PaginatedResponse<Order>>('/api/admin/orders', params);
      const filtered = params.query
        ? mockOrders.filter(
            (o) =>
              o.memberName.includes(params.query!) ||
              o.courseTitle.includes(params.query!),
          )
        : mockOrders;

      return {
        content: filtered.slice(
          params.page * params.pageSize,
          (params.page + 1) * params.pageSize,
        ),
        totalElements: filtered.length,
        totalPages: Math.ceil(filtered.length / params.pageSize),
        page: params.page,
        pageSize: params.pageSize,
      };
    },
    [],
  );

  const {
    data,
    isLoading,
    page,
    pageSize,
    pageCount,
    totalElements,
    sorting,
    searchQuery,
    setPage,
    setPageSize,
    setSorting,
    setSearchQuery,
  } = useDataTable<Order>({ fetchFn: fetchOrders });

  return (
    <div>
      <DataTableToolbar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder={ordersTexts.searchPlaceholder}
      />

      <DataTable
        columns={orderColumns}
        data={data}
        pageCount={pageCount}
        pagination={{ pageIndex: page, pageSize }}
        onPaginationChange={(updater) => {
          if (typeof updater === 'function') {
            const next = updater({ pageIndex: page, pageSize });
            setPage(next.pageIndex);
          }
        }}
        sorting={sorting}
        onSortingChange={(updater) => {
          const next = typeof updater === 'function' ? updater(sorting) : updater;
          setSorting(next);
        }}
        isLoading={isLoading}
      />

      <DataTablePagination
        page={page}
        pageSize={pageSize}
        pageCount={pageCount}
        totalElements={totalElements}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}
