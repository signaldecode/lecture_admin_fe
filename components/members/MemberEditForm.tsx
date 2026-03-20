'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Member, MemberGrade, MemberStatus } from '@/types';

const editSchema = z.object({
  grade: z.string().min(1),
  status: z.string().min(1),
});

type EditFormValues = z.infer<typeof editSchema>;

interface MemberEditFormProps {
  member: Member;
  onSave?: (values: EditFormValues) => void;
}

const gradeOptions: { value: MemberGrade; label: string }[] = [
  { value: 'BASIC', label: '일반' },
  { value: 'SILVER', label: '실버' },
  { value: 'GOLD', label: '골드' },
  { value: 'PLATINUM', label: '플래티넘' },
];

const statusOptions: { value: MemberStatus; label: string }[] = [
  { value: 'ACTIVE', label: '활성' },
  { value: 'SUSPENDED', label: '정지' },
  { value: 'WITHDRAWN', label: '탈퇴' },
];

export function MemberEditForm({ member, onSave }: MemberEditFormProps) {
  const { handleSubmit, setValue, watch } = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      grade: member.grade,
      status: member.status,
    },
  });

  function onSubmit(values: EditFormValues) {
    // TODO: apiClient.patch(`members/${member.id}`, values)
    onSave?.(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">회원 정보 수정</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="grade">등급</Label>
              <Select
                value={watch('grade')}
                onValueChange={(v) => setValue('grade', v ?? '')}
              >
                <SelectTrigger id="grade">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {gradeOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">상태</Label>
              <Select
                value={watch('status')}
                onValueChange={(v) => setValue('status', v ?? '')}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit">저장</Button>
        </form>
      </CardContent>
    </Card>
  );
}
