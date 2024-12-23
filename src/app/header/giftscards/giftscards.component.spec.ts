import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GiftscardsComponent } from './giftscards.component';

describe('GiftscardsComponent', () => {
  let component: GiftscardsComponent;
  let fixture: ComponentFixture<GiftscardsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftscardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftscardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
