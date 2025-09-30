import { Component, OnInit } from '@angular/core';

interface Opportunity {
  id: number;
  ngo_id: number;
  title: string;
  description: string;
  required_skills: string[];
  duration: string;
  location: string;
  status: string;
}

@Component({
  selector: 'app-opportunities',
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.css']
})
export class OpportunitiesComponent implements OnInit {
  searchTerm: string = '';
  selectedStatus: string = 'All Statuses';

  opportunities: Opportunity[] = [
    {
      id: 1,
      ngo_id: 101,
      title: "Beach Cleanup Drive",
      description: "Join in cleaning the city beach with other volunteers.",
      required_skills: ["Teamwork", "Physical Endurance"],
      duration: "3 hours",
      location: "Marina Beach, Chennai",
      status: "Open"
    },
    {
      id: 2,
      ngo_id: 103,
      title: "Plastic Segregation Workshop",
      description: "Help teaching proper segregation methods for plastics.",
      required_skills: ["Teaching", "Communication"],
      duration: "2 hours",
      location: "Community Hall, Bengaluru",
      status: "Closed"
    }
    // Add more as required
  ];

  get filteredOpportunities(): Opportunity[] {
    return this.opportunities.filter(
      opp =>
        (this.selectedStatus === 'All Statuses' || opp.status.toLowerCase() === this.selectedStatus.toLowerCase())
        && (
          opp.title.toLowerCase().includes(this.searchTerm.toLowerCase())
          || opp.description.toLowerCase().includes(this.searchTerm.toLowerCase())
          || opp.location.toLowerCase().includes(this.searchTerm.toLowerCase())
          || opp.required_skills.some(s => s.toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
    );
  }

  constructor() {}

  ngOnInit(): void {}
}
