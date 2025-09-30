import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createopp',
  templateUrl: './createopp.component.html',
  styleUrls: ['./createopp.component.css']
})
export class CreateoppComponent implements OnInit {
  opportunityForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.opportunityForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      duration: [''],
      location: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.opportunityForm.valid) {
      // call your backend API here to save
      this.successMessage = 'Opportunity created successfully!';
      this.errorMessage = '';
      this.opportunityForm.reset();
    } else {
      this.errorMessage = 'Please fill all required fields.';
      this.successMessage = '';
    }
  }
}
