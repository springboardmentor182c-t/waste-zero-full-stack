import { Routes } from '@angular/router';
import { AuthPageComponent } from './features/auth/pages/auth-page/auth-page';

export const routes: Routes = [
  { path: 'auth', component: AuthPageComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }
];
