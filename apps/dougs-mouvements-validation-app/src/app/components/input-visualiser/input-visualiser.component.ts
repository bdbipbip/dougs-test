import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {RequestBody} from "@dougs-test/movements-validation-lib";
import {MINIMUM_BODY, VALID_BODY, WRONG_BODY} from "../../constants/inputs.const";

@Component({
  selector: 'dougs-mouvements-validation-app-input-visualiser',
  templateUrl: './input-visualiser.component.html',
  styleUrls: ['./input-visualiser.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputVisualiserComponent implements OnInit {

  @Input() customBody: RequestBody;

  showMini: boolean = false;
  showValid: boolean = false;
  showWrong: boolean = false;
  showCustom: boolean = false;
  bodyList: RequestBody[] = [MINIMUM_BODY, VALID_BODY, WRONG_BODY];
  typeCodeList: string[] = ['MINI', 'VALID', 'WRONG'];
  typeLabelList: string[] = ['minimum', 'valide', 'erroné'];

  get customBodyIsValid(): boolean {
    return this.customBody?.checkpoints?.length > 1;
  }

  constructor() { }

  ngOnInit(): void {
  }

  getShowByType(type: string) {
    switch (type) {
      case 'MINI': return this.showMini;
      case 'VALID': return this.showValid;
      case 'WRONG': return this.showWrong;
    }
  }
}
