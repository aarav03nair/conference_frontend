import { Component, OnInit } from '@angular/core';
import { SlotService } from '../slot.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-slot-selection',
  templateUrl: './slot-selection.component.html',
  styleUrls: ['./slot-selection.component.css']
})
export class SlotSelectionComponent implements OnInit {
  availableSlots: any[] = [];
  selectedSlots: string[] = [];
  userName: string = '';
  slots: any[] = [];
  alreadyExistFlag: boolean = true;
  selectedDay: string = 'Day 1'; // Default to Day 1
  email: string = '';
  loading: boolean = false;

  constructor(private slotService: SlotService, private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  ngOnInit() {
    const RegNo = localStorage.getItem('regNo') || '';
    this.userName = this.authService.getUserName();

    this.slotService.userslotinfo(RegNo).subscribe(
      (response) => {
        this.slots = response;
        this.alreadyExistFlag = this.slots.length === 0;
      },
      (error) => console.error('Error fetching user slot info:', error)
    );

    this.slotService.getAvailableSlots().subscribe((slots) => {
      this.availableSlots = slots;
    });
  }

  setDay(day: string) {
    this.selectedDay = day;
  }

  toggleSlot(slotId: string) {
    const index = this.selectedSlots.indexOf(slotId);
    if (index === -1) {
      if (this.selectedSlots.length < 2) {
        this.selectedSlots.push(slotId);
      } else {
        this.toastr.error('You can only select a maximum of 2 slots.');
      }
    } else {
      this.selectedSlots.splice(index, 1);
    }
  }

  bookSlots() {
    this.loading = true; // Show loading overlay
  
    const RegNo = localStorage.getItem('regNo') || '';
    this.slotService.bookSlots(RegNo, this.selectedSlots, this.email).subscribe(
      () => {
        this.toastr.success('Slots booked successfully!');
        localStorage.removeItem('regNo');
        this.loading = false;
        this.router.navigate(['/login']);
      },
      (error) => {
        if (error.status === 400 && error.error) {
          this.loading = false;
          this.toastr.error(error.error);
        } else {
          this.loading = false;
          this.toastr.error('An unexpected error occurred. Please try again later.');
        }
      }
    );
  }

  getSlotDetails(slotId: string) {
    return this.availableSlots.find(slot => slot._id === slotId);
  }

  getFilteredSlots(hallName: string) {
    // console.log(hallName);
    // console.log(this.selectedDay);
    // console.log(this.availableSlots);
    // console.log(this.availableSlots.filter(slot => slot.day === this.selectedDay && slot.hall === hallName));
    return this.availableSlots.filter(slot => slot.day === this.selectedDay && slot.room === hallName);
  }
}
