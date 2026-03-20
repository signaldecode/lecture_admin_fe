'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const profileSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  bio: z.string().min(1, '소개를 입력해주세요.'),
  profileImage: z.string().url('올바른 URL을 입력해주세요.').or(z.literal('')).optional(),
  linkedin: z.string().url('올바른 URL을 입력해주세요.').or(z.literal('')).optional(),
  twitter: z.string().url('올바른 URL을 입력해주세요.').or(z.literal('')).optional(),
  homepage: z.string().url('올바른 URL을 입력해주세요.').or(z.literal('')).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

// TODO: Replace with actual API call to /api/admin/instructor/profile
const mockProfile: ProfileFormValues = {
  name: '홍길동',
  bio: '10년차 프론트엔드 개발자입니다. React, TypeScript, Next.js를 전문으로 강의합니다.',
  profileImage: 'https://example.com/profile.jpg',
  linkedin: 'https://linkedin.com/in/honggildong',
  twitter: '',
  homepage: 'https://honggildong.dev',
};

export function InstructorProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: mockProfile,
  });

  async function onSubmit(values: ProfileFormValues) {
    // TODO: Replace with actual API call to PUT /api/admin/instructor/profile
    console.log('Profile update:', values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>프로필 수정</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              placeholder="이름을 입력하세요"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">소개</Label>
            <Textarea
              id="bio"
              placeholder="강사 소개를 입력하세요"
              rows={5}
              {...register('bio')}
            />
            {errors.bio && (
              <p className="text-sm text-destructive">{errors.bio.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="profileImage">프로필 이미지 URL</Label>
            <Input
              id="profileImage"
              placeholder="https://example.com/image.jpg"
              {...register('profileImage')}
            />
            {errors.profileImage && (
              <p className="text-sm text-destructive">{errors.profileImage.message}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/in/..."
                {...register('linkedin')}
              />
              {errors.linkedin && (
                <p className="text-sm text-destructive">{errors.linkedin.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                placeholder="https://twitter.com/..."
                {...register('twitter')}
              />
              {errors.twitter && (
                <p className="text-sm text-destructive">{errors.twitter.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="homepage">홈페이지</Label>
              <Input
                id="homepage"
                placeholder="https://example.com"
                {...register('homepage')}
              />
              {errors.homepage && (
                <p className="text-sm text-destructive">{errors.homepage.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '저장 중...' : '저장'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
