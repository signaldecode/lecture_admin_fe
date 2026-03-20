'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import uiData from '@/data/uiData.json';

interface DataTablePaginationProps {
  page: number;
  pageSize: number;
  pageCount: number;
  totalElements: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const PAGE_SIZE_OPTIONS = [10, 20, 50];
const texts = uiData.pagination;

export function DataTablePagination({
  page,
  pageSize,
  pageCount,
  totalElements,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps) {
  return (
    <div className="flex items-center justify-between px-2 py-4">
      <p className="text-sm text-muted-foreground">
        {texts.totalPrefix}{totalElements}{texts.totalSuffix}
      </p>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <p className="text-sm">{texts.perPage}</p>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="text-sm">
          {page + 1} / {Math.max(pageCount, 1)} {texts.pageSuffix}
        </p>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon-xs"
            onClick={() => onPageChange(0)}
            disabled={page === 0}
          >
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon-xs"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 0}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon-xs"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= pageCount - 1}
          >
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon-xs"
            onClick={() => onPageChange(pageCount - 1)}
            disabled={page >= pageCount - 1}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
