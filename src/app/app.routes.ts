import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route
    { path: 'dashboard', component: DashboardComponent},
    { path: 'games', loadChildren: ()=> import('./games/games.module').then(m=>m.GamesModule)  },
    { path: 'events', loadChildren: () => import('./events/events.module').then(m => m.EventsModule) },
    { path: 'spots', loadChildren: () => import('./spots/spots.module').then(m => m.SpotsModule) },
    { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
    { path: '**', component: PageNotFoundComponent } // Handle 404 Not Found

];
