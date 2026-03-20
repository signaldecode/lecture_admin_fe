import { NextResponse } from 'next/server';
import { config as appConfig } from '@/config';
import { COOKIE_NAME, getServerToken } from '@/lib/auth';

export async function POST() {
  const token = await getServerToken();

  if (!token) {
    return NextResponse.json({ message: 'No token' }, { status: 401 });
  }

  try {
    const backendRes = await fetch(
      `${appConfig.backendApiBase}/api/admin/auth/refresh`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!backendRes.ok) {
      const response = NextResponse.json(
        { message: 'Token refresh failed' },
        { status: 401 },
      );
      response.cookies.delete(COOKIE_NAME);
      return response;
    }

    const data = await backendRes.json();
    const newToken = data.token ?? data.accessToken;

    if (!newToken) {
      return NextResponse.json(
        { message: 'No token in refresh response' },
        { status: 500 },
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, newToken, {
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
