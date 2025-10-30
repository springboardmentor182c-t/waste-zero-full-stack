import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  services = [
    { title: 'Waste Collection', description: 'Scheduled waste collection from households and businesses.' },
    { title: 'Recycling Programs', description: 'Comprehensive recycling programs to reduce landfill waste.' },
    { title: 'Community Awareness', description: 'Workshops and events to promote sustainability practices.' },
    { title: 'Smart Waste Monitoring', description: 'IoT-based waste bins for real-time tracking and efficiency.' }
  ];
}
