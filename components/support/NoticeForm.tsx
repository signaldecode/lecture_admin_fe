'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import uiData from '@/data/uiData.json';

const texts = uiData.support.noticeForm;
const commonTexts = uiData.common;

const noticeSchema = z.object({
  title: z.string().min(1, texts.validation.titleRequired),
  content: z.string().min(1, texts.validation.contentRequired),
  isPinned: z.boolean(),
});

type NoticeFormValues = z.infer<typeof noticeSchema>;

export function NoticeForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<NoticeFormValues>({
    resolver: zodResolver(noticeSchema),
    defaultValues: {
      title: '',
      content: '',
      isPinned: false,
    },
  });

  async function onSubmit(values: NoticeFormValues) {
    // TODO: Replace with actual API call
    // await apiClient.post('support/notices', values);
    router.push('/support/notices');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{texts.formTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">{texts.titleLabel}</Label>
            <Input
              id="title"
              placeholder={texts.titlePlaceholder}
              {...register('title')}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">{texts.contentLabel}</Label>
            <Textarea
              id="content"
              placeholder={texts.contentPlaceholder}
              rows={8}
              {...register('content')}
            />
            {errors.content && (
              <p className="text-sm text-destructive">{errors.content.message}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="isPinned"
              checked={watch('isPinned')}
              onCheckedChange={(checked) => setValue('isPinned', !!checked)}
            />
            <Label htmlFor="isPinned" className="cursor-pointer">
              {texts.isPinnedLabel}
            </Label>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? texts.submittingButton : texts.submitButton}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              {commonTexts.cancel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
