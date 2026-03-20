import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { config as appConfig } from '@/config';
import { COOKIE_NAME } from '@/lib/auth';
import type { AdminUser, AdminRole } from '@/types';

// ── Mock accounts (dev only, remove when backend is ready) ──
const MOCK_ACCOUNTS: Record<string, { password: string; user: AdminUser }> = {
  'admin@example.com': {
    password: 'admin1234',
    user: { id: 1, email: 'admin@example.com', name: '슈퍼관리자', role: 'SUPER_ADMIN' },
  },
  'instructor@example.com': {
    password: 'inst1234',
    user: { id: 2, email: 'instructor@example.com', name: '김강사', role: 'INSTRUCTOR' },
  },
  'cs@example.com': {
    password: 'cs1234',
    user: { id: 3, email: 'cs@example.com', name: '박상담', role: 'CS_AGENT' },
  },
};

function toBase64Url(str: string): string {
  return Buffer.from(str, 'utf-8').toString('base64url');
}

function createMockJwt(user: AdminUser): string {
  const header = toBase64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = toBase64Url(
    JSON.stringify({
      sub: user.email,
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24h
    }),
  );
  const signature = toBase64Url('mock-signature');
  return `${header}.${payload}.${signature}`;
}

function tryMockLogin(email: string, password: string) {
  const account = MOCK_ACCOUNTS[email];
  if (!account || account.password !== password) return null;
  return { user: account.user, token: createMockJwt(account.user) };
}
// ── End mock accounts ──

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body as { email: string; password: string };

    // Try mock login first (dev mode)
    const mockResult = tryMockLogin(email, password);
    if (mockResult) {
      const response = NextResponse.json({
        success: true,
        data: mockResult.user,
      });

      response.cookies.set(COOKIE_NAME, mockResult.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24,
      });

      return response;
    }

    // Fall through to real backend
    const backendRes = await fetch(
      `${appConfig.backendApiBase}/api/admin/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    );

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message ?? 'Login failed' },
        { status: backendRes.status },
      );
    }

    const token = data.token ?? data.accessToken;
    if (!token) {
      return NextResponse.json(
        { message: 'No token received' },
        { status: 500 },
      );
    }

    const response = NextResponse.json({
      success: true,
      data: data.user ?? data.data,
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
