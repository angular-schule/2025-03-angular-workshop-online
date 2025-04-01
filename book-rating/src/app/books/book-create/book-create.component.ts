import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


export const isbnPrefix: ValidatorFn = function (control) {
  if (!control.value.startsWith('978') && control.value.length >= 3) {
    return { isbnprefix: true };
  } else {
    return null;
  }
}

export function prefixValidator(prefix: string): ValidatorFn {
  return function (control) {
    if (!control.value.startsWith(prefix) && control.value.length >= 3) {
      return { isbnprefix: true };
    } else {
      return null;
    }
  }
}


export const isbnValidator = Validators.compose([
  Validators.required,
  Validators.minLength(10),
  Validators.maxLength(13),
  Validators.pattern(/^[0-9]*$/),
  isbnPrefix,
  // prefixValidator('978')
])!;

@Component({
  selector: 'app-book-create',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss'
})
export class BookCreateComponent {
  #bs = inject(BookStoreService);
  #router = inject(Router);

  bookForm = new FormGroup({
    isbn: new FormControl('', {
      nonNullable: true,
      validators: [isbnValidator]
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

  hasError(control: AbstractControl, errorCode: string) {
    return control.hasError(errorCode) && control.touched;
  }

  submitForm() {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const newBook: Book = {
      ...this.bookForm.getRawValue(),
      authors: [] // TODO
    };

    this.#bs.create(newBook).subscribe({
      next: receivedBook => {
        this.#router.navigate(['/books', receivedBook.isbn]);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        if (err.status === 409) {
          this.bookForm.controls.isbn.setErrors({ isbnexists: true })
        }
      }
    });
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
