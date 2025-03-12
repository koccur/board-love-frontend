import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../game.model';
import { GamesService } from '../games.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-game-detail',
  standalone: false,
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.scss'
})
export class GameDetailComponent {
  game$: Observable<Game>;

  constructor(private route: ActivatedRoute,
    private router:Router,
    private location:Location,
    private gameService: GamesService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.game$ = this.gameService.getGameById(id);
  }

  goToGame(id:number) {
    this.router.navigateByUrl(`/games/edit/${id}`);
  }

  goBack() {
    this.location.back();
  }
}
