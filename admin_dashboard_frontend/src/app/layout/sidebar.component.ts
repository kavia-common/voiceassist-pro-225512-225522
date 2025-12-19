import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * PUBLIC_INTERFACE
 * SidebarComponent renders navigation links.
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <div class="brand">
        <div class="logo">VA</div>
        <div class="name">VoiceAssist Pro</div>
      </div>
      <nav>
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
        <a routerLink="/live" routerLinkActive="active">Live Calls</a>
        <a routerLink="/analytics" routerLinkActive="active">Analytics</a>
        <a routerLink="/users" routerLinkActive="active">Users</a>
        <a routerLink="/prompts" routerLinkActive="active">Prompts</a>
        <a routerLink="/settings" routerLinkActive="active">Settings</a>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 240px;
      background: linear-gradient(180deg, rgba(37,99,235,0.08), rgba(249,250,251,1));
      border-right: 1px solid #e5e7eb;
      padding: 20px 16px;
      position: sticky;
      top: 0;
      height: 100dvh;
    }
    .brand { display:flex; align-items:center; gap:10px; margin-bottom: 16px; }
    .logo { width:36px; height:36px; border-radius:10px; background:#2563EB; color:#fff; display:grid; place-items:center; font-weight:700; box-shadow:0 8px 20px rgba(37,99,235,0.25); }
    .name { font-weight:700; color:#111827; }
    nav { display:flex; flex-direction:column; gap:8px; }
    nav a {
      padding: 10px 12px;
      border-radius: 10px;
      color:#111827;
      text-decoration:none;
      transition: background 0.2s, color 0.2s, transform 0.1s;
    }
    nav a:hover { background:#eef2ff; color:#1e40af; }
    nav a.active { background:#dbeafe; color:#1d4ed8; font-weight:600; }
    @media (max-width: 900px) {
      .sidebar { width: 72px; padding: 16px 8px; }
      .name { display:none; }
      nav a { text-align:center; padding: 10px 6px; }
    }
  `]
})
export class SidebarComponent {
  @Input() collapsed = false;
}
