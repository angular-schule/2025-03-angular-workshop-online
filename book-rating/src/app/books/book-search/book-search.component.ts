import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, delay, filter, map, merge, of, partition, switchMap, tap } from 'rxjs';
import { BookStoreService } from '../shared/book-store.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book-search',
  imports: [ReactiveFormsModule],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.scss'
})
export class BookSearchComponent {
  #bs = inject(BookStoreService);
  searchControl = new FormControl('', { nonNullable: true });

  readonly loading = signal(false);

  readonly resultsX = toSignal(this.searchControl.valueChanges.pipe(
    debounceTime(200),
    tap(() => this.loading.set(true)),
    switchMap(term => {
      if (term.length >= 3) {
        return this.#bs.search(term).pipe(delay(1000));
      } else {
        return of([])
      }
    }),
    tap(() => this.loading.set(false)),
  ), { initialValue: [] });


  #parts = partition(
    this.searchControl.valueChanges.pipe(debounceTime(200)),
    term => term.length >= 3
  );

  readonly results = toSignal(
    merge(
      this.#parts[0].pipe(
        tap(() => this.loading.set(true)),
        switchMap(term => this.#bs.search(term).pipe(delay(1000))),
        tap(() => this.loading.set(false)),
      ),
      this.#parts[1].pipe(
        map(() => [] as Book[])
      )
    ),
    { initialValue: [] }
  );
}
