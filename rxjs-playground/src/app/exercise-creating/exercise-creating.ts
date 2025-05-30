import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, Subscriber } from 'rxjs';

import { HistoryWindow } from '../shared/history-window/history-window';

@Component({
  templateUrl: './exercise-creating.ng.html',
  imports: [HistoryWindow]
})
export class ExerciseCreating {

  logStream$ = new ReplaySubject<unknown>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/

    // of('Kiel', 'Stuttgart', 'München', 'Leipzig')
    // from([1,2,3,4,5])
    // interval(1000)       // ---0---1---2---3---4---5 ...
    // timer(3000)          // ---------0|
    // timer(3000, 1000)    // ---------0---1---2---3---4---5 ...
    // timer(0, 1000)       // 0---1---2---3---4---5 ...

    /*timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0)
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    })*/


   /******************************/

    const myPromise = new Promise((resolve, reject) => {
      console.log('PROMISE')
      setTimeout(() => {
        console.log('TIMEOUT');
        resolve('RESOLVED!')
      }, 2000);
    });

    setTimeout(() => {
      console.log('THEN');
      myPromise.then(e => console.log('A', e));
    }, 5000)

    setTimeout(() => {
      console.log('THEN 2');
      myPromise.then(e => console.log('B', e));
    }, 8000)


    /******************************/

    // Producer: generiert die Daten
    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);
      sub.next(10);
      sub.next(20);

      setTimeout(() => sub.next(200), 2000)
      const timer = setTimeout(() => {
        sub.next(500);
        console.log('LOG 500');
      }, 5000)
      setTimeout(() => sub.complete(), 10000)

      // Teardown Logic: wird ausgeführt, wenn von außen unsubscribt wird
      return () => {
        console.log('TEARDOWN');
        clearTimeout(timer);
      };
    }

    // Observer: empfängt die Daten, die vom Producer generiert werden
    const obs = {
      next: (e: number) => this.log('NEXT: ' + e),
      error: (err: string) => this.log('ERROR: ' + err),
      complete: () => this.log('FERTIG')
    };

    // producer(obs);

    // Observable: Schnittstelle zwischen Producer und Observer
    const myObs$ = new Observable(producer);
    const myObs2$ = new Observable<string>(sub => {
      sub.next('Hallo Welt');
      sub.complete();

      // Teardown Logic
      return () => {};
    })

    // Subscription: Vertrag zwischen Observer und Observable
    // const sub = myObs$.subscribe(obs);

    /*setTimeout(() => {
      sub.unsubscribe();
      console.log('UNSUBSCRIBE');
    }, 2000)*/


    /******************************/
  }

  log(msg: unknown) {
    this.logStream$.next(msg);
  }

}
