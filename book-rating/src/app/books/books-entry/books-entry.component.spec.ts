import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksEntryComponent } from './books-entry.component';

describe('BooksEntryComponent', () => {
  let component: BooksEntryComponent;
  let fixture: ComponentFixture<BooksEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
