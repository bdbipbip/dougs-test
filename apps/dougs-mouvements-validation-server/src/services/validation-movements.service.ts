import {Checkpoint, Operation, Reason} from "@dougs-test/movements-validation-lib";
import {DateUtils} from "../utils/date.utils";

export function validateMovements(operations: Operation[], checkpoints: Checkpoint[]): Reason[] {
  const reasons: Reason[] = [];
  const treatedOperationIds: string[] = [];
  let previousCheckpoint: Checkpoint = checkpoints[0];
  let currentAmount: number = previousCheckpoint.balance;
  let checkpointIndex: number = 1;
  let currentCheckpoint: Checkpoint = checkpoints[checkpointIndex];
  for (const operation of operations) {
    if (treatedOperationIds.includes(operation.id)) {
      reasons.push({
        type: 'DOUBLED_OPERATIONS',
        message: 'Des opérations sont présentes en double',
        doubledOperations: operation,
      })
    } else {
      while(DateUtils.dateIsPosterior(operation.date, currentCheckpoint.date)) {
        doBilan(currentAmount, currentCheckpoint, previousCheckpoint, reasons);
        checkpointIndex++;
        currentCheckpoint = checkpoints[checkpointIndex];
        previousCheckpoint = checkpoints[checkpointIndex - 1];
        currentAmount = previousCheckpoint.balance;
      }
      currentAmount += operation.amount;
      treatedOperationIds.push(operation.id);
    }
  }
  // ASSOMPTION THAT THERE IS STILL A CHECKPOINT AFTER
  doBilan(currentAmount, currentCheckpoint, previousCheckpoint, reasons);
  return reasons;
}

function doBilan(currentAmount: number, currentCheckpoint: Checkpoint, previousCheckpoint: Checkpoint, reasons: Reason[]): void {
  console.log('Do bilan, currentAmount = ', currentAmount);
  console.log('Do bilan, currentCheckpoint = ', currentCheckpoint);
  console.log('Do bilan, previousCheckpoint = ', previousCheckpoint);
  console.log('Do bilan, reasons = ', reasons);
  const balance: number = currentCheckpoint.balance;
  const isValid: boolean = currentAmount === balance;
  if (!isValid) {
    reasons.push({
      type: 'WRONG_BALANCE',
      message: 'Opérations manquantes, balance incorrecte',
      missingOperations: {
        startDate: previousCheckpoint.date,
        endDate: currentCheckpoint.date,
        difference: currentAmount - balance,
      }
    })
  }
}

