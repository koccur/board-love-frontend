import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../events.service';
import { EventGame } from '../events.model';
import { User } from '../../users/users.model';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  standalone:false,
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  event$: Observable<EventGame>;
  constructor(private eventService: EventService, private route: ActivatedRoute,
    private router:Router,
    private location:Location
  ) {}

  ngOnInit(): void {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.event$ = this.eventService.getEventById(eventId);
  }

  goToEvent(id:number) {
    this.router.navigateByUrl(`/events/edit/${id}`);
  }

  goBack() {
    this.location.back();
  }

  edit(id:number) {
    this.eventService.updateEvent
    throw new Error('Method not implemented.');
    }
}
