import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Checkpoint, Operation, RequestBody, ValidationResponse} from "@dougs-test/movements-validation-lib";

@Injectable({
  providedIn: 'root'
})
export class MouvementsValidationService {

  constructor(private http: HttpClient) { }

  async sendHttpRequest(body: RequestBody): Promise<ValidationResponse> {
    try {
      return await this.http.post('http://localhost:3333/api/movements/validation', body).toPromise() as ValidationResponse;
    } catch (e) {
      console.log('e = ', e)
      const httpErrorResponse: HttpErrorResponse = e;
      if (httpErrorResponse.status === 418) {
        return httpErrorResponse.error;
      }
    }
  }
}
