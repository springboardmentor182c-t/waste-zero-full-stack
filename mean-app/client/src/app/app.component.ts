import { Component,signal, OnInit, Renderer2 } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
// import { AppComponent } from './app/app';

import { bootstrapApplication } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
   standalone: true,
   imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
 protected readonly title = 'myapp'; // keep readonly if you want it fixed
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

}
bootstrapApplication(AppComponent)
  .catch(err => console.error(err));
