import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { Navbar } from './navbar/navbar';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  selector: 'rxw-root',
  templateUrl: './app.ng.html',
  styleUrl: './app.scss',
  imports: [Navbar, RouterLink, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  #router = inject(Router);

  readonly isLandingPage = toSignal(
    this.#router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() =>
        this.#router.isActive('/exercises', {
          paths: 'exact',
          matrixParams: 'ignored',
          queryParams: 'ignored',
          fragment: 'ignored',
        })
      )
    )
  );
}
