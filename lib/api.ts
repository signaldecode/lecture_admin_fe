import type { ApiError } from '@/types';

const API_BASE = '/api/proxy';

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE}/${path.replace(/^\//, '')}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (res.status === 401) {
    const refreshRes = await fetch('/api/auth/refresh', { method: 'POST' });

    if (refreshRes.ok) {
      const retryRes = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!retryRes.ok) {
        throw await createApiError(retryRes);
      }

      return retryRes.json() as Promise<T>;
    }

    window.location.href = '/login';
    throw { status: 401, message: 'Unauthorized' } satisfies ApiError;
  }

  if (!res.ok) {
    throw await createApiError(res);
  }

  return res.json() as Promise<T>;
}

async function createApiError(res: Response): Promise<ApiError> {
  let message = 'An error occurred';
  let code: string | undefined;

  try {
    const body = await res.json();
    message = body.message ?? message;
    code = body.code;
  } catch {
    // response body is not JSON
  }

  return { status: res.status, message, code };
}

export const apiClient = {
  get<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T> {
    let url = path;
    if (params) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          searchParams.set(key, String(value));
        }
      }
      const qs = searchParams.toString();
      if (qs) url += `?${qs}`;
    }
    return request<T>(url);
  },

  post<T>(path: string, body?: unknown): Promise<T> {
    return request<T>(path, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  put<T>(path: string, body?: unknown): Promise<T> {
    return request<T>(path, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  patch<T>(path: string, body?: unknown): Promise<T> {
    return request<T>(path, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  delete<T>(path: string): Promise<T> {
    return request<T>(path, { method: 'DELETE' });
  },
};
