import { Component, Input, OnInit, signal } from '@angular/core';
import { ApiService } from '../services/api.service';

/**
 * PUBLIC_INTERFACE
 * TopbarComponent shows app title and backend health indicator.
 */
@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  template: `
    <header class="topbar">
      <div class="left">
        <h1>{{title}}</h1>
        <span class="subtitle">AI Voice Operations Dashboard</span>
      </div>
      <div class="right">
        <div class="health" [class.ok]="healthOk()" [class.bad]="!healthOk()">
          <span class="dot"></span>
          <span>{{ healthText() }}</span>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .topbar {
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      background: #ffffff;
      border-bottom: 1px solid #e5e7eb;
      position: sticky;
      top: 0;
      z-index: 5;
    }
    h1 { font-size: 18px; color:#111827; margin-right: 10px; }
    .subtitle { color:#6b7280; font-size: 12px; }
    .left { display:flex; align-items:center; gap:8px; }
    .right { display:flex; align-items:center; gap:16px; }
    .health {
      display:flex; align-items:center; gap:6px;
      padding: 6px 10px; border-radius:999px;
      background:#f3f4f6; color:#374151; font-size:12px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.04) inset;
    }
    .health.ok { background: #ecfdf5; color:#065f46; }
    .health.bad { background: #fef2f2; color:#991b1b; }
    .dot { width:8px; height:8px; border-radius:999px; background:#9ca3af; display:inline-block; }
    .ok .dot { background:#10b981; }
    .bad .dot { background:#ef4444; }
  `]
})
export class TopbarComponent implements OnInit {
  @Input() title = 'VoiceAssist Pro';
  healthOk = signal(false);
  healthText = signal('Checking...');

  constructor(private api: ApiService) {}

  async ngOnInit() {
    // initial health check and periodic refresh
    await this.refreshHealth();
    setInterval(() => this.refreshHealth(), 15000);
  }

  private async refreshHealth() {
    const res = await this.api.health();
    this.healthOk.set(!!res.ok);
    this.healthText.set(res.ok ? 'Backend: Healthy' : `Backend: ${res.status}`);
  }
}
