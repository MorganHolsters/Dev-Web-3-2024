import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';
import { AdminService } from '../services/admin.service';
import { Observable } from 'rxjs';
import { NgIf } from '@angular/common';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgIf, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  user$!: Observable<boolean>;
  admin$!: Observable<boolean>;

  constructor(
    private adminService: AdminService,
    private userService: UserService,      
  ){}

  ngOnInit(): void {
    this.user$ = this.userService.getUser()
    this.admin$ = this.adminService.getAdmin()
  }

  toggleMenu() {
    const navbarMenu = document.querySelector("#nav-links");

    navbarMenu?.classList.toggle('is-active')
  }
}
