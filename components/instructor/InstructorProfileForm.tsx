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
import uiData from '@/data/uiData.json';

const texts = uiData.instructor.profile;
const commonTexts = uiData.common;

const profileSchema = z.object({
  name: z.string().min(1, texts.validation.nameRequired),
  bio: z.string().min(1, texts.validation.bioRequired),
  profileImage: z.string().url(texts.validation.urlInvalid).or(z.literal('')).optional(),
  linkedin: z.string().url(texts.validation.urlInvalid).or(z.literal('')).optional(),
  twitter: z.string().url(texts.validation.urlInvalid).or(z.literal('')).optional(),
  homepage: z.string().url(texts.validation.urlInvalid).or(z.literal('')).optional(),
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
        <CardTitle>{texts.formTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">{texts.nameLabel}</Label>
            <Input
              id="name"
              placeholder={texts.namePlaceholder}
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">{texts.bioLabel}</Label>
            <Textarea
              id="bio"
              placeholder={texts.bioPlaceholder}
              rows={5}
              className='resize-none'
              {...register('bio')}
            />
            {errors.bio && (
              <p className="text-sm text-destructive">{errors.bio.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="profileImage">{texts.profileImageLabel}</Label>
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
              <Label htmlFor="homepage">{texts.homepageLabel}</Label>
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
              {isSubmitting ? texts.submittingButton : commonTexts.save}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
