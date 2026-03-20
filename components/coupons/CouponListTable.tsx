'use client';

import { useCallback } from 'react';
import { DataTable } from '@/components/composed/DataTable';
import { DataTableToolbar } from '@/components/composed/DataTableToolbar';
import { DataTablePagination } from '@/components/composed/DataTablePagination';
import { useDataTable } from '@/hooks/useDataTable';
import { couponColumns } from '@/components/coupons/couponColumns';
import type { Coupon, PaginatedResponse } from '@/types';
import uiData from '@/data/uiData.json';

const couponsTexts = uiData.coupons;

// TODO: Replace with actual API call
const mockCoupons: Coupon[] = [
  {
    id: 1,
    code: 'WELCOME2026',
    name: '신규 가입 환영 쿠폰',
    type: 'PERCENT',
    discountValue: 20,
    maxDiscount: 30000,
    minPurchase: 50000,
    usageLimit: 500,
    usedCount: 123,
    expiresAt: '2026-06-30T23:59:59',
    status: 'ACTIVE',
    createdAt: '2026-01-01T00:00:00',
  },
  {
    id: 2,
    code: 'SPRING5000',
    name: '봄맞이 할인 쿠폰',
    type: 'FIXED',
    discountValue: 5000,
    minPurchase: 30000,
    usageLimit: 1000,
    usedCount: 1000,
    expiresAt: '2026-04-30T23:59:59',
    status: 'USED_OUT',
    createdAt: '2026-03-01T00:00:00',
  },
  {
    id: 3,
    code: 'VIP30',
    name: 'VIP 전용 30% 할인',
    type: 'PERCENT',
    discountValue: 30,
    maxDiscount: 50000,
    usageLimit: 100,
    usedCount: 45,
    expiresAt: '2026-12-31T23:59:59',
    status: 'ACTIVE',
    createdAt: '2026-02-15T00:00:00',
  },
  {
    id: 4,
    code: 'NEWYEAR10K',
    name: '신년 만원 할인',
    type: 'FIXED',
    discountValue: 10000,
    minPurchase: 50000,
    usageLimit: 200,
    usedCount: 200,
    expiresAt: '2026-01-31T23:59:59',
    status: 'EXPIRED',
    createdAt: '2025-12-20T00:00:00',
  },
];

export function CouponListTable() {
  const fetchCoupons = useCallback(
    async (params: {
      page: number;
      pageSize: number;
      query?: string;
    }): Promise<PaginatedResponse<Coupon>> => {
      // TODO: Replace with actual API call
      // return apiClient.get<PaginatedResponse<Coupon>>('/api/admin/coupons', params);
      const filtered = params.query
        ? mockCoupons.filter(
            (c) =>
              c.name.includes(params.query!) ||
              c.code.includes(params.query!),
          )
        : mockCoupons;

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
  } = useDataTable<Coupon>({ fetchFn: fetchCoupons });

  return (
    <div>
      <DataTableToolbar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder={couponsTexts.searchPlaceholder}
      />

      <DataTable
        columns={couponColumns}
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
