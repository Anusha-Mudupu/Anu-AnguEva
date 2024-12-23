import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InvestorsComponent } from './investors.component';

describe('InvestorsComponent', () => {
  let component: InvestorsComponent;
  let fixture: ComponentFixture<InvestorsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
