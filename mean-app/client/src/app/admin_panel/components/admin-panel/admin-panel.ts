import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

import { SidebarComponent } from '../sidebar/sidebar';
import { DashboardCardsComponent } from '../dashboard-cards/dashboard-cards';
import { AdminService } from '../../services/admin';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    SidebarComponent,
    DashboardCardsComponent
  ],
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.css']
})
export class AdminPanelComponent implements OnInit {
  searchQuery = '';
  userSearchQuery = '';
  users: User[] = [];
  filteredUsers: User[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.users = this.adminService.getUsers();
    this.filteredUsers = this.users;
  }

  onSearch() {
    console.log('Searching for:', this.searchQuery);
  }

  searchUsers() {
    this.filteredUsers = this.adminService.searchUsers(this.userSearchQuery);
  }

  generateReport(reportType: string) {
    console.log('Generating report:', reportType);
    alert(`Generating ${reportType}...`);
  }
}