import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationVisualiserComponent } from './validation-visualiser.component';

describe('ValidationVisualiserComponent', () => {
  let component: ValidationVisualiserComponent;
  let fixture: ComponentFixture<ValidationVisualiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationVisualiserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationVisualiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
