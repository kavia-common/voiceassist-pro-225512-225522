import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

/**
 * PUBLIC_INTERFACE
 * HomeComponent shows summary and health widget plus a minimal seeded calls list.
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
            <div class="value">{{ activeCalls() ?? '--' }}</div>
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

      <section class="card" style="grid-column: span 12;">
        <h2>Recent Seeded Calls</h2>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Caller</th>
                <th>Agent</th>
                <th>Status</th>
                <th>Started</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let c of calls()">
                <td class="mono">{{ c.id || c._id }}</td>
                <td>{{ c.caller || c.from || '—' }}</td>
                <td>{{ c.agent || '—' }}</td>
                <td>{{ c.status || c.state || '—' }}</td>
                <td>{{ (c.startedAt || c.startTime) ? (c.startedAt || c.startTime) : '—' }}</td>
              </tr>
              <tr *ngIf="calls().length === 0">
                <td colspan="5" class="empty">No seeded calls found.</td>
              </tr>
            </tbody>
          </table>
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
    .table-wrap { overflow:auto; border-radius:10px; border:1px solid #e5e7eb; margin-top:8px; }
    table { width:100%; border-collapse:separate; border-spacing:0; font-size:14px; }
    thead th { text-align:left; background:#f9fafb; color:#6b7280; padding:10px 12px; position:sticky; top:0; }
    tbody td { padding:10px 12px; border-top:1px solid #f3f4f6; color:#111827; }
    .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size:12px; color:#374151; }
    .empty { text-align:center; color:#6b7280; padding:18px; }
    @media (max-width: 900px) { .card { grid-column: span 12; } }
  `]
})
export class HomeComponent implements OnInit {
  ok = signal(false);
  text = signal('Checking...');
  calls = signal<any[]>([]);
  activeCalls = signal<number | null>(null);

  constructor(private api: ApiService) {}

  async ngOnInit() {
    await this.refresh();
    await this.loadSeededCalls();
    setInterval(() => this.refresh(), 15000);
  }

  private async refresh() {
    const res = await this.api.health();
    this.ok.set(!!res.ok);
    this.text.set(res.ok ? 'Healthy' : res.status);
  }

  private async loadSeededCalls() {
    try {
      // Attempt to load calls from a standard endpoint if exposed by backend
      const list = await this.api.get<any[]>('/calls?limit=10').catch(() => []);
      this.calls.set(Array.isArray(list) ? list : []);
      // If we have an active count on /health payload, use it; else derive basic estimate
      const active = (this.calls() || []).filter(c => ['connected','ringing','queued'].includes(c.status || c.state)).length;
      this.activeCalls.set(active);
    } catch {
      this.calls.set([]);
      this.activeCalls.set(null);
    }
  }
}
