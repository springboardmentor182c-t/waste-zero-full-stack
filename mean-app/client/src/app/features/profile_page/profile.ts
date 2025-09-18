import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile {
  activeTab: string = 'profile';
  isDarkMode: boolean = false;

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }
}

