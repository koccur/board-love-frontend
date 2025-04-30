import { Component, OnInit } from '@angular/core';
import { SpotService } from '../spots.service';
import { ActivatedRoute } from '@angular/router';
import { Spot } from '../spots.model';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-spot-details',
  standalone: false,
  templateUrl: './spot-details.component.html',
  styleUrl: './spot-details.component.scss'
})
export class SpotDetailsComponent implements OnInit {
  spot?: Spot;

  constructor(private spotService: SpotService,
    private userService:UsersService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const spotId = Number(this.route.snapshot.paramMap.get('id'));
    this.spotService.getSpotById(spotId).subscribe((data) => {
      this.spot = data;
    });
  }


  addTofavSpot(spotId: number) {
    // todo work on refreshing page and add remove
    this.userService.addFavSpot(spotId).subscribe();
  }
}
