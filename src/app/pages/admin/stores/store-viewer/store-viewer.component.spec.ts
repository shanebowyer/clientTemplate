import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreViewerComponent } from './store-viewer.component';

describe('StoreViewerComponent', () => {
  let component: StoreViewerComponent;
  let fixture: ComponentFixture<StoreViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
