import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BookDetailsComponent } from "./book-details/book-details.component";

export const booksRoutes: Routes = [
  { path: 'books', component: DashboardComponent, title: 'Dashboard' },
  { path: 'books/:isbn', component: BookDetailsComponent, title: 'Details' }
];
