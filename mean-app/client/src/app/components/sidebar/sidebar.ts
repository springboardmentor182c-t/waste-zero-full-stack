import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  @Input() darkMode = false;
  @Output() darkModeChange = new EventEmitter<boolean>();

  toggleDarkMode() {
    this.darkModeChange.emit(!this.darkMode);
  }
}