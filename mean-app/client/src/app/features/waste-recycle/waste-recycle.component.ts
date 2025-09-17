import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
@Component({
  selector: 'app-waste-recycle',
  standalone: true,
  imports: [RouterModule, CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './waste-recycle.component.html',
  styleUrls: ['./waste-recycle.component.css']
}
)

export class WasteRecycleComponent {
  showLogin = false;
  showRegister = false; 
  openLoginModal() {
    console.log('openLoginModal called');
    this.showLogin = true;
    this.showRegister = false;
  }

  openRegisterModal() {
    console.log('openRegisterModal called');
    this.showRegister = true;
    this.showLogin = false;
  }

  closeModal() {
    console.log('closeModal called');
    this.showLogin = false;
    this.showRegister = false;
  }
}
