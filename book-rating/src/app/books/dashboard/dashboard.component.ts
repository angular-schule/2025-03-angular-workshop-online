import { Component, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookComponent } from "../book/book.component";

@Component({
  selector: 'app-dashboard',
  imports: [BookComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  readonly books = signal<Book[]>([]);

  constructor() {
    this.books.set([
      {
        isbn: '123',
        title: 'Angular',
        description: 'Grundlagen und mehr',
        rating: 5,
        price: 42.9
      },
      {
        isbn: '456',
        title: 'Vue.js',
        description: 'Das grüne Framework',
        rating: 3,
        price: 36.9
      }
    ]);
  }
}

/*
TODO
- Datenmodell
- Speicherort
- Daten
- Anzeige
*/

