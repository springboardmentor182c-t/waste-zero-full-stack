import { Component } from '@angular/core';
import { AdminPanelComponent } from './components/admin-panel/admin-panel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AdminPanelComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'wastezero-admin';
}