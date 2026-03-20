export const config = {
  apiBase: process.env.NEXT_PUBLIC_API_BASE ?? '/api',
  backendApiBase: process.env.BACKEND_API_BASE ?? 'http://localhost:8080',
  siteName: process.env.NEXT_PUBLIC_SITE_NAME ?? 'LMS Admin',
  adminDomain: process.env.NEXT_PUBLIC_ADMIN_DOMAIN ?? 'admin.example.com',
} as const;
