import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartFillingActionComponent } from './start-filling-action.component';

describe('StartFillingActionComponent', () => {
  let component: StartFillingActionComponent;
  let fixture: ComponentFixture<StartFillingActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartFillingActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartFillingActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
