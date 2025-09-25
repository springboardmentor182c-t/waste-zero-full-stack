import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OpportunityService } from '../opportunity.service';

@Component({
  selector: 'app-edit-opportunity',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-opportunity.component.html',
  styleUrl: './edit-opportunity.component.css',
})
export class EditOpportunity {
  opportunity = { title: '', skills: '', duration: '', description: '' };
  id = 0;

  constructor(
    private route: ActivatedRoute,
    private opSvc: OpportunityService,
    private router: Router
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = parseInt(idParam, 10);
      const op = this.opSvc.getById(this.id);
      if (op) this.opportunity = { ...op };
    } else {
      console.error('No opportunity ID in route!');
    }
  }

  onSubmit() {
    this.opSvc.updateOpportunity(this.id, this.opportunity);
    alert('Opportunity Updated!');
    this.router.navigate(['/opportunity/view']); // ✅ go to view page
  }
}