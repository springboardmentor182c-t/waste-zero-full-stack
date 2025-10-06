import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EditOpportunityComponent } from './edit-opportunity.component';
import { OpportunityService } from '../services/opportunity.service';

describe('EditOpportunityComponent', () => {
  let component: EditOpportunityComponent;
  let fixture: ComponentFixture<EditOpportunityComponent>;
  let mockService: jasmine.SpyObj<OpportunityService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('OpportunityService', ['updateOpportunity']);

    await TestBed.configureTestingModule({
      declarations: [EditOpportunityComponent],
      providers: [{ provide: OpportunityService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(EditOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call service to update opportunity successfully', () => {
    const fakeData = { id: 1, title: 'Cleanup Drive', description: 'Beach cleanup' };
    mockService.updateOpportunity.and.returnValue(of({ success: true }));

    component.onSubmit(fakeData);
    expect(mockService.updateOpportunity).toHaveBeenCalledWith(fakeData);
  });
});
