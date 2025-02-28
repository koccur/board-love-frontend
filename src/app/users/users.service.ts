import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';
import { User } from './users.model';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL.USERS);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${API_URL.USERS}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(API_URL.USERS, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${API_URL.USERS}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL.USERS}/${id}`);
  }
}
