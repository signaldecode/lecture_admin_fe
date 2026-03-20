'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuthStore } from '@/stores/useAuthStore';
import { getDefaultPath } from '@/lib/permissions';
import type { AdminUser } from '@/types';
import uiData from '@/data/uiData.json';

const loginTexts = uiData.login;

const loginSchema = z.object({
  email: z
    .string()
    .min(1, loginTexts.errors.emailRequired)
    .email(loginTexts.errors.emailInvalid),
  password: z
    .string()
    .min(4, loginTexts.errors.passwordMinLength),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginFormValues) {
    setServerError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(
          data.message ?? loginTexts.errors.invalidCredentials,
        );
        return;
      }

      const user = data.data as AdminUser;
      setUser(user);

      const defaultPath = getDefaultPath(user.role);
      router.push(defaultPath);
    } catch {
      setServerError(loginTexts.errors.networkError);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{loginTexts.title}</CardTitle>
        <CardDescription>{loginTexts.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{loginTexts.emailLabel}</Label>
            <Input
              id="email"
              type="email"
              placeholder={loginTexts.emailPlaceholder}
              autoComplete="email"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{loginTexts.passwordLabel}</Label>
            <Input
              id="password"
              type="password"
              placeholder={loginTexts.passwordPlaceholder}
              autoComplete="current-password"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          {serverError && (
            <p className="text-sm text-destructive text-center">
              {serverError}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? loginTexts.loadingButton : loginTexts.submitButton}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
