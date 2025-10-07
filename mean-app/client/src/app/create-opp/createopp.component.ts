import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpportunityService } from '../_services/opportunity.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-createopp',
  templateUrl: './createopp.component.html',
  styleUrls: ['./createopp.component.css']
})
export class CreateoppComponent implements OnInit {
  opportunityForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private oppService: OpportunityService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.opportunityForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      duration: [''],
      location: ['', Validators.required],
      required_skills: [''] // <-- added here
    });
  }

  onSubmit() {
    if (this.opportunityForm.valid) {
      const formattedDate = this.datePipe.transform(
        this.opportunityForm.value.date,
        'yyyy-MM-dd'
      );
      const rawSkills = this.opportunityForm.value.required_skills;
const skillsArray = rawSkills ? rawSkills.split(',').map((s: string) => s.trim()) : [];

      const opportunityData = {
        ...this.opportunityForm.value,
        date: formattedDate,
        required_skills: skillsArray
      };

      this.oppService.createOpportunity(opportunityData).subscribe({
        next: res => {
          this.successMessage = 'Opportunity created successfully!';
          this.errorMessage = '';
          this.opportunityForm.reset();
          this.router.navigate(['/opportunities']);
        },
        error: err => {
          this.errorMessage = 'Failed to create opportunity. Try again.';
          this.successMessage = '';
        }
      });
    } else {
      this.errorMessage = 'Please fill all required fields.';
      this.successMessage = '';
    }
  }
}
