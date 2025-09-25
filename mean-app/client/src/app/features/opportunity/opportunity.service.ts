import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Opportunity {
  id: number;
  title: string;
  skills: string;
  duration: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class OpportunityService {
  private opportunities: Opportunity[] = [];
  private opportunities$ = new BehaviorSubject<Opportunity[]>(this.opportunities);
  private idCounter = 1;

  // Get observable for components to subscribe
  getOpportunities(): Observable<Opportunity[]> {
    return this.opportunities$.asObservable();
  }

  // Get single opportunity by ID
  getById(id: number): Opportunity | undefined {
    return this.opportunities.find(op => op.id === id);
  }

  // Add new opportunity
  addOpportunity(op: Omit<Opportunity, 'id'>) {
    const newOp: Opportunity = { id: this.idCounter++, ...op };
    this.opportunities.push(newOp);
    this.opportunities$.next([...this.opportunities]); // ✅ trigger update
  }

  // Update existing opportunity
  updateOpportunity(id: number, updatedOp: Omit<Opportunity, 'id'>) {
    const index = this.opportunities.findIndex(op => op.id === id);
    if (index !== -1) {
      this.opportunities[index] = { id, ...updatedOp };
      this.opportunities$.next([...this.opportunities]); // ✅ trigger update
    }
  }

  // Delete opportunity
  deleteOpportunity(id: number) {
    this.opportunities = this.opportunities.filter(op => op.id !== id);
    this.opportunities$.next([...this.opportunities]); // ✅ trigger update
  }
}
