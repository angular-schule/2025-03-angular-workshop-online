import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {

    const ratingMock = {
      rateUp: (b: Book) => b,
      rateDown: (b: Book) => b,
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        // Abhängigkeit ersetzen:
        // Wenn BRS angefordert wird, wird stattdessen der ratingMock ausgeliefert
        { provide: BookRatingService, useValue: ratingMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    // TS-Klasseninstanz
    component = fixture.componentInstance;

    // DOM-Element
    // fixture.nativeElement

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp for component.doRateUp', () => {
    // ARRANGE
    // Testbuch
    const testBook: Book = { isbn: '1234' } as Book;

    // Service holen (das ist eigentlich unser ratingMock)
    const service = TestBed.inject(BookRatingService);

    // spyOn(service, 'rateUp').and.returnValue(testBook);
    // spyOn(service, 'rateUp').and.callFake(b => b);
    // Service überwachen
    // aber die originale Methode wird trotzdem verwendet
    spyOn(service, 'rateUp').and.callThrough();

    // ACT
    component.doRateUp(testBook);

    // ASSERT
    // prüfen, ob Methode rateUp aufgerufen wurde
    // expect(service.rateUp).toHaveBeenCalled();
    expect(service.rateUp).toHaveBeenCalledOnceWith(testBook);
  });
});
