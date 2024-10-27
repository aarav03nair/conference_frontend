import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://conference-backend-3nta.onrender.com';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  clearUserSlots(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/clear-user-slots`, { userId });
  }
}
