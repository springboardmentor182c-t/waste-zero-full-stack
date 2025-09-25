import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OpportunityService } from '../opportunity.service';

@Component({
  selector: 'app-add-opportunity',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-opportunity.component.html',
  styleUrl: './add-opportunity.component.css'
})
export class AddOpportunity {
  opportunity = { title: '', skills: '', duration: '', description: '' };

  constructor(private opSvc: OpportunityService, private router: Router) {}

  onSubmit() {
    this.opSvc.addOpportunity(this.opportunity);
    alert('Opportunity Created!');
    this.router.navigate(['/opportunity/view']); // ✅ go to view page
  }
}