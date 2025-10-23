import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpportunityService, Opportunity } from '../_services/opportunity.service';

@Component({
  selector: 'app-opportunity-detail',
  templateUrl: './opportunity-detail.component.html',
  styleUrls: ['./opportunity-detail.component.css']
})
export class OpportunityDetailComponent implements OnInit {
  opportunity?: Opportunity;
  editMode = false;
  editData: Partial<Opportunity> = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private oppService: OpportunityService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.oppService.getOpportunityById(id).subscribe({
          next: (data) => {
            this.opportunity = data;
          },
          error: () => {
            this.router.navigate(['/opportunities']);
          }
        });
      } else {
        this.router.navigate(['/opportunities']);
      }
    });
  }

  editOpportunity() {
    if (!this.opportunity) return;
    this.editMode = true;
    this.editData = { ...this.opportunity, required_skills: [...(this.opportunity.required_skills || [])] };
  }

  cancelEdit() {
    this.editMode = false;
    this.editData = {};
  }
  onSkillsInput(event: string) {
  // Converts comma separated string to array
  this.editData.required_skills = event.split(',').map(s => s.trim()).filter(s => !!s);
}


  saveEdit() {
    if (!this.opportunity) return;
    this.oppService.updateOpportunity(this.opportunity._id, this.editData).subscribe({
      next: () => {
        this.oppService.getOpportunityById(this.opportunity!._id).subscribe({
          next: updated => {
            this.opportunity = updated;
            this.editMode = false;
          }
        });
      },
      error: () => alert('Update failed!')
    });
  }

  deleteOpportunity() {
    if (this.opportunity && confirm('Are you sure you want to delete this opportunity?')) {
      this.oppService.deleteOpportunity(this.opportunity._id).subscribe({
        next: () => {
          this.router.navigate(['/opportunities']);
        },
        error: () => alert('Delete failed!')
      });
    }
  }
}
