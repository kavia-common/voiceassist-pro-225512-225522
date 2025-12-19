import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell.component';
import { HomeComponent } from './pages/home.component';
import { LiveCallsComponent } from './pages/live-calls.component';
import { AnalyticsComponent } from './pages/analytics.component';
import { UsersComponent } from './pages/users.component';
import { PromptsComponent } from './pages/prompts.component';
import { SettingsComponent } from './pages/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'live', component: LiveCallsComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'prompts', component: PromptsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];
