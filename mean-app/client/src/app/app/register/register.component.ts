import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formdata = {
    username: '',
    name: '',
    email: '',
    phone: '',
    role: '',
    address: '',
    city: '',
    pincode: '',
    password: '',
    confirmPassword: '',
    terms: false
  };

  submit = false;
  errorMessage = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit() {
    this.submit = true;

    if (!this.formdata.username || this.formdata.username.length < 3) {
      this.errorMessage = 'Username is required and must be at least 3 characters.';
      return;
    }

    if (this.formdata.password !== this.formdata.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    if (!this.formdata.terms) {
      this.errorMessage = 'You must accept the Terms and Conditions!';
      return;
    }

    if (!this.formdata.role) {
      this.errorMessage = 'Please select a role!';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.auth.register(
      this.formdata.username,
      this.formdata.email,
      this.formdata.password,
      this.formdata.role.toLowerCase()
    )
    .subscribe({
      next: data => {
        this.auth.storeToken(data.data.token);
        console.log('Registered token: ' + data.data.token);

        this.auth.canAuthenticate();

        // Redirect to login page after registration
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error('Registration error:', err);
        this.errorMessage = err.error?.error?.message || 'Unknown error occurred when creating this account!';
      }
    })
    .add(() => {
      this.loading = false;
      console.log('Register process completed!');
    });
  }
}
