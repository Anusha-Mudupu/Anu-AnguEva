import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckQualityActionComponent } from './check-quality-action.component';

describe('CheckQuantityActionComponent', () => {
  let component: CheckQualityActionComponent;
  let fixture: ComponentFixture<CheckQualityActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckQualityActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckQualityActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
