import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputVisualiserComponent } from './input-visualiser.component';
import {ButtonsModule} from "ngx-bootstrap/buttons";
import {FormsModule} from "@angular/forms";
import {VALID_BODY} from "../../constants/inputs.const";

describe('InputVisualiserComponent', () => {
  let component: InputVisualiserComponent;
  let fixture: ComponentFixture<InputVisualiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputVisualiserComponent ],
      imports: [ButtonsModule.forRoot(), FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputVisualiserComponent);
    component = fixture.componentInstance;
    component.customBody = VALID_BODY;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get customBody valid', () => {
    expect(component.customBodyIsValid).toBeTruthy();
  });

  it('should get customBody valid branch no cp', () => {
    component.customBody = null;
    expect(component.customBodyIsValid).toBeFalsy();
  });

  it('should get customBody valid branch no length', () => {
    component.customBody.checkpoints = null;
    expect(component.customBodyIsValid).toBeFalsy();
  });
});
