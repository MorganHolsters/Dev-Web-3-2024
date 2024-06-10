import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss'
})
export class SignupFormComponent {

  constructor(
    private authService: AuthService,      
  ){}

  signupForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  handleSubmit(){
    console.log(JSON.stringify({name: this.signupForm.value.username, email: this.signupForm.value.email, password: this.signupForm.value.password}));
    return this.authService.signup(JSON.stringify({name: this.signupForm.value.username, email: this.signupForm.value.email, password: this.signupForm.value.password}));
  }

}
