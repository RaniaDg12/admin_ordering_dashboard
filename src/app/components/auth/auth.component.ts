import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isSignUpMode: boolean = false;

  loginobject: any = {
    email: '',
    password: ''
  };

  signupobject: any = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  switchMode() {
    this.isSignUpMode = !this.isSignUpMode;
  }

  login() {
    this.authService.login(this.loginobject.email, this.loginobject.password).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        // Debugging statement
        console.log('Attempting to navigate to /home');
        this.router.navigate(['/home']).then(success => {
          if (success) {
            console.log('Navigation to /home successful');
          } else {
            console.error('Navigation to /home failed');
          }
        });
      },
      (error: any) => {
        console.error('Login failed:', error);
        // Handle login error (e.g., show an error message)
      }
    );
  }
  
  signup() {
    this.authService.signup(this.signupobject.name, this.signupobject.email, this.signupobject.password).subscribe(
      (response: any) => {
        console.log('Signup successful:', response);
        // Debugging statement
        console.log('Attempting to navigate to /home');
        this.router.navigate(['/home']).then(success => {
          if (success) {
            console.log('Navigation to /home successful');
          } else {
            console.error('Navigation to /home failed');
          }
        });
      },
      (error: any) => {
        console.error('Signup failed:', error);
        // Handle signup error (e.g., show an error message)
      }
    );
  }


}
