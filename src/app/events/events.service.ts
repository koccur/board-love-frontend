import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';
import { CreateEventDto, EventGame, UpdateEventDto } from './events.model';



@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) {}

  getEvents(): Observable<EventGame[]> {
    return this.http.get<EventGame[]>(API_URL.EVENTS);
  }

  getEventById(id: number): Observable<EventGame> {
    return this.http.get<EventGame>(`${API_URL.EVENTS}/${id}`);
  }

  createEvent(event: CreateEventDto): Observable<EventGame> {
    return this.http.post<EventGame>(API_URL.EVENTS, event);
  }

  updateEvent(id: number, event: UpdateEventDto): Observable<EventGame> {
    return this.http.put<EventGame>(`${API_URL.EVENTS}/${id}`, event);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL.EVENTS}/${id}`);
  }
}
