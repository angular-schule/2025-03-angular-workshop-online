import { Component, signal } from '@angular/core';
import { Subject, ReplaySubject, scan, reduce, of } from 'rxjs';

import { HistoryWindow } from '../shared/history-window/history-window';

@Component({
  templateUrl: './exercise-gamescore.ng.html',
  imports: [HistoryWindow]
})
export class ExerciseGamescore {

  logStream$ = new ReplaySubject<unknown>();
  readonly score$ = new Subject<number>();

  readonly currentScore = signal(0);
  readonly finalScore = signal<number | undefined>(undefined);

  constructor() {
    /**
     * Wir entwickeln ein spannendes Browser-Spiel!
     * Jetzt fehlt nur noch der Code, um den Punktestand zu ermitteln ...
     */

    /******************************/

    this.score$.pipe(
      scan((acc, value) => acc + value, 0)
    ).subscribe(score => {
      this.currentScore.set(score);
    });

    this.score$.pipe(
      reduce((acc, value) => acc + value, 0)
    ).subscribe(score => {
      this.finalScore.set(score);
    });



    /******************************/

    of(
      'SETCITYLEIPZIG',
      'SETCITYHAM',
      'SETFRANG',
      'SETCITYKIEL',
      'SETNAMEF',
      'SETFRVUE',
      'HGJKHIUOZUIHLKJUUIGZH'
    ).pipe(
      scan((acc, msg) => {
        switch (msg) {
          case 'SETCITYLEIPZIG': return { ...acc, city: 'Leipzig' };
          case 'SETCITYHAM': return { ...acc, city: 'Hamburg' };
          case 'SETCITYKIEL': return { ...acc, city: 'Kiel' };
          case 'SETCITYFRA': return { ...acc, city: 'Frankfurt' };
          case 'SETNAMEF': return { ...acc, name: 'Ferdinand', city: 'Leipzig' };
          case 'SETFRANG': return { ...acc, framework: 'Angular' };
          default: return acc;
        }
      }, {})
    ).subscribe(e => console.log(e))

    /******************************/

    this.score$.subscribe({
      next: e => this.logStream$.next(e),
      complete: () => this.logStream$.next('✅ COMPLETE')
    });
  }

  finishGame() {
    this.score$.complete();
  }

  addScore(amount: number) {
    this.score$.next(amount);
  }

}
