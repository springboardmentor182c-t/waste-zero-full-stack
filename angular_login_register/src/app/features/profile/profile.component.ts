import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="centered">
    <div class="card">
      <h3 class="h1">Profile</h3>
      <p class="small">You are logged in.</p>
      <div style="margin-top:12px;">
        <button class="primary" (click)="logout()">Logout</button>
      </div>
    </div>
  </div>
  `
})
export class ProfileComponent {
  constructor(private auth: AuthService, private router: Router) {}
  logout() { this.auth.logout(); this.router.navigate(['/login']); }
}
