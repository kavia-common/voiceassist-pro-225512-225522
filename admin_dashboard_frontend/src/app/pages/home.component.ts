import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

/**
 * PUBLIC_INTERFACE
 * HomeComponent shows summary and health widget.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid">
      <section class="card health">
        <h2>System Health</h2>
        <p class="status" [class.ok]="ok()" [class.bad]="!ok()">
          <span class="dot"></span>
          <span>{{ text() }}</span>
        </p>
        <p class="hint">Polling /health every 15s</p>
      </section>

      <section class="card accent">
        <h2>Quick Stats</h2>
        <div class="stats">
          <div>
            <div class="label">Active Calls</div>
            <div class="value">--</div>
          </div>
          <div>
            <div class="label">Avg. Response</div>
            <div class="value">-- ms</div>
          </div>
          <div>
            <div class="label">Agents Online</div>
            <div class="value">--</div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .grid { display:grid; grid-template-columns: repeat(12, 1fr); gap:16px; }
    .card { grid-column: span 6; background:#fff; padding:16px; border-radius:14px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.04); border:1px solid #e5e7eb; }
    .card.accent { background: linear-gradient(180deg, rgba(37,99,235,0.08), #fff); }
    h2 { font-size:16px; color:#111827; margin-bottom:10px; }
    .status { display:flex; align-items:center; gap:8px; padding:10px 12px; border-radius:10px; background:#f3f4f6; color:#374151; }
    .status.ok { background:#ecfdf5; color:#065f46; }
    .status.bad { background:#fef2f2; color:#991b1b; }
    .dot { width:8px; height:8px; background:#9ca3af; border-radius:999px; }
    .status.ok .dot { background:#10b981; }
    .status.bad .dot { background:#ef4444; }
    .hint { color:#6b7280; font-size:12px; margin-top:8px; }
    .stats { display:flex; gap:24px; }
    .label { color:#6b7280; font-size:12px; }
    .value { color:#111827; font-weight:700; font-size:18px; }
    @media (max-width: 900px) { .card { grid-column: span 12; } }
  `]
})
export class HomeComponent implements OnInit {
  ok = signal(false);
  text = signal('Checking...');

  constructor(private api: ApiService) {}

  async ngOnInit() {
    await this.refresh();
    setInterval(() => this.refresh(), 15000);
  }

  private async refresh() {
    const res = await this.api.health();
    this.ok.set(!!res.ok);
    this.text.set(res.ok ? 'Healthy' : res.status);
  }
}
