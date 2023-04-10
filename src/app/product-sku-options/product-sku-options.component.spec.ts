import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSkuOptionsComponent } from './product-sku-options.component';

describe('ProductSkuOptionsComponent', () => {
  let component: ProductSkuOptionsComponent;
  let fixture: ComponentFixture<ProductSkuOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSkuOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSkuOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
