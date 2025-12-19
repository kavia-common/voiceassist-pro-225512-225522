import { Component } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * UsersComponent placeholder page.
 */
@Component({
  selector: 'app-users',
  standalone: true,
  template: `
    <section class="card">
      <h2>Users</h2>
      <p class="muted">Manage users, roles, and permissions.</p>
    </section>
  `,
  styles: [`
    .card { background:#fff; padding:16px; border-radius:14px; border:1px solid #e5e7eb;
      box-shadow: 0 10px 30px rgba(0,0,0,0.04); }
    h2 { font-size:16px; color:#111827; margin-bottom:8px; }
    .muted { color:#6b7280; }
  `]
})
export class UsersComponent {}
