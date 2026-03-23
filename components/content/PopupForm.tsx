'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImageUploadField } from '@/components/composed/ImageUploadField';
import type { Popup } from '@/types';
import uiData from '@/data/uiData.json';

const popupTexts = uiData.content.popup;
const validationTexts = popupTexts.validation;

const popupFormSchema = z.object({
  title: z.string().min(1, validationTexts.titleRequired),
  content: z.string().min(1, validationTexts.contentRequired),
  imageUrl: z.string().optional(),
  startDate: z.string().min(1, validationTexts.startDateRequired),
  endDate: z.string().min(1, validationTexts.endDateRequired),
});

type PopupFormValues = z.infer<typeof popupFormSchema>;

interface PopupFormProps {
  popup?: Popup;
  mode: 'create' | 'edit';
}

export function PopupForm({ popup, mode }: PopupFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PopupFormValues>({
    resolver: zodResolver(popupFormSchema),
    defaultValues: {
      title: popup?.title ?? '',
      content: popup?.content ?? '',
      imageUrl: popup?.imageUrl ?? '',
      startDate: popup?.startDate ?? '',
      endDate: popup?.endDate ?? '',
    },
  });

  const onSubmit = (data: PopupFormValues) => {
    // TODO: Call popup API
    // mode === 'create': POST /api/admin/content/popups
    // mode === 'edit': PUT /api/admin/content/popups/{popup.id}
    console.log('Popup form submitted:', { mode, data });
    router.push('/content/popups');
  };

  const formTitle = mode === 'create' ? popupTexts.createTitle : popupTexts.editTitle;
  const submitLabel = mode === 'create' ? popupTexts.submitCreateButton : popupTexts.submitEditButton;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{formTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="popup-title">{popupTexts.titleLabel}</Label>
            <Input
              id="popup-title"
              placeholder={popupTexts.titlePlaceholder}
              {...register('title')}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="popup-content">{popupTexts.contentLabel}</Label>
            <Textarea
              id="popup-content"
              className='resize-none'
              placeholder={popupTexts.contentPlaceholder}
              rows={6}
              {...register('content')}
            />
            {errors.content && (
              <p className="text-sm text-destructive">{errors.content.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>{popupTexts.imageUrlLabel}</Label>
            <ImageUploadField
              value={watch('imageUrl')}
              onChange={(url) => setValue('imageUrl', url)}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="popup-start-date">{popupTexts.startDateLabel}</Label>
              <Input
                id="popup-start-date"
                type="date"
                {...register('startDate')}
              />
              {errors.startDate && (
                <p className="text-sm text-destructive">{errors.startDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="popup-end-date">{popupTexts.endDateLabel}</Label>
              <Input
                id="popup-end-date"
                type="date"
                {...register('endDate')}
              />
              {errors.endDate && (
                <p className="text-sm text-destructive">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
