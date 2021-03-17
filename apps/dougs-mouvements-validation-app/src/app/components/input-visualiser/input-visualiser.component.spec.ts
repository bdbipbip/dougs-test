import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputVisualiserComponent } from './input-visualiser.component';

describe('InputVisualiserComponent', () => {
  let component: InputVisualiserComponent;
  let fixture: ComponentFixture<InputVisualiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputVisualiserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputVisualiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
