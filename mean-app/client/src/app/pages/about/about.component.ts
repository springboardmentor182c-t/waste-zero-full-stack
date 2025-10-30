import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  title = 'About WasteZero';
  description = 'WasteZero is a sustainability-driven platform focused on effective waste management and recycling awareness. Our mission is to promote clean cities, encourage recycling, and reduce carbon footprint.';

 
}
