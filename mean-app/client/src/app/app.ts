import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ThemeToggleComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('client');
}
