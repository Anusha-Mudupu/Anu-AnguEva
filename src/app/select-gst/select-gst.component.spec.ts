import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGstComponent } from './select-gst.component';

describe('SelectGstComponent', () => {
  let component: SelectGstComponent;
  let fixture: ComponentFixture<SelectGstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectGstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectGstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
