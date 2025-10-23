import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  backendUrl = 'http://localhost:5000/api/v1';

  constructor(private router: Router, private http: HttpClient) {}

  isAuthenticated(): boolean {
    return sessionStorage.getItem('token') !== null;
  }

  canAccess() {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  detail() {
    const token = sessionStorage.getItem('token');
    return this.http.get<{ success: boolean, data: any }>(
      `${this.backendUrl}/auth/profile`,
      { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }
    );
  }

  canAuthenticate() {
    if (this.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  // FIXED: expects username (not name)
  register(username: string, email: string, password: string, role: string) {
    return this.http.post<{ success: boolean, data: { token: string } }>(
      `${this.backendUrl}/auth/register`, { username, email, password, role }
    );
  }

  storeToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  login(email: string, password: string) {
    return this.http.post<{ success: boolean, data: { token: string } }>(
      `${this.backendUrl}/auth/login`, { email, password }
    );
  }

  getProfile() {
    const token = sessionStorage.getItem('token');
    return this.http.get<{ success: boolean, data: any }>(
      `${this.backendUrl}/auth/profile`,
      { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }
    );
  }

  removeToken() {
    sessionStorage.removeItem('token');
  }
}
