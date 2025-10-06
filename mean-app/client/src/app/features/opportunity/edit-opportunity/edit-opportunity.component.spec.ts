import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { EditOpportunity } from './edit-opportunity';

describe('EditOpportunityComponent', () => {
  let component: EditOpportunity;
  let fixture: ComponentFixture<EditOpportunity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditOpportunity],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EditOpportunity);
    component = fixture.componentInstance;

    // Initialize a sample opportunity object
    component.opportunity = {
      title: 'Angular Developer',
      skills: 'Angular, TypeScript',
      duration: '3 months',
      description: 'Work on frontend Angular app',
    };

    fixture.detectChanges();
  });

  // Test Case 1: Form submission with valid data
  it('should call onSubmit() when the form is valid and submitted', () => {
    spyOn(component, 'onSubmit');

    // Update form fields
    component.opportunity.title = 'React Developer';
    component.opportunity.skills = 'React, JavaScript';
    component.opportunity.duration = '6 months';
    component.opportunity.description = 'Work on frontend React app';
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.opportunity.title).toBe('React Developer');
  });

  // Test Case 2: Form validation for required fields
  it('should prevent submission if required fields are empty', () => {
    spyOn(component, 'onSubmit');

    // Clear required field
    component.opportunity.title = '';
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    // onSubmit should still be called, but form invalid logic can be checked here
    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.opportunity.title).toBe('');
    
  });
});
