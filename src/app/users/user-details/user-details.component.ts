import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../users.model';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user$: Observable<User>

  constructor(private userService: UsersService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    this.user$ = this.userService.getUserById(userId);
  }
  goBack() {
    this.location.back();
  }
}
