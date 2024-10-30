import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements    OnInit {
  title = 'conference-booking';
  constructor(private router: Router){}
ngOnInit(): void {
  console.log("appcomp ngonoint called");
  console.log(localStorage.getItem('regNo'))
  this.checkAndNavigate();
}
  checkAndNavigate(): void {
    const regNo: string | null = localStorage.getItem('regNo');
    if (!regNo || regNo.trim() === '') {
      this.router.navigate(['/login']);
    }
  }
}

