import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book } from './book';
import { Observable, of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  #http = inject(HttpClient);
  #apiUrl = 'https://api.angular.schule';

  #books$?: Observable<Book[]>;

  getAll(): Observable<Book[]> {
    return this.#http.get<Book[]>(this.#apiUrl + '/books');
  }

  getAllCached(): Observable<Book[]> {
    if (!this.#books$) {
      this.#books$ = this.getAll().pipe(shareReplay(1));
    }

    return this.#books$;
  }

  invalidateCache() {
    this.#books$ = undefined;
  }

  /*getAllResource() {
    return httpResource<Book[]>(this.#apiUrl + '/books', { defaultValue: [] })
  }*/

  getSingle(isbn: string): Observable<Book> {
    return this.#http.get<Book>(`${this.#apiUrl}/books/${isbn}`);
  }

  create(book: Book): Observable<Book> {
    return this.#http.post<Book>(this.#apiUrl + '/books', book);
  }

  search(term: string) {
    /*if (term.length === 0) {
      return of([]);
    }*/
    return this.#http.get<Book[]>(this.#apiUrl + '/books/search/' + term);
    // return this.#http.get<Book[]>(`${this.#apiUrl}/books/search/${term}`);
  }

  delete(isbn: string): Observable<unknown> {
    return this.#http.delete<unknown>(`${this.#apiUrl}/books/${isbn}`);
  }
}
