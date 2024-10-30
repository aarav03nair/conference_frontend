import { Component, OnInit } from '@angular/core';
import { SlotService } from '../slot.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-slot-selection',
  templateUrl: './slot-selection.component.html',
  styleUrl: './slot-selection.component.css'
})
// export class SlotSelectionComponent implements OnInit {
//   availableSlots: any[] = [];
//   selectedSlots: string[] = [];
//   numberOfSlots:Number=0;
//   slots: any[]=[];
//   alreadyExistFlag:boolean=true;
//   userName: string = '';  // Store user's name

//   constructor(private slotService: SlotService, private authService: AuthService, private router:Router) {}

//   // ngOnInit() {
//   //   const RegNo = this.authService.getRegNo();
//   //   this.slotService.getAvailableSlots().subscribe(slots => {
      
//   //     this.availableSlots = slots;
//   //   });
    
//   // }
//   ngOnInit() {
//     const RegNo = this.authService.getRegNo();
//     this.userName = this.authService.getUserName();

//     // Call to get the number of booked slots for the user
//     this.slotService.userslotinfo(RegNo).subscribe(
//       (response) => {
//         // Assuming response is the number of booked slots
//         this.slots = response;
//         if (this.slots.length!=0){
//           this.alreadyExistFlag = !this.alreadyExistFlag;
//         }
//         console.log('pre booked slots:', this.slots);
//       },
//       (error) => {
//         console.error('Error fetching user slot info:', error);
//       }
//     );

//     // Call to get available slots
//     this.slotService.getAvailableSlots().subscribe(slots => {
//       this.availableSlots = slots;
//     });
//   }


//   selectSlot(slotId: string) {
//     if (this.selectedSlots.length < 2 && !this.selectedSlots.includes(slotId)) {
//       this.selectedSlots.push(slotId);
//     }
//   }

//   bookSlots() {
//     const RegNo = this.authService.getRegNo();
//     // alert(RegNo);
//     console.log(this.selectedSlots);
   
//     this.slotService.bookSlots(RegNo, this.selectedSlots).subscribe(
//       (response) => {
//         // Success callback
//         alert('Slots booked successfully!');
//         this.router.navigate(['/login']);
//       },
//       (error) => {
//         // Error callback
//         if (error.status === 400 && error.error) {
//           // Show the error message from the backend
//           alert(error.error); 
//         } else {
//           // Show a generic error message for other statuses
//           alert('An unexpected error occurred. Please try again later.');
//         }
//       }
//     );
//   }
//   getSlotDetails(slotId: string) {
    
//     return this.availableSlots.find(slot => slot._id === slotId);
//   }
//   toggleSlot(slotId: string) {
//     const index = this.selectedSlots.indexOf(slotId);
  
//     if (index === -1) {
//       // If less than 2 slots are selected, allow adding the slot
//       if (this.selectedSlots.length < 2) {
//         this.selectedSlots.push(slotId);
//       } else {
//         alert('You can only select a maximum of 2 slots.');
//       }
//     } else {
//       // Remove the slot if already selected (deselect)
//       this.selectedSlots.splice(index, 1);
//     }
//   }
  
// }

export class SlotSelectionComponent implements OnInit {
  availableSlots: any[] = [];
  availableSlotsByDay: any[] = []; // Filtered slots for the selected day
  selectedSlots: string[] = [];
  userName: string = '';
  slots: any[] = [];
  alreadyExistFlag: boolean = true;
  selectedDay: string = 'Day 1'; // Default to Day 1
  email: string = '';
  
  constructor(private slotService: SlotService, private authService: AuthService, private router: Router, private toastr:ToastrService) {}

  ngOnInit() {
    // checkAndNavigate();
    // const RegNo = this.authService.getRegNo();
    const RegNo = localStorage.getItem('regNo')|| '';
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
      this.filterSlotsByDay(); // Filter slots on initial load
    });
  }

  setDay(day: string) {
    this.selectedDay = day;
    this.filterSlotsByDay();
  }

  filterSlotsByDay() {
    this.availableSlotsByDay = this.availableSlots.filter(slot => slot.day === this.selectedDay);
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
    const RegNo = localStorage.getItem('regNo')|| '';
    // const regNo = localStorage.getItem('regNo');
  // if (!RegNo || RegNo.trim() === '') {
  //   this.router.navigate(['/login']);
  // }
    this.slotService.bookSlots(RegNo, this.selectedSlots,this.email).subscribe(
      () => {
        this.toastr.success('Slots booked successfully!');
        localStorage.removeItem('regNo');
        this.router.navigate(['/login']);
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

  getSlotDetails(slotId: string) {
    return this.availableSlots.find(slot => slot._id === slotId);
  }
}
