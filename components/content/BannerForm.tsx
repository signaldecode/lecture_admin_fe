'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ImageUploadField } from '@/components/composed/ImageUploadField';
import type { Banner } from '@/types';
import uiData from '@/data/uiData.json';

const bannerTexts = uiData.content.banner;
const validationTexts = bannerTexts.validation;
const positionOptions = bannerTexts.positionOptions;

const bannerFormSchema = z.object({
  title: z.string().min(1, validationTexts.titleRequired),
  imageUrl: z.string().min(1, validationTexts.imageUrlRequired),
  linkUrl: z.string().optional(),
  position: z.string().min(1, validationTexts.positionRequired),
  startDate: z.string().min(1, validationTexts.startDateRequired),
  endDate: z.string().min(1, validationTexts.endDateRequired),
  order: z.string().min(1, validationTexts.orderRequired),
});

type BannerFormValues = z.infer<typeof bannerFormSchema>;

interface BannerFormProps {
  banner?: Banner;
  mode: 'create' | 'edit';
}

export function BannerForm({ banner, mode }: BannerFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BannerFormValues>({
    resolver: zodResolver(bannerFormSchema),
    defaultValues: {
      title: banner?.title ?? '',
      imageUrl: banner?.imageUrl ?? '',
      linkUrl: banner?.linkUrl ?? '',
      position: banner?.position ?? '',
      startDate: banner?.startDate ?? '',
      endDate: banner?.endDate ?? '',
      order: banner?.order?.toString() ?? '',
    },
  });

  const positionValue = watch('position');

  const onSubmit = (data: BannerFormValues) => {
    // TODO: Call banner API
    // mode === 'create': POST /api/admin/content/banners
    // mode === 'edit': PUT /api/admin/content/banners/{banner.id}
    console.log('Banner form submitted:', { mode, data: { ...data, order: Number(data.order) } });
    router.push('/content/banners');
  };

  const formTitle = mode === 'create' ? bannerTexts.createTitle : bannerTexts.editTitle;
  const submitLabel = mode === 'create' ? bannerTexts.submitCreateButton : bannerTexts.submitEditButton;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{formTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="banner-title">{bannerTexts.titleLabel}</Label>
            <Input
              id="banner-title"
              placeholder={bannerTexts.titlePlaceholder}
              {...register('title')}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>{bannerTexts.imageUrlLabel}</Label>
            <ImageUploadField
              value={watch('imageUrl')}
              onChange={(url) => setValue('imageUrl', url, { shouldValidate: true })}
            />
            {errors.imageUrl && (
              <p className="text-sm text-destructive">{errors.imageUrl.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="banner-link-url">{bannerTexts.linkUrlLabel}</Label>
            <Input
              id="banner-link-url"
              placeholder={bannerTexts.linkUrlPlaceholder}
              {...register('linkUrl')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="banner-position">{bannerTexts.positionLabel}</Label>
            <Select
              value={positionValue}
              onValueChange={(value: string | null) => {
                setValue('position', value ?? '', { shouldValidate: true });
              }}
            >
              <SelectTrigger id="banner-position">
                <SelectValue placeholder={bannerTexts.positionPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TOP">{positionOptions.TOP}</SelectItem>
                <SelectItem value="MIDDLE">{positionOptions.MIDDLE}</SelectItem>
                <SelectItem value="BOTTOM">{positionOptions.BOTTOM}</SelectItem>
              </SelectContent>
            </Select>
            {errors.position && (
              <p className="text-sm text-destructive">{errors.position.message}</p>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="banner-start-date">{bannerTexts.startDateLabel}</Label>
              <Input
                id="banner-start-date"
                type="date"
                {...register('startDate')}
              />
              {errors.startDate && (
                <p className="text-sm text-destructive">{errors.startDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="banner-end-date">{bannerTexts.endDateLabel}</Label>
              <Input
                id="banner-end-date"
                type="date"
                {...register('endDate')}
              />
              {errors.endDate && (
                <p className="text-sm text-destructive">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="banner-order">{bannerTexts.orderLabel}</Label>
            <Input
              id="banner-order"
              type="number"
              min="0"
              placeholder={bannerTexts.orderPlaceholder}
              {...register('order')}
            />
            {errors.order && (
              <p className="text-sm text-destructive">{errors.order.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
