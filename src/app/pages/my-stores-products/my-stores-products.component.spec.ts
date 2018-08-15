import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStoresProductsComponent } from './my-stores-products.component';

describe('MyStoresProductsComponent', () => {
  let component: MyStoresProductsComponent;
  let fixture: ComponentFixture<MyStoresProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStoresProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStoresProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
