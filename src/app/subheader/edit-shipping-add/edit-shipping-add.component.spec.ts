import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditShippingAddComponent } from './edit-shipping-add.component';

describe('EditShippingAddComponent', () => {
  let component: EditShippingAddComponent;
  let fixture: ComponentFixture<EditShippingAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditShippingAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShippingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
