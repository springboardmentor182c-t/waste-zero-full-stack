import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Opportunity {
  id: number;
  ngo_id: number;
  title: string;
  description: string;
  required_skills: string[];
  duration: string;
  location: string;
  status: string;
  date: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-opportunity-detail',
  templateUrl: './opportunity-detail.component.html',
  styleUrls: ['./opportunity-detail.component.css']
})
export class OpportunityDetailComponent implements OnInit {
  opportunity?: Opportunity;

  allOpportunities: Opportunity[] = [
    {
      id: 1,
      ngo_id: 101,
      title: "Beach Cleanup Drive",
      description: "Join in cleaning the city beach with other volunteers. You will work in teams to help protect local wildlife and keep the shoreline clean and healthy. Snacks and drinks will be provided for all volunteers!",
      required_skills: ["Teamwork", "Physical Endurance"],
      duration: "3 hours",
      location: "Marina Beach, Chennai",
      status: "Open",
      date: "2025-06-20",
      imageUrl: "assets/beach-cleanup.jpg"
    },
    {
      id: 2,
      ngo_id: 103,
      title: "Plastic Segregation Workshop",
      description: "Help teaching proper segregation methods for plastics.",
      required_skills: ["Teaching", "Communication"],
      duration: "2 hours",
      location: "Community Hall, Bengaluru",
      status: "Closed",
      date: "2025-07-10"
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.opportunity = this.allOpportunities.find(o => o.id === id);
  }

  editOpportunity() {
    alert('Edit functionality coming soon!');
  }

  deleteOpportunity() {
    if (confirm('Are you sure you want to delete this opportunity?')) {
      alert('Opportunity deleted!');
      this.router.navigate(['/opportunities']);
    }
  }
}
