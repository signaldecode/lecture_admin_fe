import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getRoleFromToken } from '@/lib/auth';
import { canAccess, getDefaultPath } from '@/lib/permissions';

const PUBLIC_PATHS = ['/login'];
const COOKIE_NAME = 'admin_token';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  // Public paths
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    if (token) {
      const role = getRoleFromToken(token);
      if (role) {
        const defaultPath = getDefaultPath(role);
        return NextResponse.redirect(new URL(defaultPath, request.url));
      }
    }
    return NextResponse.next();
  }

  // No token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Decode role from JWT
  const role = getRoleFromToken(token);
  if (!role) {
    // Invalid token → clear cookie and redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  // Check route access
  if (!canAccess(role, pathname)) {
    const defaultPath = getDefaultPath(role);
    return NextResponse.redirect(new URL(defaultPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)',
  ],
};
