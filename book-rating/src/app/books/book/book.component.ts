import { Component, input } from '@angular/core';
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
}
