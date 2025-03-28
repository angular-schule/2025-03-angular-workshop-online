import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-books-entry',
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './books-entry.component.html',
  styleUrl: './books-entry.component.scss'
})
export class BooksEntryComponent {

}
