import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GamesService } from './games.service';
import { GamesListComponent } from './games-list/games-list.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { GameFormComponent } from './game-form/game-form.component';
import { RouterModule, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
  { path: '', component: GamesListComponent }, // List games
  { path: 'add', component: GameFormComponent }, // Create new game 
  // todo process of adding game
  { path: 'edit/:id', component: GameFormComponent }, // Edit existing game
  { path: 'single/:id', component: GameDetailComponent }, // View game details
  { path: 'user/:id', component: GamesListComponent } // users games
];

@NgModule({
  declarations: [GamesListComponent, GameDetailComponent, GameFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  providers: [GamesService, provideHttpClient()]
})
export class GamesModule { }
