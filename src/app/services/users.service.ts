import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUser, User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  
  addUser(user: CreateUser): Observable<CreateUser> {
    return this.http.post<CreateUser>(this.apiUrl, user);
  }

  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

}
