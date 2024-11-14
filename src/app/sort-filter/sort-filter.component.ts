import { Component } from '@angular/core';
import { SlotService } from '../slot.service';

@Component({
  selector: 'app-sort-filter',
  templateUrl: './sort-filter.component.html',
  styleUrl: './sort-filter.component.css'
})
export class SortFilterComponent {
  day = '';
  room = '';
  time = '';
  users: any[] = [];

  constructor(private slotService: SlotService) {}

  // Method to call the API and get users who booked the selected slot
  getUsers() {
    this.slotService.getUsersForSlot(this.day, this.room, this.time).subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

}
