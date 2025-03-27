import { Routes } from '@angular/router';
import { booksRoutes } from './books/books.routes';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  // bei Weiterleitung von leerem Pfad (fast) immer pathMatch:full nötig
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  ...booksRoutes,
  // Wildcard-Route: immer ganz unten!
  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];
