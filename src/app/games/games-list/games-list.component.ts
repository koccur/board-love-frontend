import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../game.model';
import { GamesService } from '../games.service';
import { UsersService } from '../../users/users.service';
import { Observable, switchMap, tap } from 'rxjs';
import { User } from '../../users/users.model';

@Component({
  selector: 'app-games-list',
  standalone: false,
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesListComponent {
  displayedColumns: string[] = ['id', 'title', 'genre', 'releaseDate', 'numberOfPlayers', 'actions'];
  games$: Observable<Game[]>;
  isAllGamesPage: boolean;
  isUserAdmin: any;
  userHasIt: number[] = [];
  userGames$: any;

  constructor(private gameService: GamesService,
    private userService: UsersService,
    private router: Router) { }

  ngOnInit(): void {
    debugger;
    // todo make it visiable on single page?
    this.isAllGamesPage = !this.router.url.includes('/user');
    this.setGameList();
  }

  userGotIt(num: number): boolean {
    console.count("num");
    return this.userHasIt.some(id => id === num);
  }

  assignGame(gameId: number) {
    this.userService.getMyData().pipe(
      switchMap((userData: User) => this.gameService.assignGameToUser({ userId: userData.id, gameId }))).
      subscribe(() => { });
  }

  unassignGame(gameId: number) {
    this.userService.getMyData().pipe(
      switchMap((userData: User) => this.gameService.unassignGameToUser({ userId: userData.id, gameId }))).
      subscribe(() => {
        this.refreshPage();
      });
  }

  deleteGame(id: number): void {
    if (this.isAllGamesPage && this.isUserAdmin && confirm('Are you sure you want to delete this game?')) {
      this.gameService.deleteGame(id).subscribe(() => {
        this.loadGames();
      });
    }
  }

  redirectToAllGames() {
    this.router.navigateByUrl('/games');
  }

  redirectToMyGames() {
    this.userService.getMyData().subscribe(data => {
      this.router.navigateByUrl('/games/user/' + data.id);
    })

  }
  editGame(id: number): void {
    if (this.isAllGamesPage && this.isUserAdmin) {

    }
  }

  private refreshPage() {
    // todo make it add it to subject 
    this.setGameList();
  }

  private setGameList() {
    if (this.isAllGamesPage) {
      this.games$ = this.loadUserGames().pipe(switchMap(() => {
        return this.loadGames();
      }));
    } else {
      this.games$ = this.loadUserGames();
    }
  }

  private loadUserGames(): Observable<Game[]> {
    return this.userService.getMyData().pipe(
      switchMap((userData: User) => {
        return this.gameService.getUserGames(userData.id).pipe(tap((userGames: Game[]) => {
          this.userHasIt = userGames.map(game => game.id).flat();
          debugger;
        }))
      }));
  }

  private loadGames(): Observable<Game[]> {
    return this.gameService.getGames();
  }
}
