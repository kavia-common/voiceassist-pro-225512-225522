import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { WsService } from '../services/ws.service';

/**
 * PUBLIC_INTERFACE
 * LiveCallsComponent renders a table of incoming real-time call events.
 */
@Component({
  selector: 'app-live-calls',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <section class="card">
      <div class="header">
        <h2>Live Calls</h2>
        <div class="status" [class.ok]="ws.connected()" [class.bad]="!ws.connected()">
          <span class="dot"></span>
          {{ ws.connected() ? 'Connected' : 'Disconnected' }}
        </div>
      </div>

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
            <tr *ngFor="let e of events()">
              <td class="mono">{{ e.id }}</td>
              <td>{{ e.caller }}</td>
              <td>{{ e.agent || '—' }}</td>
              <td><span class="pill" [class.connected]="e.status==='connected'"
                               [class.ringing]="e.status==='ringing'"
                               [class.ended]="e.status==='ended'"
                               [class.queued]="e.status==='queued'">{{ e.status }}</span></td>
              <td>{{ e.startedAt | date:'short' }}</td>
            </tr>
            <tr *ngIf="events().length === 0">
              <td colspan="5" class="empty">No events yet. Waiting for activity...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: [`
    .card { background:#fff; padding:16px; border-radius:14px; border:1px solid #e5e7eb;
      box-shadow: 0 10px 30px rgba(0,0,0,0.04); }
    .header { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
    h2 { font-size:16px; color:#111827; }
    .status { font-size:12px; padding:6px 10px; border-radius:999px; background:#f3f4f6; color:#374151; display:flex; align-items:center; gap:6px; }
    .status.ok { background:#ecfdf5; color:#065f46; }
    .status.bad { background:#fef2f2; color:#991b1b; }
    .dot { width:8px; height:8px; border-radius:999px; background:#9ca3af; }
    .ok .dot { background:#10b981; }
    .bad .dot { background:#ef4444; }
    .table-wrap { overflow:auto; border-radius:10px; border:1px solid #e5e7eb; }
    table { width:100%; border-collapse:separate; border-spacing:0; font-size:14px; }
    thead th { text-align:left; background:#f9fafb; color:#6b7280; padding:10px 12px; position:sticky; top:0; }
    tbody td { padding:10px 12px; border-top:1px solid #f3f4f6; color:#111827; }
    .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size:12px; color:#374151; }
    .pill { padding:4px 8px; border-radius:999px; font-size:12px; background:#eef2ff; color:#1e40af; }
    .pill.connected { background:#dcfce7; color:#166534; }
    .pill.ringing { background:#fef3c7; color:#92400e; }
    .pill.ended { background:#fee2e2; color:#991b1b; }
    .pill.queued { background:#e0e7ff; color:#3730a3; }
    .empty { text-align:center; color:#6b7280; padding:18px; }
  `]
})
export class LiveCallsComponent {
  constructor(public ws: WsService) {}

  // expose signal for template
  events = () => this.ws.events();
}
