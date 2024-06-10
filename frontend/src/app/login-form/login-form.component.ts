import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  constructor(
    private authService: AuthService,      
  ){}

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  handleSubmit(){
    console.log(JSON.stringify({email: this.loginForm.value.email, password: this.loginForm.value.password}));
    return this.authService.login(JSON.stringify({email: this.loginForm.value.email, password: this.loginForm.value.password}));
  }

}
