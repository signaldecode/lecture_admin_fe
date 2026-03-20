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
import type { Course } from '@/types';

const courseSchema = z.object({
  title: z.string().min(1, '강의명을 입력해주세요.'),
  description: z.string().min(1, '강의 설명을 입력해주세요.'),
  categoryId: z.string().min(1, '카테고리를 선택해주세요.'),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'], {
    error: '난이도를 선택해주세요.',
  }),
  price: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) >= 0,
    '가격은 0 이상의 숫자여야 합니다.',
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
    defaultValues: course
      ? {
          title: course.title,
          description: course.description,
          categoryId: String(course.categoryId),
          difficulty: course.difficulty,
          price: String(course.price),
        }
      : undefined,
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
        <CardTitle>{isEdit ? '강의 수정' : '강의 등록'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">강의명</Label>
            <Input
              id="title"
              placeholder="강의명을 입력하세요"
              {...register('title')}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">강의 설명</Label>
            <Textarea
              id="description"
              placeholder="강의에 대한 설명을 입력하세요"
              rows={5}
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="categoryId">카테고리</Label>
              <Select
                value={watch('categoryId')}
                onValueChange={(v) => setValue('categoryId', v ?? '')}
              >
                <SelectTrigger id="categoryId">
                  <SelectValue placeholder="카테고리 선택" />
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
              <Label htmlFor="difficulty">난이도</Label>
              <Select
                value={watch('difficulty')}
                onValueChange={(v) =>
                  setValue('difficulty', (v ?? 'BEGINNER') as CourseFormValues['difficulty'])
                }
              >
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder="난이도 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BEGINNER">입문</SelectItem>
                  <SelectItem value="INTERMEDIATE">중급</SelectItem>
                  <SelectItem value="ADVANCED">고급</SelectItem>
                </SelectContent>
              </Select>
              {errors.difficulty && (
                <p className="text-sm text-destructive">{errors.difficulty.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">가격 (원)</Label>
              <Input
                id="price"
                type="number"
                placeholder="0"
                {...register('price')}
              />
              {errors.price && (
                <p className="text-sm text-destructive">{errors.price.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '저장 중...' : isEdit ? '수정' : '등록'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              취소
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
