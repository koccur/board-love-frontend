import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignGameDto, Game } from './game.model';
import { API_URL } from './../app.config';
import { User } from '../users/users.model';

@Injectable({
  providedIn:'root'
})
export class GamesService {
  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(API_URL.GAMES);
  }

  getUserGames(userId:number):Observable<Game[]>{
    // // todo add to header auth token to get my games
    // should game list be private?
    return this.http.get<Game[]>(`${API_URL.USERS}/${userId}/owned-games`)
  }

  getGameById(id: number): Observable<Game> {
    return this.http.get<Game>(`${API_URL.GAMES}/${id}`);
  }

  createGame(game: Game): Observable<Game> {
    return this.http.post<Game>(API_URL.GAMES, game);
  }

  updateGame(id: number, game: Game): Observable<Game> {
    return this.http.put<Game>(`${API_URL.GAMES}/${id}`, game);
  }

  deleteGame(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL.GAMES}/${id}`);
  }

  assignGameToUser(assignGameDto: AssignGameDto):Observable<User>{
    return this.http.post<User>(`${API_URL.GAMES}/assign`,assignGameDto);
  }

  unassignGameToUser(dto: AssignGameDto):Observable<User>{
    return this.http.post<User>(`${API_URL.GAMES}/unassign`,dto);
  }
}
