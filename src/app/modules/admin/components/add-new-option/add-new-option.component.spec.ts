import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewOptionComponent } from './add-new-option.component';

describe('AddNewOptionComponent', () => {
  let component: AddNewOptionComponent;
  let fixture: ComponentFixture<AddNewOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
