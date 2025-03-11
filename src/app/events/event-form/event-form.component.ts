import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { EventService } from '../events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FriendUser, User } from '../../users/users.model';
import { UsersService } from '../../users/users.service';
import { Game } from '../../games/game.model';
import { GamesService } from '../../games/games.service';
import { Spot } from '../../spots/spots.model';
import { SpotService } from '../../spots/spots.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  standalone: false,
})
export class EventFormComponent implements OnInit {
  // check based on id if element exist and then change form
  eventForm: FormGroup;
  userFriendList$: Observable<FriendUser[]>;
  userFavGameList$: Observable<Game[]>
  gameList$: Observable<Game[]>
  spotList$: Observable<Spot[]>
  isEdit = false;
  eventId!: number;

  constructor(private fb: FormBuilder,
    private location: Location,
    private userService: UsersService,
    private gameService: GamesService,
    private spotService: SpotService,
    private route: ActivatedRoute,
    private eventService: EventService, private router: Router) {
    
    this.userService.getMyData().subscribe((myData: User) => {
      this.eventForm.get('organizerId').setValue(myData.id, { onlyself: true })
    });
    this.userFavGameList$ = this.userService.getUserFavGames();
    this.gameList$ = this.gameService.getGames();
    this.spotList$ = this.spotService.getSpots();
  }

  ngOnInit(): void {
    this.initializeForm();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isEdit = true;
      this.eventId = id;
      this.eventService.getEventById(id).subscribe((event) => {
        this.eventForm.patchValue(event);
        debugger;
        // todo multiselect gameIds doesnt work
        this.eventForm.get('gameIds').patchValue(event.games.map(game=>game.id));
        this.eventForm.get('participantsIds').patchValue(event.participants.map(user=>user.id));
        this.eventForm.get('spotId').patchValue(event.spot.id);
      });
    }
    this.userFriendList$ = this.userService.getFriendList();
  }

  onSubmit(): void {
    debugger;
    if (this.eventForm.valid) {
      if(this.isEdit){
        this.eventService.updateEvent(this.eventId,this.eventForm.value).subscribe(() => {
          this.router.navigate(['/events']);
        });
      }else{
        this.eventService.createEvent(this.eventForm.value).subscribe(() => {
          this.router.navigate(['/events']);
        });
      }
    }
  }

  goBack() {
    this.location.back();
  }

  private initializeForm() {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      spotId: [''],
      description: [''],
      maxParticipants: [6],
      organizerId: [''],
      gameIds: [''],
      isPrivate: [false],
      participantsIds: [],
    });
  }
}
