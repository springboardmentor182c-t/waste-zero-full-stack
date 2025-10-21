import { Component,signal } from '@angular/core';
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
export class AppComponent {
 protected readonly title = 'myapp';
}
bootstrapApplication(AppComponent)
  .catch(err => console.error(err));