import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpportunityService, Opportunity } from '../opportunity.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-view-opportunity',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-opportunity.component.html',
  styleUrl: './view-opportunity.component.css'
})
export class ViewOpportunity {
  opportunities: Opportunity[] = []; // ✅ add type here

  constructor(private opSvc: OpportunityService, private router: Router) {
    this.opSvc.getOpportunities().subscribe(list => {
      this.opportunities = list;
    });
  }

  deleteOpportunity(id: number) {
    if (confirm('Delete this opportunity?')) {
      this.opSvc.deleteOpportunity(id);
    }
  }

  editOpportunity(id: number) {
    this.router.navigate(['/opportunity/edit', id]);
  }
}