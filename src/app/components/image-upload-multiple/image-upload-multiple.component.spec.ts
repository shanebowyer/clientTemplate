import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadMultipleComponent } from './image-upload-multiple.component';

describe('ImageUploadMultipleComponent', () => {
  let component: ImageUploadMultipleComponent;
  let fixture: ComponentFixture<ImageUploadMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUploadMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
