import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SlotService {
  constructor(private http: HttpClient) {}

  getAvailableSlots(): Observable<any> {
    return this.http.get('https://conference-backend-3nta.onrender.com/api/slots');
  }

  bookSlots(RegNo: string, selectedSlots: string[]): Observable<any> {
    // alert(RegNo);
    return this.http.post('https://conference-backend-3nta.onrender.com/api/book-slot', { RegNo, selectedSlots });
  }

  userslotinfo(RegNo:String): Observable<any>{
    console.log("service called");
    return  this.http.post<any[]>('https://conference-backend-3nta.onrender.com/api/user-slot-info', { RegNo});
   
  }
}