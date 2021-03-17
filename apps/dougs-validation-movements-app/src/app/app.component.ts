import {Component} from '@angular/core';
import {Checkpoint, Operation, ValidationResponse} from "@dougs-test/movements-validation-lib";
import {HttpClient} from "@angular/common/http";
import {MINIMUM_BODY, VALID_BODY, WRONG_BODY} from "./constants/inputs.const";

@Component({
  selector: 'dougs-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  validationResponse: ValidationResponse;
  currentRequestedType: string;

  // CUSTOM INPUTS HERE //
  customBody: {operations: Operation[], checkpoints: Checkpoint[]} = {
    operations: [],
    checkpoints: [],
  };
  /////////////////////////

  get isCustomBodyInvalid(): boolean {
    return this.customBody?.checkpoints?.length < 1;
  }

  constructor(private http: HttpClient) {
  }

  async sendRequest(type: string = 'VALID'): Promise<void> {
    this.currentRequestedType = type;
    const body: {operations: Operation[], checkpoints: Checkpoint[]} = this.getBodyByType(type);
    console.log('body = ', body);
    this.validationResponse = await this.http.post('http://localhost:3333/api/movements/validation', body).toPromise() as ValidationResponse;
    console.log('validationResponse = ', this.validationResponse);
  }


  private getBodyByType(type: string): {operations: Operation[], checkpoints: Checkpoint[]} {
    switch (type) {
      case 'MINI': return MINIMUM_BODY;
      case 'WRONG': return WRONG_BODY;
      case 'CUSTOM': return this.customBody;
      case 'VALID': return VALID_BODY;
    }
  }

  reset(): void {
    this.validationResponse = null;
    this.currentRequestedType = null;
  }
}
