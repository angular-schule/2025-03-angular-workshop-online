import { Component, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookComponent } from "../book/book.component";
import { BookRatingService } from '../shared/book-rating.service';

@Component({
  selector: 'app-dashboard',
  imports: [BookComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  readonly books = signal<Book[]>([]);
  readonly counter = signal(0);

  #rs = inject(BookRatingService);

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

  doRateUp(book: Book) {
    const ratedBook = this.#rs.rateUp(book);
    this.#updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.#rs.rateDown(book);
    this.#updateList(ratedBook);
  }

  #updateList(ratedBook: Book) {
    this.books.update(currentList => {
      /*const index = findIndex(ratedBook, this.books());
      const part1 = this.books().slice(0, index);
      const part2 = this.books().slice(index + 1);
      return [...part1, ratedBook, ...part2]*/

      // [1,2,3,4,5].map(e => e * 10) // [10, 20, 30, 40, 50]
      // [1,2,3,4,5,6,7,8,9].filter(e => e > 5) // [6, 7, 8, 9]

      return currentList.map(b => {
        if (b.isbn === ratedBook.isbn) {
          return ratedBook;
        } else {
          return b;
        }
      });
    });
  }
}
