import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideHttpClient(),
  provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync()]
};
export const prefix = 'http://localhost:3000';
export const API_URL = {
  EVENTS: `${prefix}/events`,
  GAMES: `${prefix}/games`,
  USERS: `${prefix}/users`,
  SPOTS: `${prefix}/spots`,
}