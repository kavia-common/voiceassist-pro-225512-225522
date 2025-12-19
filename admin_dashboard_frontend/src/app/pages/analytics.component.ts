import { Component } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * AnalyticsComponent placeholder page.
 */
@Component({
  selector: 'app-analytics',
  standalone: true,
  template: `
    <section class="card">
      <h2>Analytics</h2>
      <p class="muted">Analytics charts and insights will appear here.</p>
    </section>
  `,
  styles: [`
    .card { background:#fff; padding:16px; border-radius:14px; border:1px solid #e5e7eb;
      box-shadow: 0 10px 30px rgba(0,0,0,0.04); }
    h2 { font-size:16px; color:#111827; margin-bottom:8px; }
    .muted { color:#6b7280; }
  `]
})
export class AnalyticsComponent {}
