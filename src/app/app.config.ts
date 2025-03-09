import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

const EUROPEAN_DATE_FORMATS = {
  parse: {
    dateInput: 'dd/MM/yyyy',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'dd/MM/yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideHttpClient(),
  provideNativeDateAdapter(),
  { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  { provide: MAT_DATE_FORMATS, useValue: EUROPEAN_DATE_FORMATS },
  provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync()]
};
export const prefix = 'http://localhost:3000';
export const API_URL = {
  EVENTS: `${prefix}/events`,
  GAMES: `${prefix}/games`,
  USERS: `${prefix}/users`,
  SPOTS: `${prefix}/spots`,
}