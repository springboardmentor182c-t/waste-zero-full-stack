import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <div class="centered">
    <div class="card">
      <h3 class="h1">Create account</h3>
      <p class="small">Register a new account</p>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="form-row"><input formControlName="name" type="text" placeholder="Full name" /></div>
        <div class="form-row"><input formControlName="email" type="email" placeholder="Email" /></div>
        <div class="form-row"><input formControlName="password" type="password" placeholder="Password" /></div>
        <div class="form-row"><button class="primary" type="submit">Register</button></div>
      </form>
      <a class="link" routerLink="/login">Already have an account? Login</a>
    </div>
  </div>
  `
})
export class RegisterComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });
  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    if (this.form.invalid) return;
    const { name, email, password } = this.form.value as any;
    this.auth.register(name, email, password).then(ok => {
      if (ok) this.router.navigate(['/login']);
      else alert('Registration failed');
    });
  }
}
