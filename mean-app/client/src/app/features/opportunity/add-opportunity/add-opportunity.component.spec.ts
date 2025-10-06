
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AddOpportunity } from './add-opportunity';
import { By } from '@angular/platform-browser';

describe('AddOpportunityComponent', () => {
  let component: AddOpportunity;
  let fixture: ComponentFixture<AddOpportunity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOpportunity],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AddOpportunity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test Case 1: Component creation
  it('should create the Add Opportunity component', () => {
    expect(component).toBeTruthy();
  });

  // Test Case 2: onSubmit() is called when form is valid
  it('should call onSubmit() when the form is submitted with valid data', () => {
    spyOn(component, 'onSubmit');

    // Fill in valid data
    component.opportunity = {
      title: 'Frontend Developer',
      skills: 'Angular, HTML, CSS',
      duration: '3 months',
      description: 'Work on frontend tasks'
    };

    fixture.detectChanges();

    // Trigger form submission
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.onSubmit).toHaveBeenCalled();
  });
});
