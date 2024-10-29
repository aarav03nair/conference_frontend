import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SlotService {
  constructor(private http: HttpClient) {}
  // private apiUrl = 'https://conference-backend-r057.onrender.com/api';
  private apiUrl = 'http://localhost:3000/api';

  getAvailableSlots(): Observable<any> {
    return this.http.get(`${this.apiUrl}/slots`);
  }

  bookSlots(RegNo: string, selectedSlots: string[], email: string): Observable<any> {
    alert(RegNo);
    return this.http.post(`${this.apiUrl}/book-slot`, { RegNo, selectedSlots,email });
  }

  userslotinfo(RegNo:String): Observable<any>{
    console.log("service called");
    return  this.http.post<any[]>(`${this.apiUrl}/user-slot-info`, { RegNo});
   
  }
}
