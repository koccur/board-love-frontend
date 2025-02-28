import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './game.model';
import { API_URL } from './../app.config';

@Injectable({
  providedIn:'root'
})
export class GamesService {
  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(API_URL.GAMES);
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
}
