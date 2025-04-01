import { DatePipe } from '@angular/common';
import { Component, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-home-page',
  imports: [DatePipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnDestroy {
  readonly currentDate = signal(Date.now());

  #interval = setInterval(() => {
    this.currentDate.set(Date.now());
    console.log(this.currentDate());
  }, 1000);

  ngOnDestroy() {
    clearInterval(this.#interval);
  }
}
