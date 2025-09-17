import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Add this import
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,  // This should be true
  imports: [FormsModule, RouterModule],  // Add FormsModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  
  rememberMe = false;

  constructor(private router: Router) {}   // Inject Router
  @Output() openRegister = new EventEmitter<void>();

  onLogin() {
    console.log('Login attempted:', this.loginData);
  }

  goToRegister() {
    console.log('LoginComponent: goToRegister called');
    this.openRegister.emit();  // Navigate to register route
  }
}
