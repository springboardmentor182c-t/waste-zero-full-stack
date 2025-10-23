// src/app/login/login.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ✅ Test Case 1: Empty fields
  it('should show error when fields are empty', () => {
    component.onSubmit();
    expect(component.error).toBe('All fields are required');
  });
 // ✅ Test Case 2: Valid credentials
  it('should emit loginSuccess for valid credentials', () => {
    spyOn(component.loginSuccess, 'emit');
    component.email = 'test@zero.com';
    component.password = 'Password123';
    component.onSubmit();
    expect(component.loginSuccess.emit).toHaveBeenCalled();
    expect(component.error).toBe('');
  });
});