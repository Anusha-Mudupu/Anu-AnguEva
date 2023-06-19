import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QCDoneActionComponent } from './qc-done-action.component';

describe('QCDoneActionComponent', () => {
  let component: QCDoneActionComponent;
  let fixture: ComponentFixture<QCDoneActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QCDoneActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QCDoneActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
