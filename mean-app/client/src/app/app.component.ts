<<<<<<< HEAD
import { Component,signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
// import { AppComponent } from './app/app';

import { bootstrapApplication } from '@angular/platform-browser';
=======
import { Component, OnInit, Renderer2 } from '@angular/core';
>>>>>>> origin/main-group-B

@Component({
  selector: 'app-root',
   standalone: true,
   imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
<<<<<<< HEAD
export class AppComponent {
 protected readonly title = 'myapp';
=======
export class AppComponent implements OnInit {
  title = 'myapp';
  isDarkMode = false;

  constructor(private renderer: Renderer2) {}

  // ✅ Toggle dark mode safely using Angular Renderer2
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
      localStorage.setItem('darkMode', 'disabled');
    }
  }

  // ✅ Load saved preference on startup
  ngOnInit(): void {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
      this.isDarkMode = true;
      this.renderer.addClass(document.body, 'dark-mode');
    }
  }
>>>>>>> origin/main-group-B
}
bootstrapApplication(AppComponent)
  .catch(err => console.error(err));