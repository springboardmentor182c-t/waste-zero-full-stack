import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  userProfile = {
    name: 'Gayathri',
    role: 'user'
  };

  activeMenu: string = 'about';

  isAdmin() {
    return this.userProfile.role === 'admin';
  }

  canSchedulePickup() {
    return this.userProfile.role === 'user' || this.userProfile.role === 'volunteer';
  }

  setActive(menu: string) {
    this.activeMenu = menu;
  }

  toggleTheme() {
    document.body.classList.toggle('dark-theme');
  }

  logout() {
    alert('Logged out successfully!');
  }
}
