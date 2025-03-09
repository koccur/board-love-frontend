import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { API_URL } from '../app.config';
import { FriendUser, User } from './users.model';
import { Game } from '../games/game.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private tempLocalData = { id: 1, username: 'John Connor', email: 'john@connor.doe.com' };
  // fix to user userLoggedData instead of temp;
  private userLoggedData: ReplaySubject<Partial<User>> = new ReplaySubject(1);
  constructor(private http: HttpClient) {
    this.userLoggedData.next(
      { id: 1, username: 'John Connor', email: 'john@connor.doe.com' }
    )
  }

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

  getFriendList(): Observable<FriendUser[]> {
    // todo add on backend
    return this.getUsers().pipe(map((users: User[]) =>
      users.map(user => ({ id: user.id, name: user.username }))))
  };

  // todo new type? Loggin Data?
  getMyData(): Observable<User> {
    return this.userLoggedData.asObservable() as Observable<User>;
  }

  getUserFavGames(): Observable<Game[]> {
    return of([{
      "id": 1,
      "title": "Catan",
      "description": "A strategy board game",
      "releaseDate": "1994-12-31T23:00:00.000Z",
      "numberOfPlayers": 4,
      "time": 90,
      "ageRestriction": 10,
      "genre": "STRATEGY"
    }]);
  }


  getUserOwnedGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${API_URL.USERS}/${this.tempLocalData.id}/owned-games`);
  }
}
