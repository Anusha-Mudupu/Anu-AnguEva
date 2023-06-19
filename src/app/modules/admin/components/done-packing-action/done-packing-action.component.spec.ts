import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonePackingActionComponent } from './done-packing-action.component';

describe('DonePackingActionComponent', () => {
  let component: DonePackingActionComponent;
  let fixture: ComponentFixture<DonePackingActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonePackingActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonePackingActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
