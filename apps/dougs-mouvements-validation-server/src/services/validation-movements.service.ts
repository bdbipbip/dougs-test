import {Checkpoint, Operation, Reason} from "@dougs-test/movements-validation-lib";
import {DateUtils} from "../utils/date.utils";

export class ValidationMovementsService {
  checkpoints: Checkpoint[];
  operations: Operation[];

  private reasons: Reason[] = [];
  private treatedOperationIds: string[] = [];
  private previousCheckpoint: Checkpoint;
  private currentAmount: number;
  private currentCheckpointIndex: number;
  private currentCheckpoint: Checkpoint;


  constructor(operations: Operation[], checkpoints: Checkpoint[]) {
    this.checkpoints = checkpoints;
    this.operations = operations;
    this.previousCheckpoint = this.checkpoints[0];
    this.currentCheckpointIndex = 1;
    this.currentCheckpoint = this.checkpoints[this.currentCheckpointIndex];
    this.updateCurrentAmount();
  }

  getValidationMovementsReasons(): Reason[] {
    for (const operation of this.operations) {
      const operationAlreadyTreated: boolean = this.treatedOperationIds.includes(operation.id);
      operationAlreadyTreated ?
        this.addDoubledOperationReason(operation) :
        this.treatOperation(operation);
    }
    this.verifyFinalCheckpoint();
    return this.reasons;
  }

  private challengeCheckpointBalance(): void {
    const balance: number = this.currentCheckpoint.balance;
    this.verifyFormat(balance);
    this.verifyValidity(balance);
  }

  private addDoubledOperationReason(operation: Operation) {
    this.reasons.push({
      type: 'DUPLICATED_OPERATION',
      message: 'Opération dupliquée',
      duplicatedOperation: operation,
    });
  }

  private treatOperation(operation: Operation) {
    while (DateUtils.dateIsPosterior(operation.date, this.currentCheckpoint.date)) {
      this.challengeCheckpointBalance();
      this.iterateCheckpoints();
    }
    this.currentAmount += operation.amount;
    this.treatedOperationIds.push(operation.id);
  }


  private iterateCheckpoints(): void {
    this.currentCheckpointIndex++;
    this.currentCheckpoint = this.checkpoints[this.currentCheckpointIndex];
    this.previousCheckpoint = this.checkpoints[this.currentCheckpointIndex - 1];
    this.updateCurrentAmount();
  }

  private updateCurrentAmount(): void {
    this.currentAmount = this.previousCheckpoint.balance;
  }

  private verifyFinalCheckpoint() {
    while (this.currentCheckpointIndex !== this.checkpoints.length) {
      this.challengeCheckpointBalance();
      this.iterateCheckpoints();
    }
  }

  private verifyFormat(balance: number): void {
    const isWrongFormat: boolean = typeof balance !== 'number' || typeof this.currentAmount !== 'number';
    if (isWrongFormat) {
      throw new Error();
    }
  }

  private verifyValidity(balance: number): void {
    const isInvalid: boolean = this.currentAmount !== balance;
    if (isInvalid) {
      this.reasons.push({
        type: 'WRONG_BALANCE',
        message: 'Opérations manquantes, balance incorrecte',
        missingOperations: {
          startDate: this.previousCheckpoint.date,
          endDate: this.currentCheckpoint.date,
          difference: this.currentAmount - balance,
        }
      });
    }
  }
}



