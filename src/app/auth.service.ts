import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = 'https://conference-backend-r057.onrender.com/api';
  private apiUrl = 'http://localhost:3000/api';
  
  private RegNo: string = '';
  private userName: string = '';

  constructor(private http: HttpClient) {}

  login(registrationNumber: string): Observable<any> {
    this.setRegNo(registrationNumber);
    return this.http.post(`${this.apiUrl}/login`, { registrationNumber });
  }

  setRegNo(id: string) {
    this.RegNo = id;
  }

  setUserName(name: string) {
    this.userName = name;
  }

  getUserName() {
    return this.userName;
  }
  getRegNo(): string {
    return this.RegNo;
  }
}
