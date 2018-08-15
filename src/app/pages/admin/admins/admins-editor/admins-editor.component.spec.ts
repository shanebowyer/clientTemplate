import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsEditorComponent } from './admins-editor.component';

describe('AdminsEditorComponent', () => {
  let component: AdminsEditorComponent;
  let fixture: ComponentFixture<AdminsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
