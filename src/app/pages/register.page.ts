import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService, Role } from "../core/auth.service";

@Component({
  selector: "wz-register",
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="grid lg:grid-cols-2 gap-10 items-start">
      <div class="hidden lg:block">
        <h2 class="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Create a new account
        </h2>
        <p class="mt-4 text-slate-600 dark:text-neutral-300 max-w-xl">
          Fill in your details to join WasteZero and start scheduling pickups,
          tracking impact, and collaborating with your community.
        </p>
      </div>

      <div>
        <div class="flex items-center justify-center mb-4">
          <div
            class="inline-flex rounded-lg border border-slate-200 dark:border-neutral-800 overflow-hidden"
          >
            <a routerLink="/login" class="tab">Login</a>
            <a routerLink="/register" class="tab tab-active">Register</a>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <div class="text-lg font-semibold">Create a new account</div>
          </div>
          <div class="card-body grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="label">Full Name</label>
              <input
                class="input"
                placeholder="Your full name"
                [(ngModel)]="fullName"
              />
            </div>
            <div>
              <label class="label">Email</label>
              <input
                class="input"
                placeholder="Your email"
                [(ngModel)]="email"
              />
            </div>
            <div>
              <label class="label">Username</label>
              <input
                class="input"
                placeholder="Choose a username"
                [(ngModel)]="username"
              />
            </div>
            <div>
              <label class="label">Role</label>
              <select class="input" [(ngModel)]="role">
                <option>Volunteer</option>
                <option>NGO</option>
                <option>Admin</option>
              </select>
            </div>
            <div>
              <label class="label">Password</label>
              <input
                class="input"
                type="password"
                placeholder="Create a password"
                [(ngModel)]="password"
              />
            </div>
            <div>
              <label class="label">Confirm Password</label>
              <input
                class="input"
                type="password"
                placeholder="Confirm your password"
                [(ngModel)]="confirm"
              />
            </div>
            <div class="sm:col-span-2">
              <label class="label">Location (Optional)</label>
              <input
                class="input"
                placeholder="Your city or area"
                [(ngModel)]="location"
              />
            </div>
            <div class="sm:col-span-2 space-y-3">
              <button
                class="btn btn-primary w-full py-3"
                (click)="onRegister()"
              >
                Create Account
              </button>
              <p *ngIf="error()" class="text-sm text-red-600">{{ error() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class RegisterPage {
  private auth = inject(AuthService);
  private router = inject(Router);

  fullName = "";
  email = "";
  username = "";
  password = "";
  confirm = "";
  location = "";
  role: Role = "Volunteer";

  error = signal<string | null>(null);

  onRegister() {
    if (
      !this.fullName ||
      !this.email ||
      !this.username ||
      !this.password ||
      !this.confirm
    ) {
      this.error.set("Please fill in all required fields");
      return;
    }
    if (this.password !== this.confirm) {
      this.error.set("Passwords do not match");
      return;
    }
    const res = this.auth.register({
      fullName: this.fullName,
      email: this.email,
      username: this.username,
      password: this.password,
      role: this.role,
      location: this.location,
    });
    if (res.ok) {
      this.router.navigateByUrl("/profile");
    } else {
      this.error.set(res.message ?? "Registration failed");
    }
  }
}
