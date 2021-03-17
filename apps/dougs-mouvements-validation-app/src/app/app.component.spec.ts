import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {ButtonsModule} from "ngx-bootstrap/buttons";
import {Component, Input} from "@angular/core";
import {Checkpoint, RequestBody, ValidationResponse} from "@dougs-test/movements-validation-lib";
import {MouvementsValidationService} from "./services/mouvements-validation.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {combineAll} from "rxjs/operators";
import {MINIMUM_BODY, VALID_BODY, WRONG_BODY} from "./constants/inputs.const";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  // @ts-ignore
  @Component({
    selector: 'dougs-mouvements-validation-app-input-visualiser',
    template: '',
  })
  class MockComponent1 {
    @Input() customBody: RequestBody;
  }

  // @ts-ignore
  @Component({
    selector: 'dougs-mouvements-validation-app-validation-visualiser',
    template: '',
  })
  class MockComponent2 {
    @Input() validationResponse: ValidationResponse;
    @Input() responseType: string;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, MockComponent1, MockComponent2],
      imports: [ButtonsModule.forRoot(), HttpClientModule],
      providers: [MouvementsValidationService, HttpClient],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.customBody = {
      operations: [],
      checkpoints: [{} as Checkpoint, {} as Checkpoint]
    }
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should reset', () => {
    component.reset();
    expect(component.validationResponse).toBe(null);
    expect(component.currentRequestedType).toBe(null);
  });

  it('should send request mini', async () => {
    spyOn(component['mouvementsValidationService'], 'sendHttpRequest');
    await component.sendRequest('MINI');
    expect(component['mouvementsValidationService'].sendHttpRequest).toHaveBeenCalledWith(MINIMUM_BODY);
  });

  it('should send request valid', async () => {
    spyOn(component['mouvementsValidationService'], 'sendHttpRequest');
    await component.sendRequest('VALID');
    expect(component['mouvementsValidationService'].sendHttpRequest).toHaveBeenCalledWith(VALID_BODY);
  });

  it('should send request custom', async () => {
    spyOn(component['mouvementsValidationService'], 'sendHttpRequest');
    await component.sendRequest('CUSTOM');
    expect(component['mouvementsValidationService'].sendHttpRequest).toHaveBeenCalledWith(component.customBody);
  });

  it('should send request wrong', async () => {
    spyOn(component['mouvementsValidationService'], 'sendHttpRequest');
    await component.sendRequest('WRONG');
    expect(component['mouvementsValidationService'].sendHttpRequest).toHaveBeenCalledWith(WRONG_BODY);
  });

  it('should get custom body invalid', () => {
    expect(component.isCustomBodyValid).toBeTruthy();
  });

  it('should get custom body invalid branch no checkpoints', () => {
    component.customBody = null;
    expect(component.isCustomBodyValid).toBeFalsy();
  })

  it('should get custom body invalid branch no length', () => {
    component.customBody.checkpoints = null;
    expect(component.isCustomBodyValid).toBeFalsy();
  });
});
