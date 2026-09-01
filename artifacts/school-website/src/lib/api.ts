const envUrl = (import.meta.env.VITE_API_URL as string | undefined) ?? '';

export const API_BASE_URL = (envUrl || 'https://adarsh-school.onrender.com').replace(/\/+$/, '');

export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}