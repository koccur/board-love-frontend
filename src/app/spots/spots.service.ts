import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';
import { Spot } from './spots.model';


@Injectable({
  providedIn: 'root'
})
export class SpotService {
  constructor(private http: HttpClient) { }

  getSpots(spotName: string): Observable<Spot[]> {
    return this.http.get<Spot[]>(`${API_URL.SPOTS}?name=${spotName}`);
  }

  getSpotById(id: number): Observable<Spot> {
    return this.http.get<Spot>(`${API_URL.SPOTS}/${id}`);
  }

  createSpot(spot: Spot): Observable<Spot> {
    return this.http.post<Spot>(API_URL.SPOTS, spot);
  }

  updateSpot(id: number, spot: Spot): Observable<Spot> {
    return this.http.put<Spot>(`${API_URL.SPOTS}/${id}`, spot);
  }

  deleteSpot(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL.SPOTS}/${id}`);
  }
}
