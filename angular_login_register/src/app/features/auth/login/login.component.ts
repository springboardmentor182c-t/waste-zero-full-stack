import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <div class="centered">
    <div class="card">
      <h3 class="h1">Welcome back</h3>
      <p class="small">Login to your account</p>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="form-row"><input formControlName="email" type="email" placeholder="Email" /></div>
        <div class="form-row"><input formControlName="password" type="password" placeholder="Password" /></div>
        <div class="form-row"><button class="primary" type="submit">Login</button></div>
      </form>
      <a class="link" routerLink="/register">Create an account</a>
    </div>
  </div>
  `
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });
  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value as any;
    this.auth.login(email, password).then(ok => {
      if (ok) this.router.navigate(['/profile']);
      else alert('Login failed');
    });
  }
}
