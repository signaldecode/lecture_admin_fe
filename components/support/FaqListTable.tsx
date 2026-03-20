'use client';

import { useCallback } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/composed/DataTable';
import { DataTablePagination } from '@/components/composed/DataTablePagination';
import { useDataTable } from '@/hooks/useDataTable';
import type { Faq, PaginatedResponse } from '@/types';

const faqColumns: ColumnDef<Faq>[] = [
  {
    accessorKey: 'categoryName',
    header: '카테고리',
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue('categoryName')}</span>
    ),
  },
  {
    accessorKey: 'question',
    header: '질문',
  },
  {
    accessorKey: 'answer',
    header: '답변',
    cell: ({ row }) => {
      const answer = row.getValue('answer') as string;
      return (
        <span className="max-w-[300px] truncate block" title={answer}>
          {answer}
        </span>
      );
    },
  },
  {
    accessorKey: 'order',
    header: '정렬 순서',
  },
];

// TODO: Replace with actual API call
const mockFaqs: Faq[] = [
  { id: 1, categoryName: '결제', question: '결제 수단은 무엇이 있나요?', answer: '신용카드, 체크카드, 계좌이체, 네이버페이, 카카오페이를 지원합니다.', order: 1 },
  { id: 2, categoryName: '환불', question: '환불은 어떻게 하나요?', answer: '수강 시작 후 7일 이내, 진도율 10% 미만인 경우 전액 환불이 가능합니다. 마이페이지 > 수강 내역에서 환불 신청 가능합니다.', order: 2 },
  { id: 3, categoryName: '수강', question: '수강 기간은 얼마인가요?', answer: '강의별로 수강 기간이 다르며, 각 강의 상세 페이지에서 확인하실 수 있습니다. 대부분의 강의는 무제한 수강이 가능합니다.', order: 3 },
  { id: 4, categoryName: '계정', question: '비밀번호를 잊어버렸어요.', answer: '로그인 페이지의 "비밀번호 찾기" 버튼을 클릭하여 가입 시 등록한 이메일로 재설정 링크를 받으실 수 있습니다.', order: 4 },
  { id: 5, categoryName: '수료증', question: '수료증은 어떻게 발급받나요?', answer: '강의 진도율이 80% 이상이면 마이페이지 > 수료증 메뉴에서 PDF 형태로 다운로드 가능합니다.', order: 5 },
];

export function FaqListTable() {
  const fetchFaqs = useCallback(
    async (params: {
      page: number;
      pageSize: number;
    }): Promise<PaginatedResponse<Faq>> => {
      // TODO: Replace with actual API call
      return {
        content: mockFaqs.slice(
          params.page * params.pageSize,
          (params.page + 1) * params.pageSize,
        ),
        totalElements: mockFaqs.length,
        totalPages: Math.ceil(mockFaqs.length / params.pageSize),
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
    setPage,
    setPageSize,
    setSorting,
  } = useDataTable<Faq>({ fetchFn: fetchFaqs });

  return (
    <div>
      <DataTable
        columns={faqColumns}
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
