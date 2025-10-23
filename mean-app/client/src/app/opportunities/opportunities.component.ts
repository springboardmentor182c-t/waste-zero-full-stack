import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { OpportunityService, Opportunity } from '../_services/opportunity.service';

@Component({
  selector: 'app-opportunities',
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.css']
})
export class OpportunitiesComponent implements OnInit {
  searchTerm: string = '';
  selectedStatus: string = 'All Statuses';
  opportunities: Opportunity[] = [];

  constructor(private oppService: OpportunityService, private router: Router) {}

  ngOnInit(): void {
    this.loadOpportunities();

    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(event => {
      if (event.url === '/opportunities') {
        this.loadOpportunities();
      }
    });
  }

  loadOpportunities() {
    this.oppService.getAllOpportunities().subscribe({
      next: (data: Opportunity[]) => {
        this.opportunities = data;
      },
      error: (err) => {
        console.error('Error fetching opportunities:', err);
      }
    });
  }

  get filteredOpportunities(): Opportunity[] {
    return this.opportunities.filter(
      opp =>
        (this.selectedStatus === 'All Statuses' || opp.status.toLowerCase() === this.selectedStatus.toLowerCase()) &&
        (opp.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          opp.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          opp.location.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          opp.required_skills.some(s => s.toLowerCase().includes(this.searchTerm.toLowerCase())))
    );
  }
}
