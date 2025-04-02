import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of, timer } from 'rxjs';
import { BookActions } from './book.actions';
import { BookStoreService } from '../shared/book-store.service';


@Injectable()
export class BookEffects {

  actions$ = inject(Actions);
  #bs = inject(BookStoreService);

  /*test$ = createEffect(() => {
    return timer(0, 1000).pipe(
      map(i => {
        return { type: 'INTERVAL', i }
      })
    );
  });*/

  #loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.loadBooks),
      concatMap(() => this.#bs.getAll().pipe(
        map(books => BookActions.loadBooksSuccess({ data: books })),
        catchError(err => of(BookActions.loadBooksFailure({ error: err.message })))
      ))
    )
  });

  // Buchliste laden
  // - wenn Action loadBooks() kommt, dann
  // - HTTP-Request mit BookStoreService.getAll()
  // - bei Erfolg: erzeuge Action loadBooksSuccess({ data: books })
  // - bei Fehler: erzeuge Action loadBooksFailure({ error: string })

}
