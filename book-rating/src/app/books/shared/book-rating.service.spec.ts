import { TestBed } from '@angular/core/testing';

import { BookRatingService } from './book-rating.service';
import { Book } from './book';

describe('BookRatingService', () => {
  let service: BookRatingService;
  let book: Book;

  beforeEach(() => {
    // ARRANGE
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookRatingService);

    book = {
      isbn: '',
      title: '',
      description: '',
      price: 10,
      rating: 3,
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should increment a book rating by one', () => {
    // ARRANGE
    book.rating = 3;

    // ACT
    const ratedBook = service.rateUp(book);

    // ASSERT
    expect(ratedBook.rating).toBe(4); // NICHT: book.rating + 1
  });

  it('should decrement a book rating by one', () => {
    book.rating = 3;
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(2);
  });

  it('should not rate higher than 5', () => {
    book.rating = 5;
    const ratedBook = service.rateUp(book);
    expect(ratedBook.rating).toBe(5);
  });

  it('should not rate lower than 1', () => {
    book.rating = 1;
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(1);
  });
});
