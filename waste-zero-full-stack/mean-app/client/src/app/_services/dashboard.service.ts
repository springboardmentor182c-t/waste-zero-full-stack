import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private dashboardUrl = 'http://localhost:5000/api/dashboard';

  constructor(private http: HttpClient) {}

  getDashboardData(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(this.dashboardUrl, { headers });
  }
}
