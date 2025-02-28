import { Component, OnInit } from '@angular/core';
import { SpotService } from '../spots.service';
import { Spot } from '../spots.model';

@Component({
  selector: 'app-spot-list',
  templateUrl: './spot-list.component.html',
  standalone:false,
  styleUrls: ['./spot-list.component.css']
})
export class SpotListComponent implements OnInit {
  spots: Spot[] = [];

  constructor(private spotService: SpotService) {}

  ngOnInit(): void {
    this.spotService.getSpots().subscribe((data) => {
      this.spots = data;
    });
  }
}
