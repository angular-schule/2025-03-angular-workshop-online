import { Component, inject, input, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { filter, map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book-details',
  imports: [RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  #route = inject(ActivatedRoute);
  #bs = inject(BookStoreService);

  readonly book = toSignal(this.#route.paramMap.pipe(
    map(params => params.get('isbn')),
    filter(isbn => isbn !== null),
    switchMap(isbn => this.#bs.getSingle(isbn))
  ));
}
