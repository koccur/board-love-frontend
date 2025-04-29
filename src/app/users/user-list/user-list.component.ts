import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../users.model';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  standalone: false,
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  searchText: string = '';
  myFriendsSearchText: string='';
  filteredUsers = []
  filteredFriends = []

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getUsers(this.searchText).subscribe((data) => {
      this.filteredUsers = [...data];
    });
    this.userService.getFriendList(this.myFriendsSearchText).subscribe((data)=>{
      this.filteredFriends = [...data]
    })
  }

  filterUsers() {
    this.userService.getUsers(this.searchText.toLowerCase()).pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((data) => {
      this.filteredUsers = data;
    })
  }
  filterFriends() {
    this.userService.getFriendList(this.myFriendsSearchText.toLowerCase()).pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((data) => {
      this.filteredFriends = data;
    })
  }
}
