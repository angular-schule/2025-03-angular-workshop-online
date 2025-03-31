import { Component, signal } from '@angular/core';
import { fromEvent, map, startWith, debounceTime } from 'rxjs';

@Component({
  templateUrl: './exercise-fromevent.ng.html'
})
export class ExerciseFromevent {

  readonly currentWidth = signal(0);

  constructor() {
    /**
     * Schreibe die jeweils aktuelle Fensterbreite in das Property `this.currentWidth`.
     *
     * Nutze fromEvent, um das resize-Event auf window zu abonnieren.
     * Initialisiere das Observable mit der aktuellen Fensterbreite (`window.innerWidth`).
     * Entprelle den Eventstrom, damit nicht zu viele Events gefeuert werden.
     */

    /******************************/

    fromEvent<{ target: Window }>(window, 'resize').pipe(
      debounceTime(1000),
      // startWith({ target: window }),
      map(e => e.target.innerWidth),
      startWith(window.innerWidth),
    ).subscribe(e => {
      this.currentWidth.set(e);
    })


    /******************************/
  }

}
