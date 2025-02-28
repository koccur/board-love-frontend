import { Component } from '@angular/core';
import { EventService } from './events.service';
import { EventGame } from './events.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  standalone:false,
})
export class EventsComponent {
  events: EventGame[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
    });
  }
}
