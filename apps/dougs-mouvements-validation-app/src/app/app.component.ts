import {Component} from '@angular/core';
import {Checkpoint, Operation, RequestBody, ValidationResponse} from "@dougs-test/movements-validation-lib";
import {HttpClient} from "@angular/common/http";
import {MINIMUM_BODY, VALID_BODY, WRONG_BODY} from "./constants/inputs.const";
import {MouvementsValidationService} from "./services/mouvements-validation.service";

@Component({
  selector: 'dougs-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  validationResponse: ValidationResponse;
  currentRequestedType: string;

  // CUSTOM INPUTS HERE //
  customBody: RequestBody = {
    operations: [],
    checkpoints: [],
  };
  /////////////////////////

  get isCustomBodyValid(): boolean {
    return this.customBody?.checkpoints?.length > 1;
  }

  constructor(private mouvementsValidationService: MouvementsValidationService) {
  }

  async sendRequest(type: string): Promise<void> {
    this.currentRequestedType = type;
    const body: RequestBody = this.getBodyByType(type);
    this.validationResponse = await this.mouvementsValidationService.sendHttpRequest(body);
  }


  private getBodyByType(type: string): RequestBody {
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
