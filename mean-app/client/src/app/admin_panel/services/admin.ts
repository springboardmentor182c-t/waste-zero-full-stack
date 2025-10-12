import { Injectable } from '@angular/core';
import { User, DashboardStats } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private stats: DashboardStats = {
    totalUsers: 0,
    completedPickups: 0,
    pendingPickups: 0,
    activeOpportunities: 0
  };

  private users: User[] = [];

  constructor() { }

  getStats(): DashboardStats {
    return this.stats;
  }

  getUsers(): User[] {
    return this.users;
  }

  searchUsers(query: string): User[] {
    if (!query) return this.users;
    return this.users.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );
  }
}