export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface DashboardStats {
  totalUsers: number;
  completedPickups: number;
  pendingPickups: number;
  activeOpportunities: number;
}