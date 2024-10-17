import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private RegNo: string = '';

  constructor(private http: HttpClient) {}

  login(registrationNumber: string): Observable<any> {
    this.setRegNo(registrationNumber);
    return this.http.post('https://conference-backend-3nta.onrender.com/api/login', { registrationNumber });
  }

  setRegNo(id: string) {
    this.RegNo = id;
  }

  getRegNo(): string {
    return this.RegNo;
  }
}