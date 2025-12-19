import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

export interface LiveCallEvent {
  id: string;
  caller: string;
  agent?: string;
  status: 'ringing' | 'connected' | 'ended' | 'queued';
  startedAt: string; // ISO
  metadata?: Record<string, any>;
}

/**
 * PUBLIC_INTERFACE
 * WsService handles live WebSocket event subscription with fallback mock mode.
 */
@Injectable({ providedIn: 'root' })
export class WsService {
  private ws?: WebSocket;
  private reconnectTimer?: any;
  private url = environment.WS_URL;
  connected = signal<boolean>(false);
  // PUBLIC_INTERFACE
  events = signal<LiveCallEvent[]>([]);

  constructor() {
    this.start();
  }

  private start() {
    try {
      this.ws = new WebSocket(this.url);
      this.ws.onopen = () => {
        this.connected.set(true);
      };
      this.ws.onclose = () => {
        this.connected.set(false);
        this.scheduleReconnect();
      };
      this.ws.onerror = () => {
        // Switch to mock if cannot connect initially
        if (!this.connected()) {
          this.initMock();
        }
      };
      this.ws.onmessage = (msg) => {
        try {
          const data = JSON.parse(msg.data);
          this.pushEvent(data);
        } catch {
          // ignore
        }
      };
    } catch {
      this.initMock();
    }
  }

  private scheduleReconnect() {
    if (this.reconnectTimer) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = undefined;
      this.start();
    }, 3000);
  }

  private pushEvent(evt: LiveCallEvent) {
    const current = this.events();
    // update or insert
    const idx = current.findIndex(e => e.id === evt.id);
    let next: LiveCallEvent[];
    if (idx >= 0) {
      next = [...current];
      next[idx] = { ...current[idx], ...evt };
    } else {
      next = [evt, ...current].slice(0, 100);
    }
    this.events.set(next);
  }

  private mockTimer?: any;

  private initMock() {
    if (this.mockTimer) return;
    // Produce mock events every 3s
    this.mockTimer = setInterval(() => {
      const now = new Date();
      const randomId = Math.random().toString(36).slice(2, 10);
      const statuses: LiveCallEvent['status'][] = ['ringing', 'connected', 'ended', 'queued'];
      const evt: LiveCallEvent = {
        id: randomId,
        caller: `+1-555-${Math.floor(1000000 + Math.random() * 8999999)}`,
        agent: ['Alex', 'Jordan', 'Taylor', 'Sam'][Math.floor(Math.random() * 4)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        startedAt: new Date(now.getTime() - Math.floor(Math.random() * 600000)).toISOString(),
        metadata: { mock: true }
      };
      this.pushEvent(evt);
    }, 3000);
  }
}
