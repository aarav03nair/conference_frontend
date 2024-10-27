import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  registrationNumber = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    
    if (this.registrationNumber === 'admin123') {
      // Navigate to the admin page if registration number is "admin123"
      this.router.navigate(['/admin']);
    } else {
      // Perform the regular login for other users
      this.authService.login(this.registrationNumber).subscribe(user => {
        console.log('yaay1');
        console.log(user.name);
        this.authService.setUserName(user.name)
        if (user) {
          this.router.navigate(['/select-slots']);
        }
      },
      (error) => {
        // Error callback
        if (error.status === 400 && error.error) {
          // Show the error message from the backend
          alert(error.error); 
        } else {
          // Show a generic error message for other statuses
          alert('An unexpected error occurred. Please try again later.');
        }
      });
    }
  }
}
