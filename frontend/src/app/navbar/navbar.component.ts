import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';
import { AdminService } from '../services/admin.service';
import { Observable } from 'rxjs';
import { NgIf } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { SignupFormComponent } from '../signup-form/signup-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgIf, AsyncPipe, SignupFormComponent, LoginFormComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  user$!: Observable<boolean>;
  admin$!: Observable<boolean>;

  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private authService: AuthService,      
  ){}

  ngOnInit(): void {
    this.user$ = this.userService.getUser()
    this.admin$ = this.adminService.getAdmin()
  }

  logoff(){
    return this.authService.logoff()
  }

  loginForm(){
    const loginForm = document.querySelector("#login-form");
    loginForm?.classList.toggle('is-active')
  }

  signupForm(){
    const signupForm = document.querySelector("#signup-form");
    signupForm?.classList.toggle('is-active')
  }

  

  toggleMenu() {
    const navbarMenu = document.querySelector("#nav-links");

    navbarMenu?.classList.toggle('is-active')
  }
}
