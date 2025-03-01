import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../events.service';
import { EventGame } from '../events.model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  standalone:false,
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  event?: EventGame;

  constructor(private eventService: EventService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.eventService.getEventById(eventId).subscribe((data) => {
      this.event = data;
    });
  }
}
