import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

/**
 * PUBLIC_INTERFACE
 * ApiService provides typed REST helper methods for the backend.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.BACKEND_URL;

  // PUBLIC_INTERFACE
  /**
   * Calls the backend health endpoint and returns a simplified status object.
   * @returns Promise<{ ok: boolean; status: string; raw?: any }>
   */
  async health(): Promise<{ ok: boolean; status: string; raw?: any }> {
    try {
      const res = await fetch(`${this.baseUrl}/health`, { headers: { 'Accept': 'application/json' } });
      if (!res.ok) return { ok: false, status: `HTTP ${res.status}` };
      const data = await res.json().catch(() => ({}));
      return { ok: true, status: data?.status || 'ok', raw: data };
    } catch (err: any) {
      return { ok: false, status: err?.message || 'error' };
    }
  }

  // PUBLIC_INTERFACE
  /** Generic GET helper. */
  async get<T = any>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, { ...(init || {}), method: 'GET' });
    if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
    return res.json();
  }

  // PUBLIC_INTERFACE
  /** Generic POST helper. */
  async post<T = any>(path: string, body?: any, init?: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...(init || {}),
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
      body: body !== undefined ? JSON.stringify(body) : undefined
    });
    if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
    return res.json();
  }
}
