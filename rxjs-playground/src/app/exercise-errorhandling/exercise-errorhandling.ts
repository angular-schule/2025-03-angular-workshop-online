import { Component, inject } from '@angular/core';
import { ReplaySubject, throwError, of, EMPTY, retry, catchError, interval, mergeMap } from 'rxjs';

import { HistoryWindow } from '../shared/history-window/history-window';
import { DataService } from './data.service';

@Component({
  templateUrl: './exercise-errorhandling.ng.html',
  imports: [HistoryWindow]
})
export class ExerciseErrorhandling {

  logStream$ = new ReplaySubject<unknown>();
  #ds = inject(DataService);

  /**
   * Das Observable aus `this.ds.getData()` liefert Daten – oder mit hoher Wahrscheinlichkeit einen Fehler.
   * Probiere verschiedene Strategien aus, um den Fehler zu behandeln.
   */

  constructor() {
    interval(1000).pipe(
      mergeMap(() => this.#ds.getData().pipe(
        catchError(() => EMPTY)
      ))
    ).subscribe({
      next: e => this.logStream$.next(e),
      error: err => this.logStream$.next('❌ ERROR: ' + err),
      complete: () => this.logStream$.next('🏁 COMPLETE')
    })
  }

  start() {
    this.#ds.getData().pipe(
      catchError(err => {
        // Fehler verarbeiten
        // …

        // Fehler ignorieren
        // return of();
        // return EMPTY;

        // Fehler weiterwerfen
        // return throwError(() => 'Oh oh ein Fehler!')
        // throw 'Ein Fehler, nein!';
        throw err;

        // Fehler ersetzen
        // return of('Nichts', 'passiert!');
      })
    ).subscribe({
      next: e => this.logStream$.next(e),
      error: err => this.logStream$.next('❌ ERROR: ' + err),
      complete: () => this.logStream$.next('🏁 COMPLETE')
    });
  }
}
