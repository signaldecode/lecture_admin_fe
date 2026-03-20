import { NextResponse } from 'next/server';
import { config as appConfig } from '@/config';
import { COOKIE_NAME, getServerToken } from '@/lib/auth';

export async function POST() {
  try {
    const token = await getServerToken();

    if (token) {
      await fetch(`${appConfig.backendApiBase}/api/admin/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {
        // backend logout failure is non-critical
      });
    }
  } catch {
    // ignore backend errors during logout
  }

  const response = NextResponse.json({ success: true });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
