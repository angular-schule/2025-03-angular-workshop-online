import { Routes } from '@angular/router';
import { booksRoutes } from './books/books.routes';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  // bei Weiterleitung von leerem Pfad (fast) immer pathMatch:full nötig
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  ...booksRoutes,
  // Wildcard-Route: immer ganz unten!
  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];
