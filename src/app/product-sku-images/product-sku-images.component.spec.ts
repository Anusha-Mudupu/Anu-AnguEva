import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSkuImagesComponent } from './product-sku-images.component';

describe('ProductSkuImagesComponent', () => {
  let component: ProductSkuImagesComponent;
  let fixture: ComponentFixture<ProductSkuImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSkuImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSkuImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
