import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { API_URL } from '../app.config';
import { FriendUser, User } from './users.model';
import { Game } from '../games/game.model';
import { Spot } from '../spots/spots.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  tempLocalData = { id: 1, username: 'John Connor', email: 'john@connor.doe.com' };
  // fix to user userLoggedData instead of temp;
  private userLoggedData: ReplaySubject<Partial<User>> = new ReplaySubject(1);
  constructor(private http: HttpClient) {
    this.userLoggedData.next(
      { id: 1, username: 'John Connor', email: 'john@connor.doe.com' }
    )
  }

  getUsers(usersName: string): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL.USERS}?name=${usersName}`);
  }

  getUserById(id: number): Observable<FriendUser> {
    return this.http.get<FriendUser>(`${API_URL.USERS}/${id}`);
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

  getFriendList(usersName: string): Observable<FriendUser[]> {
    // getViaLoggedTokenId instead of plain id
    return this.http.get<User[]>(`${API_URL.USERS}/find-friends?friendName=${usersName}&id=${this.tempLocalData.id}`)
      .pipe(map((users: User[]) =>
        users.map(user => ({ id: user.id, username: user.username }))))
  };

  addFriend(friendId: number): Observable<User> {
    return this.http.post<User>(`${API_URL.USERS}/${this.tempLocalData.id}/add-friend`, { friendId });
  }

  removeFriend(friendId: number): Observable<User> {
    return this.http.delete<User>(`${API_URL.USERS}/${this.tempLocalData.id}/remove-friend/${friendId}`);
  }

  // todo new type? Loggin Data?
  getMyData(): Observable<User> {
    return this.userLoggedData.asObservable() as Observable<User>;
  }

  getUserFavGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${API_URL.USERS}/${this.tempLocalData.id}/fav-games`);
  }

  getUserOwnedGames(userId: number = this.tempLocalData.id): Observable<Game[]> {
    return this.http.get<Game[]>(`${API_URL.USERS}/${userId}/owned-games`);
  }

  getFavSpots(mySpotsSearchText: string) {
    // getViaLoggedTokenId instead of plain id
    // todo: consider move it to user.service.ts
    return this.http.get<Spot[]>(`${API_URL.USERS}/favspots?name=${mySpotsSearchText}&userId=${this.tempLocalData.id}`)
  }

  addFavSpot(spotId: number): Observable<Spot> {
    return this.http.post<Spot>(`${API_URL.USERS}/${this.tempLocalData.id}/fav-spot`, { spotId });
  }

  removeFavSpot(spotId: number): Observable<Spot> {
    return this.http.delete<Spot>(`${API_URL.USERS}/${this.tempLocalData.id}/fav-spot/${spotId}`);
  }
}
