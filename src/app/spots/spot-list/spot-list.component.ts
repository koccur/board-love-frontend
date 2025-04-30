import { Component, OnInit } from '@angular/core';
import { SpotService } from '../spots.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UsersService } from './../../users/users.service';

@Component({
  selector: 'app-spot-list',
  templateUrl: './spot-list.component.html',
  standalone: false,
  styleUrls: ['./spot-list.component.scss']
})
export class SpotListComponent implements OnInit {
  mySpotsSearchText = '';
  filteredFavSpots = [];
  searchText = '';
  filteredSpots = [];

  constructor(private spotService: SpotService,
    private userService:UsersService,
  ) { }

  ngOnInit(): void {
    this.spotService.getSpots(this.searchText).subscribe((data) => {
      this.filteredSpots = [...data];
    });
    this.userService.getFavSpots(this.mySpotsSearchText).subscribe((data) => {
      this.filteredFavSpots = [...data]
    })
  }

  filterSpots() {
    this.spotService.getSpots(this.searchText.toLowerCase()).pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((data) => {
      this.filteredSpots = data;
    })
  }
  filterFavSpots() {
    this.userService.getFavSpots(this.mySpotsSearchText.toLowerCase()).pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((data) => {
      this.filteredFavSpots = data;
    })
  }
}
