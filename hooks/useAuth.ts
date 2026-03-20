'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import { getDefaultPath } from '@/lib/permissions';
import type { AdminUser } from '@/types';

export function useAuth() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  async function login(email: string, password: string) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message ?? 'Login failed');

    const loggedInUser = data.data as AdminUser;
    setUser(loggedInUser);
    router.push(getDefaultPath(loggedInUser.role));
    return loggedInUser;
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    clearUser();
    router.push('/login');
  }

  return {
    user,
    role: user?.role ?? null,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
}
