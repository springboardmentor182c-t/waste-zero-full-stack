import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatSlideToggleModule, FormsModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  darkMode = false;
  selectedMenu = 'admin-panel';

  menuItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'schedule-pickup', icon: 'schedule', label: 'Schedule Pickup' },
    { id: 'opportunities', icon: 'lightbulb', label: 'Opportunities' },
    { id: 'messages', icon: 'message', label: 'Messages' },
    { id: 'my-impact', icon: 'trending_up', label: 'My Impact' }
  ];

  settingsItems = [
    { id: 'my-profile', icon: 'person', label: 'My Profile' },
    { id: 'settings', icon: 'settings', label: 'Settings' },
    { id: 'help-support', icon: 'help', label: 'Help & Support' },
    { id: 'admin-panel', icon: 'admin_panel_settings', label: 'Admin Panel' }
  ];

  selectMenu(menuId: string) {
    this.selectedMenu = menuId;
  }

  toggleDarkMode() {
    // Immediately apply dark mode
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}