import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PickupService {
  private baseUrl = 'http://localhost:3000/api/pickup';

  constructor(private http: HttpClient) {}

  schedulePickup(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/pickups/schedule`, data);
  }

  getUserPickups(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/pickups/user/${userId}`);
  }

  updatePickupStatus(pickupId: string, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/pickups/${pickupId}/status`, { status });
  }
}
