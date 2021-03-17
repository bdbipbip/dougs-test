export interface Operation {
  date: string | Date,
  id: string,
  wording?: string,
  amount: number,
}

export interface Checkpoint {
  date: string | Date,
  balance: number,
}

export interface Reason {
  type: string;
  message: string;
  missingOperations?: MissingOperation;
  duplicatedOperation?: Operation;
}

export interface ValidationResponse {
  message: string;
  isValid: boolean;
  reasons?: Reason[];
}

export interface MissingOperation {
  startDate: string | Date;
  endDate: string | Date;
  difference: number;
}
