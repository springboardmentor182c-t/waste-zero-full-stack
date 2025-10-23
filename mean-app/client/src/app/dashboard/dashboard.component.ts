import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalUsers = 0;
  completedPickups = 0;
  pendingPickups = 0;
  activeOpportunities = 0;

  // theme flag
  isDarkTheme = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setTheme();
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
