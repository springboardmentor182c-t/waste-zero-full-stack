import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, HttpClientModule], // Add HttpClientModule here
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const apiUrl = 'http://localhost:5000/api/v1/auth/login';

    this.http.post<{ token: string; message: string }>(apiUrl, this.loginData)
      .subscribe({
        next: (response) => {
          alert('Login Successful ');
          console.log('Login success', response);
          localStorage.setItem('authToken', response.token);
          console.log(response.message);
          console.log('Redirecting to dashboard...');
          this.router.navigate(['/dashboard']);

        },
        error: (err) => {
          console.error('Login failed:', err.error.error);
          alert('Login failed: ' + err.error.error);
        }
      });
  }
}
