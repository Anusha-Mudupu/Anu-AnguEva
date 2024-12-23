/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FavoriteItemComponent } from './favorite-item.component';

describe('FavoriteItemComponent', () => {
  let component: FavoriteItemComponent;
  let fixture: ComponentFixture<FavoriteItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
