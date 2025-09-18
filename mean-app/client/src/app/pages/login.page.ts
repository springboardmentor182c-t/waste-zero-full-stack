import { Component, inject, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../core/auth.service";

@Component({
  selector: "wz-login",
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <div class="grid lg:grid-cols-2 gap-10 items-start">
      <div class="hidden lg:block">
        <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Join the <span class="text-primary">Recycling</span> Revolution
        </h1>
        <p class="mt-4 text-slate-600 dark:text-neutral-300 max-w-xl">
          WasteZero connects volunteers, NGOs, and administrators to schedule
          pickups, manage recycling opportunities, and make a positive impact.
        </p>
        <div class="mt-6 grid grid-cols-3 gap-3">
          <div class="card p-4 text-center">
            <div class="font-semibold">Schedule Pickups</div>
          </div>
          <div class="card p-4 text-center">
            <div class="font-semibold">Track Impact</div>
          </div>
          <div class="card p-4 text-center">
            <div class="font-semibold">Volunteer</div>
          </div>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-center mb-4">
          <div
            class="inline-flex rounded-lg border border-slate-200 dark:border-neutral-800 overflow-hidden"
          >
            <a routerLink="/login" class="tab tab-active">Login</a>
            <a routerLink="/register" class="tab">Register</a>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <div class="text-lg font-semibold">Login to your account</div>
            <p class="text-sm text-slate-500 dark:text-neutral-400">
              Enter your credentials to access your account
            </p>
          </div>
          <div class="card-body space-y-4">
            <div>
              <label class="label">Username</label>
              <input
                class="input"
                placeholder="Your username"
                [(ngModel)]="username"
              />
            </div>
            <div>
              <label class="label">Password</label>
              <input
                class="input"
                type="password"
                placeholder="Your password"
                [(ngModel)]="password"
              />
            </div>
            <button class="btn btn-primary w-full py-3" (click)="onLogin()">
              Login
            </button>
            <p *ngIf="error()" class="text-sm text-red-600">{{ error() }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LoginPage {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = "";
  password = "";
  error = signal<string | null>(null);

  onLogin() {
    const res = this.auth.login(this.username.trim(), this.password);
    if (res.ok) {
      this.router.navigateByUrl("/profile");
    } else {
      this.error.set(res.message ?? "Login failed");
    }
  }
}
