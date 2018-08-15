import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsViewerComponent } from './admins-viewer.component';

describe('AdminsViewerComponent', () => {
  let component: AdminsViewerComponent;
  let fixture: ComponentFixture<AdminsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
