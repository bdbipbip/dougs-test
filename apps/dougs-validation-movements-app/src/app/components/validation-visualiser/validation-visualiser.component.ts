import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Reason, ValidationResponse} from "@dougs-test/movements-validation-lib";

@Component({
  selector: 'dougs-validation-movements-app-validation-visualiser',
  templateUrl: './validation-visualiser.component.html',
  styleUrls: ['./validation-visualiser.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationVisualiserComponent implements OnInit {

  @Input() validationResponse: ValidationResponse;
  @Input() responseType: string;

  typeLabelMapping: any = {
    'MINI': 'minimum',
    'VALID': 'valide',
    'WRONG': 'erroné',
  };

  constructor() { }

  get wrongBalanceReasons(): Reason[] {
    return this.validationResponse.reasons.filter((reason: Reason) => !!reason.missingOperations);
  }

  get showWrongBalance(): boolean {
    return this.wrongBalanceReasons?.length > 0
  }

  get duplicatedOperationsReasons(): Reason[] {
    return this.validationResponse.reasons.filter((reason: Reason) => !!reason.duplicatedOperation);
  }

  get showDuplicatedOperations(): boolean {
    return this.duplicatedOperationsReasons?.length > 0
  }

  ngOnInit(): void {
  }

}
