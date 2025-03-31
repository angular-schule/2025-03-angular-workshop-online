import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-create',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss'
})
export class BookCreateComponent {
  bookForm = new FormGroup({
    isbn: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        Validators.pattern(/^[0-9]*$/)
      ]
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(100)
      ]
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: []
    }),
    rating: new FormControl(1, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ]
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(0)
      ]
    })
  });

  isInvalid(control: AbstractControl) {
    return control.invalid && control.touched;
  }

  // AUFGABE
  hasError(control: AbstractControl, errorCode: string) {
    return control.hasError(errorCode) && control.touched;
  }
}

/*
TODO
- Validierung
- Meldungen anzeigen
  - "Die ISBN ist ungültig."
  - "Die ISBN ist zu kurz."
- Formular abschicken
- Buch erzeugen
- HTTP zum Server schicken
- bei Erfolg:
  - wegnavigieren, z.B. zum Dashboard oder Detailseite
  - Formular zurücksetzen
  - Erfolgsmeldung

*/
