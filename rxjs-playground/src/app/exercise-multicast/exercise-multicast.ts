import { Component, OnDestroy, inject, signal } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Subject, BehaviorSubject, ReplaySubject, Observable, share, takeUntil, timer, shareReplay } from 'rxjs';

import { MeasureValuesService } from './measure-values.service';
import { HistoryWindow } from '../shared/history-window/history-window';

@Component({
  templateUrl: './exercise-multicast.ng.html',
  imports: [HistoryWindow, AsyncPipe, DecimalPipe]
})
export class ExerciseMulticast implements OnDestroy {

  #mvs = inject(MeasureValuesService);

  readonly listeners = signal<number[]>([]);
  logStream$ = new ReplaySubject<string>();
  #destroy$ = new Subject<void>();
  #listenerId = 1;

  measureValues$: Observable<number>;

  constructor() {
    /**************!!**************/

    this.measureValues$ = this.#mvs.getValues().pipe(share());

    /*this.measureValues$ = this.#mvs.getValues().pipe(share({
      connector: () => new ReplaySubject(1)
    }));*/

    /*this.measureValues$ = this.#mvs.getValues().pipe(shareReplay({
      refCount: true,
      bufferSize: 1
    }));*/

    // this.measureValues$ = new BehaviorSubject(0);
    // this.measureValues$ = new ReplaySubject(5);
    // this.#mvs.getValues().subscribe(this.measureValues$);



    /**************!!**************/

  }

  addListener() {
    this.listeners.update(listeners => [...listeners, this.#listenerId++]);
  }

  addConsoleListener() {
    const index = this.#listenerId++;
    this.measureValues$.pipe(takeUntil(this.#destroy$)).subscribe(e => this.logStream$.next(`Listener #${index}: ${e}`));
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
  }

}
