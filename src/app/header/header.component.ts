import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersService } from '../users/users.service';
import { Observable } from 'rxjs';
import { User } from '../users/users.model';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  loggedUser$:Observable<User>;
  constructor(private userService:UsersService) {
  this.loggedUser$ = this.userService.getMyData();
  }
}
