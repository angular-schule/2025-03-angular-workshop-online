import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnDestroy, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, startWith, tap, timer } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [DatePipe, AsyncPipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnDestroy {
  readonly currentDate = signal(Date.now());

  readonly myData = toSignal(
    timer(0, 1000).pipe(tap(e => console.log('TAP', e))),
    // { requireSync: true }
  );

  myData$ = timer(0, 1000).pipe(tap(e => console.log(e)));

  #interval = setInterval(() => {
    this.currentDate.set(Date.now());
    console.log(this.currentDate());
  }, 1000);

  ngOnDestroy() {
    clearInterval(this.#interval);
  }


  constructor() {

  }
}
