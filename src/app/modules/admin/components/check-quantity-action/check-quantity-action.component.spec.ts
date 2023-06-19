import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckQuantityActionComponent } from './check-quantity-action.component';

describe('CheckQuantityActionComponent', () => {
  let component: CheckQuantityActionComponent;
  let fixture: ComponentFixture<CheckQuantityActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckQuantityActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckQuantityActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
