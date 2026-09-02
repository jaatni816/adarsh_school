const envUrl = (import.meta.env.VITE_API_URL as string | undefined) ?? '';

// Dev mode me Vite proxy ("/api" -> localhost:API_PORT) use karo, production
// build me Render URL. Isse chatbot local backend se judta hai jahan nayi
// fixes applied hoti hain.
const fallback = import.meta.env.DEV ? '' : 'https://adarsh-school.onrender.com';

export const API_BASE_URL = (envUrl || fallback).replace(/\/+$/, '');

export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}