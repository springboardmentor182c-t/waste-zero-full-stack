import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// standalone components
import { OpportunitiesComponent } from '../opportunities/opportunities.component';
import { OpportunityDetailComponent } from '../opportunities/opportunity-detail/opportunity-detail.component';
import { OpportunityFormComponent } from '../opportunities/opportunity-form/opportunity-form.component';

// Dashboard Data Interfaces
export interface DashboardData {
  totalPickups: number;
  pickupsChangePercent: number;
  totalRecycledItems: number;
  recycledItemsChangePercent: number;
  totalCO2SavedKg: number;
  co2SavedChangePercent: number;
  totalVolunteerHours: number;
  volunteerHoursChangePercent: number;
  upcomingPickups: UpcomingPickup[];
  recyclingBreakdown: Record<string, number>;
}

export interface UpcomingPickup {
  address: string;
  pickupDate: string;
  time: string;
}

// Messages Interfaces
export interface Message {
  _id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  _id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

// Pickup Interfaces
export interface PickupRequest {
  name: string;
  address: string;
  city: string;
  contactNumber: string;
  pickupDate: string;
  timeSlot: string;
  wasteTypes: string[];
  additionalNotes: string;
}

export interface PickupHistory {
  _id: string;
  userId: string;
  name: string;
  address: string;
  contactNumber: string;
  pickupDate: string;
  items: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
}

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
  role: 'user' | 'admin' | 'volunteer';
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
    _id: '',
    name: '',
    email: '',
    location: '',
    skills: [] as string[],
    role: 'user' as 'user' | 'admin' | 'volunteer'
  };
  skillsString: string = '';
  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  // API URLs
  private adminApiUrl = 'http://localhost:5000/api/v1/admin';
  private dashboardApiUrl = 'http://localhost:5000/api/v1/dashboard';
  private messagesApiUrl = 'http://localhost:5000/api/v1/messages';
  private pickupApiUrl = 'http://localhost:5000/api/v1/pickup';
  
  // Dashboard data
  dashboardData: DashboardData = {
    totalPickups: 0,
    pickupsChangePercent: 0,
    totalRecycledItems: 0,
    recycledItemsChangePercent: 0,
    totalCO2SavedKg: 0,
    co2SavedChangePercent: 0,
    totalVolunteerHours: 0,
    volunteerHoursChangePercent: 0,
    upcomingPickups: [],
    recyclingBreakdown: {}
  };
  
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
  
  // Messages data
  conversations: Conversation[] = [];
  selectedConversation: Conversation | null = null;
  messages: Message[] = [];
  newMessage: string = '';
  messageSearchTerm: string = '';
  showNewConversationForm: boolean = false;
  newConversationUserId: string = '';
  newConversationMessage: string = '';
  
  // Available users for messaging
  availableUsers: User[] = [];
  searchUserTerm: string = '';
  
  // Pickup data
  pickupRequest: PickupRequest = {
    name: '',
    address: '',
    city: '',
    contactNumber: '',
    pickupDate: '',
    timeSlot: '',
    wasteTypes: [],
    additionalNotes: ''
  };
  pickupHistory: PickupHistory[] = [];
  activePickupTab: 'schedule' | 'history' = 'schedule';
  availableTimeSlots = [
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM',
    '1:00 PM - 3:00 PM',
    '3:00 PM - 5:00 PM',
    '5:00 PM - 7:00 PM'
  ];
  wasteTypeOptions = [
    'Plastic', 'Paper', 'Glass', 'Metal', 
    'Electronic Waste', 'Organic Waste', 'Other'
  ];
  
  // UI state
  activeAdminTab: 'users' | 'logs' = 'users';
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  
  // Pickup modal state
  showPickupModal: boolean = false;
  selectedPickup: PickupHistory | null = null;

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
    
    // Check permissions for create/edit access
    if (view === 'create' && !this.canCreateOpportunities()) {
      // Non-admin trying to create - show access denied
      this.opportunityView = 'create'; // This will trigger the access denied message
      this.selectedOpportunityId = opportunityId;
      return;
    }
    
    this.opportunityView = view;
    this.selectedOpportunityId = opportunityId;
  }

  setActive(menu: string) {
    this.activeMenu = menu;
    // Clear any existing error messages when switching menus
    this.errorMessage = '';
    this.successMessage = '';
    
    // when user clicks the Opportunities item, ensure sub-view resets to list
    if (menu === 'opportunities') {
      this.opportunityView = 'list';
      this.selectedOpportunityId = null;
    }
    // when user clicks the Admin Panel, load admin data
    if (menu === 'admin') {
      this.loadAdminData();
    }
    // when user clicks Dashboard, load dashboard data
    if (menu === 'dashboard') {
      this.loadDashboardData();
    }
    // when user clicks Messages, load messages data
    if (menu === 'messages') {
      this.loadMessagesData();
    }
    // when user clicks Schedule Pickup, load pickup data
    if (menu === 'schedule') {
      this.loadPickupData();
    }
  }

  toggleTheme() {
    document.body.classList.toggle('dark');
  }

  setProfileTab(tab: string) {
    this.activeProfileTab = tab;
  }

  ngOnInit() {
    // Check if user is authenticated
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.getUserProfile();
    this.loadDashboardData(); // Load dashboard data by default
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    // Only check for token, userId will be set after profile is loaded
    return !!token;
  }

  isAdmin(): boolean {
    return this.userProfile.role === 'admin';
  }

  isUser(): boolean {
    return this.userProfile.role === 'user';
  }

  isVolunteer(): boolean {
    return this.userProfile.role === 'volunteer';
  }

  canCreateOpportunities(): boolean {
    return this.isAdmin();
  }

  canSchedulePickup(): boolean {
    return this.isUser() || this.isAdmin() || this.isVolunteer();
  }

  logout() {
    // Clear authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    
    // Reset user profile
    this.userProfile = {
      _id: '',
      name: '',
      email: '',
      location: '',
      skills: [],
      role: 'user'
    };
    
    // Clear all data
    this.conversations = [];
    this.selectedConversation = null;
    this.messages = [];
    this.pickupHistory = [];
    this.dashboardData = {
      totalPickups: 0,
      pickupsChangePercent: 0,
      totalRecycledItems: 0,
      recycledItemsChangePercent: 0,
      totalCO2SavedKg: 0,
      co2SavedChangePercent: 0,
      totalVolunteerHours: 0,
      volunteerHoursChangePercent: 0,
      upcomingPickups: [],
      recyclingBreakdown: {}
    };
    
    // Show success message
    this.successMessage = 'Logged out successfully!';
    
    // Redirect to login after a short delay
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
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
          
          // Store userId if not already stored
          if (res.user._id && !localStorage.getItem('userId')) {
            localStorage.setItem('userId', res.user._id);
          }
        }
      },
      error: (err) => {
        console.error('Error fetching profile', err);
        // If profile fetch fails, redirect to login
        this.router.navigate(['/login']);
      }
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
          this.userProfile = { _id: '', name: '', email: '', location: '', skills: [], role: 'user' };
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

  // Dashboard Methods
  loadDashboardData() {
    this.isLoading = true;
    this.errorMessage = '';
    this.http.get<DashboardData>(this.dashboardApiUrl, { headers: this.getAuthHeaders() }).subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.errorMessage = 'Failed to load dashboard data. Please check your connection and try again.';
        this.isLoading = false;
        // Reset to empty state
        this.dashboardData = {
          totalPickups: 0,
          pickupsChangePercent: 0,
          totalRecycledItems: 0,
          recycledItemsChangePercent: 0,
          totalCO2SavedKg: 0,
          co2SavedChangePercent: 0,
          totalVolunteerHours: 0,
          volunteerHoursChangePercent: 0,
          upcomingPickups: [],
          recyclingBreakdown: {}
        };
      }
    });
  }

  // Messages Methods
  loadMessagesData() {
    this.loadConversations();
  }

  loadConversations() {
    const userId = localStorage.getItem('userId') || this.userProfile._id;
    if (!userId) {
      this.errorMessage = 'User not authenticated. Please log in.';
      return;
    }

    this.http.get<{success: boolean, data: Conversation[]}>(`${this.messagesApiUrl}/conversations/${userId}`, { headers: this.getAuthHeaders() }).subscribe({
      next: (response) => {
        if (response.success) {
          this.conversations = response.data;
        } else {
          this.errorMessage = 'Failed to load conversations.';
          this.conversations = [];
        }
      },
      error: (error) => {
        console.error('Error loading conversations:', error);
        this.errorMessage = 'Failed to load conversations. Please check your connection and try again.';
        this.conversations = [];
      }
    });
  }

  selectConversation(conversation: Conversation) {
    this.selectedConversation = conversation;
    this.loadMessages(conversation.sender_id, conversation.receiver_id);
  }

  loadMessages(user1Id: string, user2Id: string) {
    this.http.get<{success: boolean, data: Message[]}>(`${this.messagesApiUrl}/conversation/${user1Id}/${user2Id}`, { headers: this.getAuthHeaders() }).subscribe({
      next: (response) => {
        if (response.success) {
          this.messages = response.data;
        } else {
          this.errorMessage = 'Failed to load messages.';
          this.messages = [];
        }
      },
      error: (error) => {
        console.error('Error loading messages:', error);
        this.errorMessage = 'Failed to load messages. Please check your connection and try again.';
        this.messages = [];
      }
    });
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedConversation) return;

    const userId = localStorage.getItem('userId') || this.userProfile._id;
    if (!userId) {
      this.errorMessage = 'User not authenticated. Please log in.';
      return;
    }

    const otherUserId = this.selectedConversation.sender_id === userId ? 
      this.selectedConversation.receiver_id : this.selectedConversation.sender_id;

    const messageData = {
      sender_id: userId,
      receiver_id: otherUserId,
      content: this.newMessage.trim()
    };

    this.http.post<{success: boolean, data: Message}>(`${this.messagesApiUrl}/send`, messageData, { headers: this.getAuthHeaders() }).subscribe({
      next: (response) => {
        if (response.success) {
          this.messages.push(response.data);
          this.newMessage = '';
          // Update conversation list
          this.loadConversations();
        } else {
          this.errorMessage = 'Failed to send message.';
        }
      },
      error: (error) => {
        console.error('Error sending message:', error);
        this.errorMessage = 'Failed to send message. Please check your connection and try again.';
      }
    });
  }

  searchMessages() {
    if (!this.messageSearchTerm.trim()) {
      this.loadConversations();
      return;
    }
    // Filter conversations based on search term
    const searchTerm = this.messageSearchTerm.toLowerCase();
    this.conversations = this.conversations.filter(conv => 
      conv.content.toLowerCase().includes(searchTerm)
    );
  }

  startNewConversation() {
    this.showNewConversationForm = true;
    this.selectedConversation = null;
    this.messages = [];
    this.loadAvailableUsers();
  }

  loadAvailableUsers() {
    this.http.get<{success: boolean, data: User[]}>(`${this.messagesApiUrl}/users`, { headers: this.getAuthHeaders() }).subscribe({
      next: (response) => {
        if (response.success) {
          this.availableUsers = response.data;
        } else {
          this.availableUsers = [];
        }
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.errorMessage = 'Failed to load users. Please check your connection.';
        this.availableUsers = [];
      }
    });
  }

  getFilteredUsers(): User[] {
    if (!this.searchUserTerm.trim()) {
      return this.availableUsers;
    }
    const searchTerm = this.searchUserTerm.toLowerCase();
    return this.availableUsers.filter(user => 
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    );
  }

  selectUserForConversation(user: User) {
    this.newConversationUserId = user._id;
    this.searchUserTerm = `${user.name} (${user.email})`;
  }

  cancelNewConversation() {
    this.showNewConversationForm = false;
    this.newConversationUserId = '';
    this.newConversationMessage = '';
    this.searchUserTerm = '';
    this.availableUsers = [];
  }

  sendFirstMessage() {
    if (!this.newConversationUserId.trim() || !this.newConversationMessage.trim()) {
      this.errorMessage = 'Please select a user and enter a message.';
      return;
    }

    const userId = localStorage.getItem('userId') || this.userProfile._id;
    if (!userId) {
      this.errorMessage = 'User not authenticated. Please log in.';
      return;
    }

    const messageData = {
      sender_id: userId,
      receiver_id: this.newConversationUserId.trim(),
      content: this.newConversationMessage.trim()
    };

    this.http.post<{success: boolean, message: string, data: Message}>(`${this.messagesApiUrl}/send`, messageData, { headers: this.getAuthHeaders() }).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage = 'Message sent! Conversation started.';
          this.cancelNewConversation();
          this.loadConversations(); // Refresh conversations list
        } else {
          this.errorMessage = response.message || 'Failed to send message.';
        }
      },
      error: (error) => {
        console.error('Send first message error:', error);
        this.errorMessage = error.error?.message || 'Failed to send message.';
      }
    });
  }

  // Pickup Methods
  loadPickupData() {
    this.loadPickupHistory();
  }

  loadPickupHistory() {
    this.http.get<PickupHistory[]>(`${this.pickupApiUrl}/my`, { headers: this.getAuthHeaders() }).subscribe({
      next: (history) => {
        this.pickupHistory = history;
      },
      error: (error) => {
        console.error('Error loading pickup history:', error);
        this.errorMessage = 'Failed to load pickup history. Please check your connection and try again.';
        this.pickupHistory = [];
      }
    });
  }

  toggleWasteType(type: string) {
    const index = this.pickupRequest.wasteTypes.indexOf(type);
    if (index > -1) {
      this.pickupRequest.wasteTypes.splice(index, 1);
    } else {
      this.pickupRequest.wasteTypes.push(type);
    }
  }

  schedulePickup() {
    if (!this.validatePickupForm()) return;

    const pickupData = {
      name: this.pickupRequest.name,
      address: `${this.pickupRequest.address}, ${this.pickupRequest.city}`,
      contactNumber: this.pickupRequest.contactNumber,
      pickupDate: this.pickupRequest.pickupDate,
      items: this.pickupRequest.wasteTypes.join(', ')
    };

    console.log('Sending pickup data:', pickupData);
    console.log('Headers:', this.getAuthHeaders());

    this.isLoading = true;
    this.errorMessage = '';
    this.http.post<{message: string, pickup: PickupHistory}>(`${this.pickupApiUrl}/schedule`, pickupData, { headers: this.getAuthHeaders() }).subscribe({
      next: (response) => {
        console.log('Pickup created response:', response);
        console.log('Pickup object:', response.pickup);
        this.successMessage = response.message || 'Pickup scheduled successfully!';
        this.resetPickupForm();
        this.loadPickupHistory();
        this.isLoading = false;
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        console.error('Error scheduling pickup:', error);
        console.error('Error details:', error.error);
        this.errorMessage = error.error?.message || 'Failed to schedule pickup. Please check your connection and try again.';
        this.isLoading = false;
      }
    });
  }

  validatePickupForm(): boolean {
    if (!this.pickupRequest.name.trim()) {
      this.errorMessage = 'Name is required';
      return false;
    }
    if (!this.pickupRequest.address.trim()) {
      this.errorMessage = 'Address is required';
      return false;
    }
    if (!this.pickupRequest.city.trim()) {
      this.errorMessage = 'City is required';
      return false;
    }
    if (!this.pickupRequest.contactNumber.trim()) {
      this.errorMessage = 'Contact number is required';
      return false;
    }
    if (!this.pickupRequest.pickupDate) {
      this.errorMessage = 'Pickup date is required';
      return false;
    }
    if (!this.pickupRequest.timeSlot) {
      this.errorMessage = 'Time slot is required';
      return false;
    }
    if (this.pickupRequest.wasteTypes.length === 0) {
      this.errorMessage = 'Please select at least one waste type';
      return false;
    }
    return true;
  }

  resetPickupForm() {
    this.pickupRequest = {
      name: '',
      address: '',
      city: '',
      contactNumber: '',
      pickupDate: '',
      timeSlot: '',
      wasteTypes: [],
      additionalNotes: ''
    };
  }

  setPickupTab(tab: 'schedule' | 'history') {
    this.activePickupTab = tab;
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
    this.http.get<DashboardStats>(`${this.adminApiUrl}/stats`, { headers: this.getAuthHeaders() }).subscribe({
      next: (stats) => {
        this.dashboardStats = stats;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard stats:', error);
        this.errorMessage = 'Failed to load dashboard statistics. Please check your connection and try again.';
        this.isLoading = false;
        this.dashboardStats = {
          totalUsers: 0,
          completedPickups: 0,
          pendingPickups: 0,
          activeOpportunities: 0
        };
      }
    });
  }

  // User management methods
  loadUsers() {
    this.isLoading = true;
    this.http.get<User[]>(`${this.adminApiUrl}/users`, { headers: this.getAuthHeaders() }).subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.errorMessage = 'Failed to load users. Please check your connection and try again.';
        this.isLoading = false;
        this.users = [];
        this.filteredUsers = [];
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
    this.errorMessage = '';
    this.http.put<User>(`${this.adminApiUrl}/users/${this.selectedUser._id}`, this.selectedUser, { headers: this.getAuthHeaders() }).subscribe({
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
        this.errorMessage = 'Failed to update user. Please check your connection and try again.';
        this.isLoading = false;
      }
    });
  }

  deleteUser(user: User) {
    if (!confirm(`Are you sure you want to delete ${user.name}?`)) return;
    
    this.isLoading = true;
    this.errorMessage = '';
    this.http.delete(`${this.adminApiUrl}/users/${user._id}`, { headers: this.getAuthHeaders() }).subscribe({
      next: () => {
        this.users = this.users.filter(u => u._id !== user._id);
        this.filteredUsers = [...this.users];
        this.successMessage = 'User deleted successfully';
        this.isLoading = false;
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        console.error('Error deleting user:', error);
        this.errorMessage = 'Failed to delete user. Please check your connection and try again.';
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
    this.http.get<AdminLog[]>(`${this.adminApiUrl}/logs`, { headers: this.getAuthHeaders() }).subscribe({
      next: (logs) => {
        this.adminLogs = logs;
      },
      error: (error) => {
        console.error('Error loading admin logs:', error);
        this.errorMessage = 'Failed to load admin logs. Please check your connection and try again.';
        this.adminLogs = [];
      }
    });
  }

  // Report generation methods
  generateUsersReport() {
    this.isLoading = true;
    this.errorMessage = '';
    this.http.get<Report>(`${this.adminApiUrl}/reports/users`, { headers: this.getAuthHeaders() }).subscribe({
      next: (report) => {
        this.downloadReport(report);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error generating users report:', error);
        this.errorMessage = 'Failed to generate users report. Please check your connection and try again.';
        this.isLoading = false;
      }
    });
  }

  generatePickupsReport() {
    this.isLoading = true;
    this.errorMessage = '';
    this.http.get<Report>(`${this.adminApiUrl}/reports/pickups`, { headers: this.getAuthHeaders() }).subscribe({
      next: (report) => {
        this.downloadReport(report);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error generating pickups report:', error);
        this.errorMessage = 'Failed to generate pickups report. Please check your connection and try again.';
        this.isLoading = false;
      }
    });
  }

  generateOpportunitiesReport() {
    this.isLoading = true;
    this.errorMessage = '';
    this.http.get<Report>(`${this.adminApiUrl}/reports/opportunities`, { headers: this.getAuthHeaders() }).subscribe({
      next: (report) => {
        this.downloadReport(report);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error generating opportunities report:', error);
        this.errorMessage = 'Failed to generate opportunities report. Please check your connection and try again.';
        this.isLoading = false;
      }
    });
  }

  generateFullActivityReport() {
    this.isLoading = true;
    this.errorMessage = '';
    this.http.get<Report>(`${this.adminApiUrl}/reports/full-activity`, { headers: this.getAuthHeaders() }).subscribe({
      next: (report) => {
        this.downloadReport(report);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error generating full activity report:', error);
        this.errorMessage = 'Failed to generate full activity report. Please check your connection and try again.';
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
    this.errorMessage = '';
    this.http.post(`${this.adminApiUrl}/sample-data`, {}, { headers: this.getAuthHeaders() }).subscribe({
      next: (result: any) => {
        this.successMessage = 'Sample data created successfully!';
        this.loadAdminData();
        this.isLoading = false;
        setTimeout(() => this.successMessage = '', 5000);
      },
      error: (error) => {
        console.error('Error creating sample data:', error);
        this.errorMessage = 'Failed to create sample data. Please check your connection and try again.';
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

  // Utility methods for dashboard
  formatChangePercent(percent: number): string {
    const sign = percent >= 0 ? '+' : '';
    return `${sign}${percent.toFixed(1)}%`;
  }

  getChangeColor(percent: number): string {
    return percent >= 0 ? 'green' : 'red';
  }

  formatDate(dateString: string | undefined | null): string {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  }

  formatTime(dateString: string | undefined | null): string {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Time';
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid Time';
    }
  }

  formatFullDateTime(dateString: string | undefined | null): string {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid Date';
    }
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

  getRecyclingPercentage(material: string): number {
    const total = Object.values(this.dashboardData.recyclingBreakdown).reduce((sum, val) => sum + val, 0);
    const materialTotal = this.dashboardData.recyclingBreakdown[material] || 0;
    return total > 0 ? (materialTotal / total) * 100 : 0;
  }

  // Message utility methods
  getOtherUserId(conversation: Conversation): string {
    const userId = localStorage.getItem('userId') || this.userProfile._id;
    if (!userId) return 'Unknown';
    return conversation.sender_id === userId ? conversation.receiver_id : conversation.sender_id;
  }

  isMessageFromCurrentUser(message: Message): boolean {
    const userId = localStorage.getItem('userId') || this.userProfile._id;
    if (!userId) return false;
    return message.sender_id === userId;
  }

  formatMessageTime(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  }

  getTotalRecycledWeight(): number {
    const total = Object.values(this.dashboardData.recyclingBreakdown).reduce((sum, val) => sum + val, 0);
    return total;
  }

  // Pickup view and cancel methods
  viewPickup(pickup: PickupHistory) {
    this.selectedPickup = pickup;
    this.showPickupModal = true;
  }

  closePickupModal() {
    this.showPickupModal = false;
    this.selectedPickup = null;
  }

  cancelPickup(pickup: PickupHistory) {
    if (pickup.status === 'Completed') {
      alert('Cannot cancel completed pickup');
      return;
    }
    
    if (pickup.status === 'Cancelled') {
      alert('Pickup is already cancelled');
      return;
    }

    if (!confirm(`Are you sure you want to cancel this pickup scheduled for ${this.formatDate(pickup.pickupDate)}?`)) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    
    this.http.put<{success: boolean, message: string, pickup: PickupHistory}>(
      `${this.pickupApiUrl}/cancel/${pickup._id}`,
      {},
      { headers: this.getAuthHeaders() }
    ).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage = response.message || 'Pickup cancelled successfully!';
          this.loadPickupHistory();
          this.isLoading = false;
          setTimeout(() => this.successMessage = '', 3000);
        } else {
          this.errorMessage = 'Failed to cancel pickup.';
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error cancelling pickup:', error);
        this.errorMessage = error.error?.message || 'Failed to cancel pickup. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
