import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Login } from '../login/login';
import { Register} from '../register/register';
@Component({
  selector: 'app-waste-recycle',
  standalone: true,
  imports: [RouterModule, CommonModule, Login, Register],
  templateUrl: './waste-recycle.html',
  styleUrls: ['./waste-recycle.css']
}
)

export class WasteRecycle {
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
  showMenu = false;
  constructor( private router: Router) {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
