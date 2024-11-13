import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  registrationNumber = '';
  phoneNumber = '';  // New field for phone number

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService
  ) {}

  login() {
    if (this.registrationNumber === 'admin123') {
      this.router.navigate(['/admin']);
    } else {
      // Pass both registrationNumber and phoneNumber to the login service
      this.authService.login(this.registrationNumber, this.phoneNumber).subscribe(
        (user) => {
          this.authService.setUserName(user.name);
          if (user) {
            localStorage.setItem('regNo', this.registrationNumber);
            this.router.navigate(['/select-slots']);
          }
        },
        (error) => {
          if (error.status === 400 && error.error) {
            this.toastr.error(error.error);
          } else {
            this.toastr.error('An unexpected error occurred. Please try again later.');
          }
        }
      );
    }
  }
}
