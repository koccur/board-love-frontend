import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { FriendUser, User } from '../users.model';
import { Location } from '@angular/common';
import { BehaviorSubject, combineLatest, map, Observable, Subject, switchMap } from 'rxjs';
import { Game } from '../../games/game.model';
@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user$: Observable<FriendUser>
  ownedGames$: Observable<Game[]>
  refresh$: BehaviorSubject<void> = new BehaviorSubject<void>(null);

  constructor(private userService: UsersService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    // todo get particular user and check is it friend with loggedOne?

    this.user$ = this.refresh$.pipe(switchMap(() =>
      this.userService.getFriendList('').pipe(switchMap((friendList: User[]) =>
        this.userService.getUserById(userId).pipe(map((userData) => (
          {
            ...userData,
            isFriend: friendList.some((user) => userId === user.id)
          })
        ))))));
    this.ownedGames$ = this.userService.getUserOwnedGames(userId);
  }

  goBack() {
    this.location.back();
  }

  addFriend(friendId: number) {
    this.userService.addFriend(friendId).subscribe(() => this.refresh$.next());
  }

  removeFriend(friendId: number) {
    this.userService.removeFriend(friendId).subscribe(() => this.refresh$.next());
  }
}
