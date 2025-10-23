import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// standalone components
import { OpportunitiesComponent } from '../opportunities/opportunities.component';
import { OpportunityDetailComponent } from '../opportunities/opportunity-detail/opportunity-detail.component';
import { OpportunityFormComponent } from '../opportunities/opportunity-form/opportunity-form.component';

// Admin Panel Interfaces
export interface DashboardStats {
  totalUsers: number;
  completedPickups: number;
  pendingPickups: number;
  activeOpportunities: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  location?: string;
  skills: string[];
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface AdminLog {
  _id: string;
  action: string;
  target_id: number;
  timestamp: string;
  admin_id: number;
}

export interface Report {
  reportType: string;
  generatedAt: string;
  data: any;
  summary: any;
}

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, OpportunitiesComponent, OpportunityDetailComponent, OpportunityFormComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  activeMenu: string = 'dashboard'; // default page
  activeProfileTab: string = 'profile'; // Profile tab default
  userProfile = {
    name: '',
    email: '',
    location: '',
    skills: [] as string[]
  };
  skillsString: string = '';
  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  // Admin Panel Properties
  private adminApiUrl = 'http://localhost:5000/api/v1/admin';
  
  // Dashboard data
  dashboardStats: DashboardStats = {
    totalUsers: 0,
    completedPickups: 0,
    pendingPickups: 0,
    activeOpportunities: 0
  };
  
  // User management
  users: User[] = [];
  filteredUsers: User[] = [];
  userSearchTerm: string = '';
  selectedUser: User | null = null;
  isEditingUser: boolean = false;
  
  // Admin logs
  adminLogs: AdminLog[] = [];
  
  // UI state
  activeAdminTab: 'users' | 'logs' = 'users';
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  pages: Record<string, string> = {
    dashboard: "Welcome to your WasteZero dashboard. Track pickups, opportunities, and your impact here.",
    schedule: "Your next pickup is scheduled for <b>Friday, 20th September 2025</b>. You can manage or reschedule here.",
    messages: `Recyclable items can be dropped at:
      <ul>
        <li>City Recycling Center</li>
        <li>Main Street Pickup Point</li>
        <li>Community Eco Hub</li>
      </ul>`,
    impact: "You have recycled <b>120kg</b> of waste and saved <b>85kg CO₂</b> this year. Keep going!",
    profile: "",
    settings: "",
    support: `
      <h1>Help & Support</h1>
      <p>If you need assistance, you can:</p>
      <ul>
        <li>Check the <b>FAQ section</b> in the documentation</li>
        <li>Contact us at <b>support@wastezero.com</b></li>
        <li>Call our 24/7 helpline: <b>+91-9876543210</b></li>
      </ul>`,
    admin: "" // Admin panel will be handled separately
  };

  // Opportunities sub-view state
  opportunityView: 'list' | 'create' | 'details' = 'list';
  selectedOpportunityId: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.getUserProfile(); // fetch profile on load
  }

  /**
   * Show opportunities sub-view. ALWAYS switch to dashboard's opportunities tab
   * so back returns to dashboard with opportunities open.
   */
  setOpportunityView(view: 'list' | 'create' | 'details', opportunityId: string | null = null) {
    this.activeMenu = 'opportunities';
    this.opportunityView = view;
    this.selectedOpportunityId = opportunityId;
  }

  setActive(menu: string) {
    this.activeMenu = menu;
    // when user clicks the Opportunities item, ensure sub-view resets to list
    if (menu === 'opportunities') {
      this.opportunityView = 'list';
      this.selectedOpportunityId = null;
    }
    // when user clicks the Admin Panel, load admin data
    if (menu === 'admin') {
      this.loadAdminData();
    }
  }

  toggleTheme() {
    document.body.classList.toggle('dark');
  }

  setProfileTab(tab: string) {
    this.activeProfileTab = tab;
  }

  ngOnInit() {
    this.getUserProfile();
  }

  getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return { Authorization: `Bearer ${token}` };
  }

  getUserProfile() {
    this.http.get<{ success: boolean, user: any }>(
      'http://localhost:5000/api/v1/profile',
      { headers: this.getAuthHeaders() }
    ).subscribe({
      next: (res) => {
        if (res.success) {
          this.userProfile = res.user;
          this.skillsString = (res.user.skills || []).join(', ');
        }
      },
      error: (err) => console.error('Error fetching profile', err)
    });
  }

  updateProfile() {
    const payload = {
      ...this.userProfile,
      skills: this.skillsString.split(',').map(s => s.trim()).filter(Boolean)
    };

    this.http.put<{ success: boolean, user: any }>(
      'http://localhost:5000/api/v1/profile',
      payload,
      { headers: this.getAuthHeaders() }
    ).subscribe({
      next: (res) => {
        if (res.success) {
          alert('Profile updated successfully!');
          this.userProfile = res.user;
          this.skillsString = res.user.skills.join(', ');
        }
      },
      error: (err) => console.error('Error updating profile', err)
    });
  }

  deleteProfile() {
    if (!confirm('Are you sure you want to delete your profile?')) return;

    this.http.delete<{ success: boolean, message: string }>(
      'http://localhost:5000/api/v1/profile',
      { headers: this.getAuthHeaders() }
    ).subscribe({
      next: (res) => {
        if (res.success) {
          alert(res.message);
          this.userProfile = { name: '', email: '', location: '', skills: [] };
          this.skillsString = '';
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error('Error deleting profile', err);
        alert('Failed to delete profile');
      }
    });
  }

  updatePassword() {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    const payload = {
      currentPassword: this.passwordData.currentPassword,
      newPassword: this.passwordData.newPassword
    };

    this.http.put<{ success: boolean, message: string }>(
      'http://localhost:5000/api/v1/profile/password',
      payload,
      { headers: this.getAuthHeaders() }
    ).subscribe({
      next: (res) => {
        if (res.success) {
          alert(res.message || "Password updated successfully!");
          this.passwordData = { currentPassword: '', newPassword: '', confirmPassword: '' };
        }
      },
      error: (err) => console.error("Error updating password", err)
    });
  }

  scrollTo(elementId: string) {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Admin Panel Methods
  loadAdminData() {
    this.loadDashboardStats();
    this.loadUsers();
    this.loadAdminLogs();
  }

  // Dashboard statistics
  loadDashboardStats() {
    this.isLoading = true;
    this.http.get<DashboardStats>(`${this.adminApiUrl}/stats`).subscribe({
      next: (stats) => {
        this.dashboardStats = stats;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard stats:', error);
        this.errorMessage = 'Failed to load dashboard statistics';
        this.isLoading = false;
      }
    });
  }

  // User management methods
  loadUsers() {
    this.isLoading = true;
    this.http.get<User[]>(`${this.adminApiUrl}/users`).subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.errorMessage = 'Failed to load users';
        this.isLoading = false;
      }
    });
  }

  searchUsers() {
    if (!this.userSearchTerm.trim()) {
      this.filteredUsers = this.users;
      return;
    }
    
    const searchTerm = this.userSearchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.location?.toLowerCase().includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm)
    );
  }

  editUser(user: User) {
    this.selectedUser = { ...user };
    this.isEditingUser = true;
  }

  saveUser() {
    if (!this.selectedUser) return;
    
    this.isLoading = true;
    this.http.put<User>(`${this.adminApiUrl}/users/${this.selectedUser._id}`, this.selectedUser).subscribe({
      next: (updatedUser) => {
        const index = this.users.findIndex(u => u._id === updatedUser._id);
        if (index !== -1) {
          this.users[index] = updatedUser;
          this.filteredUsers = [...this.users];
        }
        this.isEditingUser = false;
        this.selectedUser = null;
        this.successMessage = 'User updated successfully';
        this.isLoading = false;
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        console.error('Error updating user:', error);
        this.errorMessage = 'Failed to update user';
        this.isLoading = false;
      }
    });
  }

  deleteUser(user: User) {
    if (!confirm(`Are you sure you want to delete ${user.name}?`)) return;
    
    this.isLoading = true;
    this.http.delete(`${this.adminApiUrl}/users/${user._id}`).subscribe({
      next: () => {
        this.users = this.users.filter(u => u._id !== user._id);
        this.filteredUsers = [...this.users];
        this.successMessage = 'User deleted successfully';
        this.isLoading = false;
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        console.error('Error deleting user:', error);
        this.errorMessage = 'Failed to delete user';
        this.isLoading = false;
      }
    });
  }

  cancelEdit() {
    this.isEditingUser = false;
    this.selectedUser = null;
  }

  // Admin logs methods
  loadAdminLogs() {
    this.http.get<AdminLog[]>(`${this.adminApiUrl}/logs`).subscribe({
      next: (logs) => {
        this.adminLogs = logs;
      },
      error: (error) => {
        console.error('Error loading admin logs:', error);
        this.errorMessage = 'Failed to load admin logs';
      }
    });
  }

  // Report generation methods
  generateUsersReport() {
    this.isLoading = true;
    this.http.get<Report>(`${this.adminApiUrl}/reports/users`).subscribe({
      next: (report) => {
        this.downloadReport(report);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error generating users report:', error);
        this.errorMessage = 'Failed to generate users report';
        this.isLoading = false;
      }
    });
  }

  generatePickupsReport() {
    this.isLoading = true;
    this.http.get<Report>(`${this.adminApiUrl}/reports/pickups`).subscribe({
      next: (report) => {
        this.downloadReport(report);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error generating pickups report:', error);
        this.errorMessage = 'Failed to generate pickups report';
        this.isLoading = false;
      }
    });
  }

  generateOpportunitiesReport() {
    this.isLoading = true;
    this.http.get<Report>(`${this.adminApiUrl}/reports/opportunities`).subscribe({
      next: (report) => {
        this.downloadReport(report);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error generating opportunities report:', error);
        this.errorMessage = 'Failed to generate opportunities report';
        this.isLoading = false;
      }
    });
  }

  generateFullActivityReport() {
    this.isLoading = true;
    this.http.get<Report>(`${this.adminApiUrl}/reports/full-activity`).subscribe({
      next: (report) => {
        this.downloadReport(report);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error generating full activity report:', error);
        this.errorMessage = 'Failed to generate full activity report';
        this.isLoading = false;
      }
    });
  }

  downloadReport(report: Report) {
    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.reportType}_report_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  // Sample data creation
  createSampleData() {
    this.isLoading = true;
    this.http.post(`${this.adminApiUrl}/sample-data`, {}).subscribe({
      next: (result: any) => {
        this.successMessage = 'Sample data created successfully!';
        this.loadAdminData();
        this.isLoading = false;
        setTimeout(() => this.successMessage = '', 5000);
      },
      error: (error) => {
        console.error('Error creating sample data:', error);
        this.errorMessage = 'Failed to create sample data';
        this.isLoading = false;
      }
    });
  }

  // UI methods
  setActiveAdminTab(tab: 'users' | 'logs') {
    this.activeAdminTab = tab;
  }

  clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'open':
        return 'green';
      case 'scheduled':
        return 'orange';
      case 'cancelled':
      case 'closed':
        return 'red';
      default:
        return 'gray';
    }
  }
}
