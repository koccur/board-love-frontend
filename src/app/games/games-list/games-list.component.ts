import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../game.model';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-games-list',
  standalone: false,
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.scss'
})
export class GamesListComponent {
  displayedColumns: string[] = ['id', 'title', 'genre', 'releaseDate', 'numberOfPlayers', 'actions'];
  games: Game[] = [];

  constructor(private gameService: GamesService, private router: Router) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.gameService.getGames().subscribe((data) => (this.games = data));
  }

  deleteGame(id: number): void {
    if (confirm('Are you sure you want to delete this game?')) {
      this.gameService.deleteGame(id).subscribe(() => {
        this.loadGames();
      });
    }
  }
}
