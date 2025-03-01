import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { GamesModule } from './games/games.module';
import { HeaderComponent } from './header/header.component';
import { SpotsModule } from './spots/spots.module';
import { UsersModule } from './users/users.module';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // HeaderModule,
    // DashboardModule,
    // GamesModule,
    // MatButtonModule,
    // MatTableModule,
    // SpotsModule,
    // UsersModule,
  ],
})
export class AppModule { }

