'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CommunityCategory } from '@/types';
import uiData from '@/data/uiData.json';

const texts = uiData.community.categories;
const formTexts = texts.form;
const validationTexts = texts.validation;

const categoryFormSchema = z.object({
  name: z.string().min(1, validationTexts.nameRequired),
  slug: z
    .string()
    .min(1, validationTexts.slugRequired)
    .regex(/^[a-z0-9-]+$/, validationTexts.slugPattern),
  order: z
    .string()
    .min(1, validationTexts.orderRequired)
    .refine((val) => Number(val) >= 1, validationTexts.orderMin),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

interface CategoryFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: CommunityCategory | null;
  onSubmit: (data: { name: string; slug: string; order: number }) => void;
}

export function CategoryFormModal({
  open,
  onOpenChange,
  category,
  onSubmit,
}: CategoryFormModalProps) {
  const isEdit = Boolean(category);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: '',
      slug: '',
      order: '',
    },
  });

  useEffect(() => {
    if (open) {
      reset(
        category
          ? { name: category.name, slug: category.slug, order: String(category.order) }
          : { name: '', slug: '', order: '' },
      );
    }
  }, [open, category, reset]);

  const handleFormSubmit = (data: CategoryFormValues) => {
    onSubmit({
      name: data.name,
      slug: data.slug,
      order: Number(data.order),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? texts.editTitle : texts.createTitle}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="category-name">{formTexts.nameLabel}</Label>
            <Input
              id="category-name"
              placeholder={formTexts.namePlaceholder}
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-slug">{formTexts.slugLabel}</Label>
            <Input
              id="category-slug"
              placeholder={formTexts.slugPlaceholder}
              {...register('slug')}
            />
            {errors.slug && (
              <p className="text-sm text-destructive">{errors.slug.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-order">{formTexts.orderLabel}</Label>
            <Input
              id="category-order"
              type="number"
              min="1"
              placeholder={formTexts.orderPlaceholder}
              {...register('order')}
            />
            {errors.order && (
              <p className="text-sm text-destructive">{errors.order.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? formTexts.submittingButton
                : isEdit
                  ? formTexts.submitEditButton
                  : formTexts.submitCreateButton}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
