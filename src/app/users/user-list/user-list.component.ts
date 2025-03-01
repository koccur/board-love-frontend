import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../users.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  standalone:false,
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
