import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://conference-backend-r057.onrender.com/api';
  // private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  clearUserSlots(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/clear-user-slots`, { userId });
  }
}
