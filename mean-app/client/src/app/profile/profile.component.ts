import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  activeTab: 'profile' | 'password' = 'profile';

  successMessage = '';
  errorMessage = '';

  // Theme toggle
  isDarkTheme: boolean = true;

  constructor(private fb: FormBuilder, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Profile form
    this.profileForm = this.fb.group({
      fullName: ['John Doe', Validators.required],
      email: [{ value: 'john@example.com', disabled: true }],
      location: ['Chennai'],
      skills: ['Angular, Node.js']
    });

    // Password form
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });

    // Set default theme
    this.setTheme();
  }

  setActiveTab(tab: 'profile' | 'password') {
    this.activeTab = tab;
    this.successMessage = '';
    this.errorMessage = '';
  }

  saveProfile() {
    if (this.profileForm.valid) {
      this.successMessage = 'Profile updated successfully!';
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Please fill all required fields.';
      this.successMessage = '';
    }
  }

  changePassword() {
    const { newPassword, confirmPassword } = this.passwordForm.value;

    if (this.passwordForm.invalid) {
      this.errorMessage = 'Please fill all fields correctly.';
      this.successMessage = '';
      return;
    }

    if (newPassword !== confirmPassword) {
      this.errorMessage = 'New password and Confirm password do not match.';
      this.successMessage = '';
      return;
    }

    this.successMessage = 'Password changed successfully!';
    this.errorMessage = '';
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.setTheme();
  }

  setTheme() {
    if (this.isDarkTheme) {
      this.renderer.removeClass(document.body, 'light-theme');
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
      this.renderer.addClass(document.body, 'light-theme');
    }
  }
}
