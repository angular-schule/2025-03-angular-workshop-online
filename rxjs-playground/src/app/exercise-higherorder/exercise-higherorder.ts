import { Component, inject } from '@angular/core';
import { Subject, ReplaySubject, Observable, map, mergeAll, mergeMap, concatMap, switchMap, exhaustMap, OperatorFunction } from 'rxjs';

import { HistoryWindow } from '../shared/history-window/history-window';
import { EchoService } from './echo.service';

@Component({
  templateUrl: './exercise-higherorder.ng.html',
  imports: [HistoryWindow]
})
export class ExerciseHigherorder {

  logStream$ = new ReplaySubject<string>();
  #es = inject(EchoService);

  source$ = new Subject<string>();
  result$: Observable<string>;

  constructor() {

    /**
     * Löse für jedes Tier-Event im source$-Stream ein Echo aus.
     * Die Methode `this.es.echo()` gibt ein Observable zurück, das Echos produziert.
     * Probiere aus, wie sich concatMap, mergeMap, switchMap und exhaustMap unterschiedlich verhalten.
     *
     * Quelle: this.source$
     * Ziel:   this.result$
     * Echo:   this.es.echo(message)
     */

    /**************!!**************/

    // EXKURS: eigener Log-Operator
    const log = function<T>() {
      return (source: Observable<T>) => {
        return new Observable<T>(sub => {
          // sub.next('X' as T);
          source.subscribe(e => {
            console.log(e);
            sub.next(e)
          });
        });
      }
    }


    this.result$ = this.source$.pipe(
      log(),
      exhaustMap(tier => this.#es.echo(tier)),
    );

    /**************!!**************/

    this.source$.subscribe(value => this.logStream$.next(`📣 SOURCE: ${value}`));
    this.result$.subscribe(value => this.logStream$.next(`🚀 RESULT: ${value}`));
  }

  echoTest() {
    this.#es.echo('TEST').subscribe(value => this.logStream$.next(value));
  }

  sendValue(value: string) {
    this.source$.next(value);
  }

}
