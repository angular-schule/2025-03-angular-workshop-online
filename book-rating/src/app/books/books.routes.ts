import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BookDetailsComponent } from "./book-details/book-details.component";
import { BookSearchComponent } from "./book-search/book-search.component";
import { BookCreateComponent } from "./book-create/book-create.component";

export const booksRoutes: Routes = [
  { path: 'books', component: DashboardComponent, title: 'Dashboard' },
  { path: 'books/search', component: BookSearchComponent, title: 'Suche' },
  { path: 'books/create', component: BookCreateComponent, title: 'Buch erstellen' },
  { path: 'books/:isbn', component: BookDetailsComponent, title: 'Details' },
];
