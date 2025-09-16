import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../../components/login-form/login-form';
import { RegisterFormComponent } from '../../components/register-form/register-form';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, LoginFormComponent, RegisterFormComponent],
  templateUrl: './auth-page.html',
  styleUrls: ['./auth-page.css']
})
export class AuthPageComponent {
  activeTab: 'login' | 'register' = 'login';

  setActiveTab(tab: 'login' | 'register') {
  this.activeTab = tab;
}

}
