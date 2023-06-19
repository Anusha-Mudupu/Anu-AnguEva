import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPackingActionComponent } from './start-packing-action.component';

describe('StartPackingActionComponent', () => {
  let component: StartPackingActionComponent;
  let fixture: ComponentFixture<StartPackingActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartPackingActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartPackingActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
