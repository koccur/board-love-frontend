import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { EventService } from '../events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
  standalone:false,
})
export class EventFormComponent {
  // check based on id if element exist and then change form
  eventForm: FormGroup;

  constructor(private fb: FormBuilder,
    private location: Location,
     private eventService: EventService, private router: Router) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      description: [''],
      maxParticipants: [''],
      organizerId: [''],
      gameId: [''],
      participantsIds: [''],
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.eventService.createEvent(this.eventForm.value).subscribe(() => {
        this.router.navigate(['/events']);
      });
    }
  }

  goBack() {
    this.location.back(); 
    }
}
