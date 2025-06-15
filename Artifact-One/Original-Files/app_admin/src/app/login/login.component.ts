import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public formError: string = '';
  submitted = false;
  
  credentials = {
    name: '',
    email: '',
    password: ''
  }
  
  constructor(
    private router: Router, 
    private authenService: AuthenticationService
  ){}

  ngOnInit(): void {}
    
  public onLoginSubmit(): void {
    
    this.formError = '';
    
    if (!this.credentials.email || ! this.credentials.password) { 
      // || !this.credentials.name
      // ^ Name is not actually required to login.
      this.formError = 'Email and Password are required fields';
      //this.router.navigateByUrl('#');
    }
    else {
      this.doLogin();
    }
  }

  private doLogin(): void {
    let newUser = {
      name: this.credentials.name,
      email: this.credentials.email
    } as User;

    this.authenService.login(newUser,
      this.credentials.password);
      

      // Check if user is logged in.
      if(this.authenService.isLoggedIn()) {
        // console.log('Router::Direct');
        this.router.navigate(['']);
      }

      // If not, check again after 3 seconds.
      else {
        var timer = setTimeout(() => {
          if(this.authenService.isLoggedIn()) {
        // console.log('Router::Pause');
          this.router.navigate(['']);
          }}, 3000);
      }
  }
}
