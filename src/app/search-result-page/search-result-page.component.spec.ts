import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchResultPageComponent } from './search-result-page.component';

describe('SearchResultPageComponent', () => {
  let component: SearchResultPageComponent;
  let fixture: ComponentFixture<SearchResultPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
