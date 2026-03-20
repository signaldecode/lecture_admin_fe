import { cookies } from 'next/headers';
import type { AdminUser, AdminRole } from '@/types';

const COOKIE_NAME = 'admin_token';

interface JwtPayload {
  sub: string;
  userId: number;
  email: string;
  name: string;
  role: AdminRole;
  exp: number;
  iat: number;
}

function base64UrlDecode(str: string): string {
  // base64url → base64
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) base64 += '=';

  if (typeof Buffer !== 'undefined') {
    return Buffer.from(base64, 'base64').toString('utf-8');
  }
  // Browser fallback
  return decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  );
}

function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    return payload as JwtPayload;
  } catch {
    return null;
  }
}

function isTokenExpired(payload: JwtPayload): boolean {
  return Date.now() >= payload.exp * 1000;
}

export function getUserFromToken(token: string): AdminUser | null {
  const payload = decodeJwtPayload(token);
  if (!payload || isTokenExpired(payload)) return null;

  return {
    id: payload.userId,
    email: payload.email,
    name: payload.name,
    role: payload.role,
  };
}

export function getRoleFromToken(token: string): AdminRole | null {
  const payload = decodeJwtPayload(token);
  if (!payload || isTokenExpired(payload)) return null;
  return payload.role;
}

export async function getServerToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function getServerUser(): Promise<AdminUser | null> {
  const token = await getServerToken();
  if (!token) return null;
  return getUserFromToken(token);
}

export async function getServerRole(): Promise<AdminRole | null> {
  const user = await getServerUser();
  return user?.role ?? null;
}

export { COOKIE_NAME };
