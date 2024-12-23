import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DailyDealsComponent } from './daily-deals.component';

describe('DailyDealsComponent', () => {
  let component: DailyDealsComponent;
  let fixture: ComponentFixture<DailyDealsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
