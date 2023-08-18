import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffVerificationComponent } from './staff-verification.component';

describe('StaffVerificationComponent', () => {
  let component: StaffVerificationComponent;
  let fixture: ComponentFixture<StaffVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
