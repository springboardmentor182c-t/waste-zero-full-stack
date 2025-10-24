import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pickupui } from './pickupui';

describe('Pickupui', () => {
  let component: Pickupui;
  let fixture: ComponentFixture<Pickupui>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pickupui]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pickupui);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
