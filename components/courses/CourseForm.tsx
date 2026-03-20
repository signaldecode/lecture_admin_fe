'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import uiData from '@/data/uiData.json';
import type { Course } from '@/types';

const texts = uiData.courses;
const formTexts = texts.form;
const validationTexts = texts.validation;
const commonTexts = uiData.common;
const difficultyLabels = texts.difficultyLabels;

const courseSchema = z.object({
  title: z.string().min(1, validationTexts.titleRequired),
  description: z.string().min(1, validationTexts.descriptionRequired),
  categoryId: z.string().min(1, validationTexts.categoryRequired),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'], {
    error: validationTexts.difficultyRequired,
  }),
  price: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) >= 0,
    validationTexts.priceInvalid,
  ),
});

type CourseFormValues = z.infer<typeof courseSchema>;

interface CourseFormProps {
  course?: Course;
  mode: 'create' | 'edit';
}

const categories = [
  { id: '1', name: '프론트엔드' },
  { id: '2', name: '백엔드' },
  { id: '3', name: '데이터사이언스' },
  { id: '4', name: '디자인' },
  { id: '5', name: '비즈니스' },
];

export function CourseForm({ course, mode }: CourseFormProps) {
  const router = useRouter();
  const isEdit = mode === 'edit';

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: course?.title ?? '',
      description: course?.description ?? '',
      categoryId: course ? String(course.categoryId) : '',
      difficulty: course?.difficulty ?? '' as CourseFormValues['difficulty'],
      price: course ? String(course.price) : '',
    },
  });

  async function onSubmit(values: CourseFormValues) {
    // TODO: Replace with actual API call
    // if (isEdit && course) {
    //   await apiClient.put(`courses/${course.id}`, values);
    // } else {
    //   await apiClient.post('courses', values);
    // }
    router.push('/courses');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? formTexts.editTitle : formTexts.createTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">{formTexts.titleLabel}</Label>
            <Input
              id="title"
              placeholder={formTexts.titlePlaceholder}
              {...register('title')}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{formTexts.descriptionLabel}</Label>
            <Textarea
              id="description"
              placeholder={formTexts.descriptionPlaceholder}
              rows={5}
              className='resize-none'
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="categoryId">{formTexts.categoryLabel}</Label>
              <Select
                value={watch('categoryId') ?? ''}
                onValueChange={(v) => setValue('categoryId', v ?? '')}
              >
                <SelectTrigger id="categoryId">
                  <SelectValue placeholder={formTexts.categoryPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.categoryId && (
                <p className="text-sm text-destructive">{errors.categoryId.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">{formTexts.difficultyLabel}</Label>
              <Select
                value={watch('difficulty') ?? ''}
                onValueChange={(v) =>
                  setValue('difficulty', (v ?? 'BEGINNER') as CourseFormValues['difficulty'])
                }
              >
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder={formTexts.difficultyPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BEGINNER">{difficultyLabels.BEGINNER}</SelectItem>
                  <SelectItem value="INTERMEDIATE">{difficultyLabels.INTERMEDIATE}</SelectItem>
                  <SelectItem value="ADVANCED">{difficultyLabels.ADVANCED}</SelectItem>
                </SelectContent>
              </Select>
              {errors.difficulty && (
                <p className="text-sm text-destructive">{errors.difficulty.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">{formTexts.priceLabel}</Label>
              <Input
                id="price"
                type="number"
                placeholder={formTexts.pricePlaceholder}
                {...register('price')}
              />
              {errors.price && (
                <p className="text-sm text-destructive">{errors.price.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? formTexts.submittingButton : isEdit ? formTexts.submitEditButton : formTexts.submitCreateButton}
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
