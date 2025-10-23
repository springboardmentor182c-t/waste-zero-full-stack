import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from '../../services/admin';
import { DashboardStats } from '../../models/user.model';

@Component({
  selector: 'app-dashboard-cards',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './dashboard-cards.html',
  styleUrls: ['./dashboard-cards.css']
})
export class DashboardCardsComponent implements OnInit {
  stats: DashboardStats = {
    totalUsers: 0,
    completedPickups: 0,
    pendingPickups: 0,
    activeOpportunities: 0
  };

  cards = [
    {
      title: 'Total Users',
      value: 0,
      icon: 'people',
      color: '#5B8DEE',
      bgColor: '#E8F0FE'
    },
    {
      title: 'Completed Pickups',
      value: 0,
      icon: 'check_circle',
      color: '#34A853',
      bgColor: '#E6F4EA'
    },
    {
      title: 'Pending Pickups',
      value: 0,
      icon: 'schedule',
      color: '#FBBC04',
      bgColor: '#FEF7E0'
    },
    {
      title: 'Active Opportunities',
      value: 0,
      icon: 'inventory_2',
      color: '#9C27B0',
      bgColor: '#F3E5F5'
    }
  ];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.adminService.getStats().subscribe({
      next: (response) => {
        if (response.success) {
          this.stats = response.data;
          this.updateCardValues();
        }
      },
      error: (error) => {
        console.error('Error loading stats:', error);
      }
    });
  }

  updateCardValues() {
    this.cards[0].value = this.stats.totalUsers;
    this.cards[1].value = this.stats.completedPickups;
    this.cards[2].value = this.stats.pendingPickups;
    this.cards[3].value = this.stats.activeOpportunities;
  }
}