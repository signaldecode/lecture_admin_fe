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
import uiData from '@/data/uiData.json';
import type { Member, MemberGrade, MemberStatus } from '@/types';

const texts = uiData.members;
const commonTexts = uiData.common;

const editSchema = z.object({
  grade: z.string().min(1),
  status: z.string().min(1),
});

type EditFormValues = z.infer<typeof editSchema>;

interface MemberEditFormProps {
  member: Member;
  onSave?: (values: EditFormValues) => void;
}

const gradeLabels = texts.gradeLabels as Record<MemberGrade, string>;
const statusLabels = texts.statusLabels as Record<MemberStatus, string>;

const gradeOptions: { value: MemberGrade; label: string }[] = [
  { value: 'BASIC', label: gradeLabels.BASIC },
  { value: 'SILVER', label: gradeLabels.SILVER },
  { value: 'GOLD', label: gradeLabels.GOLD },
  { value: 'PLATINUM', label: gradeLabels.PLATINUM },
];

const statusOptions: { value: MemberStatus; label: string }[] = [
  { value: 'ACTIVE', label: statusLabels.ACTIVE },
  { value: 'SUSPENDED', label: statusLabels.SUSPENDED },
  { value: 'WITHDRAWN', label: statusLabels.WITHDRAWN },
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
        <CardTitle className="text-base">{texts.editForm.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="grade">{texts.editForm.gradeLabel}</Label>
              <Select
                value={watch('grade') ?? ''}
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
              <Label htmlFor="status">{texts.editForm.statusLabel}</Label>
              <Select
                value={watch('status') ?? ''}
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

          <Button type="submit">{commonTexts.save}</Button>
        </form>
      </CardContent>
    </Card>
  );
}
