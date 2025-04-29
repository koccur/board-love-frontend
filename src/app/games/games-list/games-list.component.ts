import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../game.model';
import { GamesService } from '../games.service';
import { UsersService } from '../../users/users.service';
import { BehaviorSubject, distinctUntilChanged, Observable, switchMap, tap } from 'rxjs';
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
  allGames$: Observable<Game[]>;
  gamesVisible$ = new BehaviorSubject<Game[]>([]);

  isAllGamesPage: boolean;
  isUserAdmin: boolean;

  userGameList: number[] = [];
  userFavGamesList: number[] = [];
  userGames$: Observable<Game[]>;

  constructor(private gameService: GamesService,
    private userService: UsersService,
    private router: Router) { }

  ngOnInit(): void {
    // todo make it visiable on single page?
    this.isAllGamesPage = !this.router.url.includes('/user');
    this.setGameList();
  }

  userHasGame(gameId: number): boolean {
    return this.userGameList.some(id => id === gameId);
  }

  userHasGameInFavList(gameId: number): boolean {
    return this.userFavGamesList.some(id => id === gameId);
  }

  assignGame(gameId: number) {
    this.userService.getMyData().pipe(
      switchMap((userData: User) => this.gameService.assignGameToUser({ userId: userData.id, gameId }))).
      subscribe(() => {
        this.refreshPage();
       });
  }

  unassignGame(gameId: number) {
    this.userService.getMyData().pipe(
      switchMap((userData: User) => this.gameService.unassignGameToUser({ userId: userData.id, gameId })),
      switchMap(()=>this.userService.getUserOwnedGames()))
      .subscribe((userGames: Game[]) => {
        // wrong but temporary solutio
        this.gamesVisible$.next(userGames);
        this.userGameList = userGames.map(game => game.id);
      });
  }

  removeGameFromFav(gameId: number) {
    this.userService.getMyData().pipe(
      switchMap((userData: User) => this.gameService.removeGameFromFav({ userId: userData.id, gameId }))).
      subscribe(() => {
        this.refreshPage();
       });
  }

  addGameToFav(gameId: number) {
    this.userService.getMyData().pipe(
      switchMap((userData: User) => this.gameService.addGameToFav({ userId: userData.id, gameId }))).
      subscribe(() => {
        this.refreshPage();
      });
  }

  deleteGame(id: number): void {
    if (this.isAllGamesPage && this.isUserAdmin && confirm('Are you sure you want to delete this game?')) {
      this.gameService.deleteGame(id).subscribe(() => {
        this.refreshPage();
      });
    }
  }

  showAllGames() {
    this.allGames$.subscribe(res=>{
      this.gamesVisible$.next(res);
      this.isAllGamesPage=true;
    });
    // this.router.navigateByUrl('/games');
  }

  showMyGames() {
    // this.gamesVisible$ = this.userGames$;
    this.userGames$.pipe(distinctUntilChanged()).subscribe(res=>{
      this.gamesVisible$.next(res);
      this.isAllGamesPage=false;
    });
    // this.userService.getMyData().subscribe(data => {
    //   this.router.navigateByUrl('/games/user/' + data.id);
    // })

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
    this.userGames$ = this.userService.getUserOwnedGames().pipe(tap((userGames: Game[]) => {
      this.userGameList = userGames.map(game => game.id);
    }));
    this.userService.getUserFavGames().subscribe(res=>{
      this.userFavGamesList = res.map(game=>game.id);
    });
    this.allGames$ = this.gameService.getGames();
  }
}
