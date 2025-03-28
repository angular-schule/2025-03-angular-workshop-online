import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BookDetailsComponent } from "./book-details/book-details.component";
import { BookSearchComponent } from "./book-search/book-search.component";
import { BookCreateComponent } from "./book-create/book-create.component";
import { BooksEntryComponent } from "./books-entry/books-entry.component";

export const booksRoutes: Routes = [
  {
    // BooksEntry wird im Haupt-Outlet angezeigt
    path: 'books',
    component: BooksEntryComponent,
    children: [
      // diese Routen werden im Outlet der BooksEntry-Komponente angezeigt
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
      { path: 'search', component: BookSearchComponent, title: 'Suche' },
      { path: 'create', component: BookCreateComponent, title: 'Buch erstellen' },
      { path: ':isbn', component: BookDetailsComponent, title: 'Details' },
    ]
  }
];
