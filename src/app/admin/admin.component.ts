import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  users: any[] = [];

  constructor(private userService: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.toastr.info('Testing toast notification');
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => (this.users = data),
      (error) => console.error('Error fetching users:', error)
    );
  }

  clearSlots(userId: string) {
    const confirmation = confirm(`Are you sure you want to clear the slots for username (Registration Number: ${userId})?`);
    if(confirmation){

      this.userService.clearUserSlots(userId).subscribe(
        () => {
          // alert('User slots cleared successfully');
          this.toastr.success('User slots cleared successfully');
          this.loadUsers();  // Reload users to reflect changes
        },
        (error) => {console.error('Error clearing user slots:', error),
          this.toastr.error('Failed to clear user slots');
        }
      );
    }
  }
}
