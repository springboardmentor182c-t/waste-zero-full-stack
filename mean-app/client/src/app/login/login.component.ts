// src/app/login/login.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        
        <!-- Logo -->
        <div class="flex items-center justify-center mb-6">
          <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
            ♻️
          </div>
          <span class="ml-3 text-2xl font-bold text-gray-900">WasteZero</span>
        </div>

        <!-- Title -->
        <h2 class="text-center text-xl font-semibold text-gray-800 mb-4">
          Login to Your Account
        </h2>
        <p class="text-center text-gray-500 mb-6">
          Enter your credentials to continue
        </p>

        <!-- Login Form -->
        <form (ngSubmit)="onLogin()">
          <div class="space-y-4">
            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                [(ngModel)]="email"
                name="email"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                [(ngModel)]="password"
                name="password"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <!-- Remember Me -->
            <div class="flex items-center">
              <input
                id="remember"
                type="checkbox"
                [(ngModel)]="rememberMe"
                name="rememberMe"
                class="h-4 w-4 text-green-600 border-gray-300 rounded"
              />
              <label for="remember" class="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium"
            >
              Login
            </button>
          </div>
        </form>

        <!-- Extra Links -->
        <div class="mt-6 text-center text-sm text-gray-600">
          <a href="#" class="text-blue-600 hover:underline">Forgot password?</a>
        </div>
        <div class="mt-2 text-center text-sm text-gray-600">
          Don't have an account?
          <a href="#" class="text-green-600 font-medium hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* You can move these to a separate .scss file if needed */
  `]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  onLogin() {
    if (this.email && this.password) {
      alert('Login successful! (Email: ' + this.email + ')');
    } else {
      alert('Please enter your email and password.');
    }
  }
}
