import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { TopbarComponent } from './topbar.component';

/**
 * PUBLIC_INTERFACE
 * ShellComponent defines the main layout with sidebar/topbar and content outlet.
 */
@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopbarComponent],
  template: `
    <div class="layout">
      <app-sidebar></app-sidebar>
      <main>
        <app-topbar></app-topbar>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .layout { display:grid; grid-template-columns: 240px 1fr; min-height: 100dvh; background:#f9fafb; }
    main { display:flex; flex-direction:column; min-width: 0; }
    .content { padding:16px; }
    @media (max-width: 900px) {
      .layout { grid-template-columns: 72px 1fr; }
    }
  `]
})
export class ShellComponent {}
