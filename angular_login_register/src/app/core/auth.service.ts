import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'APP_TOKEN';

  login(email: string, password: string) {
    // Fake auth: accept any non-empty
    if (email && password) {
      const token = btoa(email + ':' + Date.now());
      localStorage.setItem(this.tokenKey, token);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  register(name: string, email: string, password: string) {
    // Fake register, simply resolve true
    return Promise.resolve(true);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated() {
    return !!localStorage.getItem(this.tokenKey);
  }
}
