import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    location:''
  };
  
  agreeTerms = false;

  onRegister() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (!this.agreeTerms) {
      alert('Please agree to Terms & Conditions');
      return;
    }
    
    console.log('Registration data:', this.registerData);
    // Handle registration logic here
  }
  @Output() openLogin = new EventEmitter<void>();

    goToLogin() {
      this.openLogin.emit();
  }

   ngOnInit() {
    console.log('✅ RegisterComponent loaded');
  }


}
