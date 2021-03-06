import { TestBed } from '@angular/core/testing';

import { MouvementsValidationService } from './mouvements-validation.service';
import {HttpClient, HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {RequestBody} from "@dougs-test/movements-validation-lib";
import {of} from "rxjs";

describe('MouvementsValidationService', () => {
  let service: MouvementsValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient],
    });
    service = TestBed.inject(MouvementsValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send http request', () => {
    spyOn(service['http'], 'post').and.returnValue(of({}));
    service.sendHttpRequest({} as RequestBody);
    expect(service['http'].post).toHaveBeenCalledWith('http://localhost:3333/api/movements/validation', {});
  })

  it('should throw error', () => {
    spyOn(service['http'], 'post').and.callFake(() => {throw new HttpErrorResponse({status: 418})});
    service.sendHttpRequest({} as RequestBody);
    expect(service['http'].post).toHaveBeenCalledWith('http://localhost:3333/api/movements/validation', {});
  })

  it('should throw error branch', () => {
    spyOn(service['http'], 'post').and.callFake(() => {throw new HttpErrorResponse({status: 419})});
    service.sendHttpRequest({} as RequestBody);
    expect(service['http'].post).toHaveBeenCalledWith('http://localhost:3333/api/movements/validation', {});
  })
});
