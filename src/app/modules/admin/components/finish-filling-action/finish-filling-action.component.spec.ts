import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishFillingActionComponent } from './finish-filling-action.component';

describe('FinishFillingActionComponent', () => {
  let component: FinishFillingActionComponent;
  let fixture: ComponentFixture<FinishFillingActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishFillingActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishFillingActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
