import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CorporategiftingComponent } from './corporategifting.component';

describe('CorporategiftingComponent', () => {
  let component: CorporategiftingComponent;
  let fixture: ComponentFixture<CorporategiftingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporategiftingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporategiftingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
