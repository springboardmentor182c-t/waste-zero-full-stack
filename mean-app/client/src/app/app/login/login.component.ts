import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formdata = { username: "", password: "", rememberMe: false };
  submit = false;
  loading = false;
  errorMessage = "";

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit() {
    this.loading = true;

    // Note: backend authenticates by email, so send formdata.username as email here
    this.auth.login(this.formdata.username, this.formdata.password)
      .subscribe({
        next: data => {
          this.auth.storeToken(data.data.token);

          if (this.formdata.rememberMe) {
            localStorage.setItem("rememberMe", "true");
          } else {
            localStorage.removeItem("rememberMe");
          }

          console.log('Logged user token: ' + data.data.token);

          this.auth.canAuthenticate();

          // Redirect to home page after login
          this.router.navigate(['/']);
        },
        error: data => {
          if (data.error.error.message === "INVALID_PASSWORD" || data.error.error.message === "INVALID_EMAIL") {
            this.errorMessage = "Invalid Credentials!";
          } else {
            this.errorMessage = "Unknown error when logging into this account!";
          }
        }
      })
      .add(() => {
        this.loading = false;
        console.log('Login process completed!');
      });
  }
}
