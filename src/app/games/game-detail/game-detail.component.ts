import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../game.model';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-game-detail',
  standalone: false,
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.scss'
})
export class GameDetailComponent {
  game: Game | undefined;

  constructor(private route: ActivatedRoute, private gameService: GamesService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.gameService.getGameById(id).subscribe((data) => (this.game = data));
    }
  }
}
