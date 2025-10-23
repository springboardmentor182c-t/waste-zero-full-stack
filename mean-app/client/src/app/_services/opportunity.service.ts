import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Opportunity {
  _id: string;    // Changed id to _id here
  ngo_id: number;
  title: string;
  description: string;
  required_skills: string[];
  duration: string;
  location: string;
  status: string;
  date: string;
  imageUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class OpportunityService {
  private baseUrl = 'http://localhost:5000/api/opportunities';

  constructor(private http: HttpClient) {}

  createOpportunity(opportunityData: any): Observable<any> {
    return this.http.post(this.baseUrl, opportunityData);
  }

  getAllOpportunities(): Observable<Opportunity[]> {
    return this.http.get<Opportunity[]>(this.baseUrl);
  }

  getOpportunityById(id: string): Observable<Opportunity> {
    return this.http.get<Opportunity>(`${this.baseUrl}/${id}`);
  }
  updateOpportunity(id: string, data: Partial<Opportunity>): Observable<any> {
  return this.http.put(`${this.baseUrl}/${id}`, data);
}
deleteOpportunity(id: string): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${id}`);
}

}
