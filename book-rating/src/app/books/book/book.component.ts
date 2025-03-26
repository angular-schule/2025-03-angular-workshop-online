import { Component, input, output } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book',
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  // Input: hier fließen Daten von der Elternkomponente hinein
  // von oben nach unten
  readonly book = input.required<Book>();

  // Output: hier fließen Daten zur Elternkomponente hinaus
  // von unten nach oben
  readonly rateUp = output<Book>();
  readonly rateDown = output<Book>();

  doRateUp() {
    this.rateUp.emit(this.book());
  }

  doRateDown() {
    this.rateDown.emit(this.book());
  }
}
