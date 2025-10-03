import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 
import { Opportunities } from '../view-opportunities/opportunities';  // ✅ Your view-only Opportunities component

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, Opportunities],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
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
    admin: `
      <h1>Admin Panel</h1>
      <p>Welcome Admin, here are your controls:</p>
      <ul>
        <li>Manage Users</li>
        <li>View Reports</li>
        <li>System Settings</li>
        <li>Data Export</li>
      </ul>`
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
}
