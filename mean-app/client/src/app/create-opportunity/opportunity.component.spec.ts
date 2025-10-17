import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateOpportunityComponent } from './create-opportunity.component';

describe('CreateOpportunityComponent', () => {
  let component: CreateOpportunityComponent;
  let fixture: ComponentFixture<CreateOpportunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CreateOpportunityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should mark form invalid if required fields are empty', () => {
    component.opportunityForm.setValue({
      title: '',
      description: '',
      duration: '',
      location: ''
    });
    expect(component.opportunityForm.valid).toBeFalse();
  });
});
