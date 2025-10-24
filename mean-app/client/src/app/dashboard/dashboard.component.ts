import { Component, OnInit, Renderer2 } from '@angular/core';
import { DashboardService } from '../_services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalUsers = 0;
  completedPickups = 0;    // You may need to update these fields based on backend data
  pendingPickups = 0;
  activeOpportunities = 0;
  isDarkTheme = false;

  constructor(private renderer: Renderer2, private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.setTheme();
    this.fetchDashboardData();
  }

  fetchDashboardData() {
    const token = localStorage.getItem('token'); // Adjust how you store your JWT
    if (token) {
      this.dashboardService.getDashboardData(token).subscribe({
        next: (res) => {
          this.totalUsers        = res.data?.totalUsers || 0;
          this.activeOpportunities = res.data?.totalOpportunities || 0;
          this.pendingPickups    = res.data?.activeApplications || 0;
          this.completedPickups  = 0; // If backend provides completed pickups, set here
          // You can map other fields if backend returns them!
        },
        error: (err) => {
          // Optionally handle unauthorized/load error
        }
      });
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.setTheme();
  }

  setTheme() {
    if (this.isDarkTheme) {
      this.renderer.removeClass(document.body, 'light-theme');
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
      this.renderer.addClass(document.body, 'light-theme');
    }
  }

  onReportDownload(reportType: string) {
    alert(`Download ${reportType} report`);
  }

  onManageUsers() {
    alert('Manage users clicked.');
  }
}
