import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../game.model';
import { GamesService } from '../games.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-game-form',
  standalone: false,
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.scss'
})
export class GameFormComponent {
  gameForm!: FormGroup;
  isEdit = false;
  gameId!: number;

  constructor(
    private fb: FormBuilder,
    private gameService: GamesService,
    private route: ActivatedRoute,
    private location:Location, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isEdit = true;
      this.gameId = id;
      this.gameService.getGameById(id).subscribe((game) => {
        this.gameForm.patchValue(game);
      });
    }
  }

  initializeForm(): void {
    this.gameForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      genre: ['', Validators.required],
      numberOfPlayers: [1, [Validators.required, Validators.min(1)]],
      releaseDate: ['', Validators.required],
      description: [''],
      time: [''],
      ageRestriction: [''],
    });
  }

  saveGame(): void {
    if (this.gameForm.invalid) return;

    const game: Game = this.gameForm.value;

    if (this.isEdit) {
      this.gameService.updateGame(this.gameId, game).subscribe(() => {
        this.router.navigate(['/games']);
      });
    } else {
      this.gameService.createGame(game).subscribe(() => {
        this.router.navigate(['/games']);
      });
    }
  }

  goBack() {
    this.location.back();
    }
}
