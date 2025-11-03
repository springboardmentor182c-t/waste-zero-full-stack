import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.html',
  styleUrls: ['./theme-toggle.css']
})
export class ThemeToggleComponent implements OnInit {
  isDarkMode = false;

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark-theme');
    }
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}
