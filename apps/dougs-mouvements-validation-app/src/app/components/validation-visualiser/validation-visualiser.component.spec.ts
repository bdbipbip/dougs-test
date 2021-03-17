import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationVisualiserComponent } from './validation-visualiser.component';
import {ValidationResponse} from "@dougs-test/movements-validation-lib";

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
    component.validationResponse = {
      isValid: false,
      message: `I'm a teapot !`,
      reasons: [{
        type: 'WRONG_BALANCE',
        message: 'Opérations manquantes, balance incorrecte',
        missingOperations: {
          startDate: '10/03/2021',
          endDate: '12/03/2021',
          difference: -20,
        }
      }, {
        type: 'DUPLICATED_OPERATION',
        message: 'Opération dupliquée',
        duplicatedOperation: {
          date: '12/03/2021',
          id: 'id1',
          amount: 40,
        },
      }]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get show wrong balance', () => {
    expect(component.showWrongBalance).toBeTruthy();
  });

  it('should get show duplicated', () => {
    expect(component.showDuplicatedOperations).toBeTruthy();
  });
});
