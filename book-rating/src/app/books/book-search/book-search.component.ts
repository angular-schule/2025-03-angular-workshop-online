import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, delay, filter, switchMap, tap } from 'rxjs';
import { BookStoreService } from '../shared/book-store.service';
import { toSignal } from '@angular/core/rxjs-interop';

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

  readonly results = toSignal(this.searchControl.valueChanges.pipe(
    debounceTime(200),
    filter(term => term.length >= 3),
    tap(() => this.loading.set(true)),
    switchMap(term => this.#bs.search(term).pipe(delay(1000))),
    tap(() => this.loading.set(false)),
  ), { initialValue: [] });
}
