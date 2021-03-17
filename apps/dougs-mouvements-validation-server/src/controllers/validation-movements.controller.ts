import {Request, Response} from "express";
import {validateMovements} from "../services/validation-movements.service";
import {Operation, Checkpoint, Reason, ValidationResponse} from '@dougs-test/movements-validation-lib';


export const validateMovementsController = async (req: Request, res: Response) => {
  try {
    const operations: Operation[] = req.body.operations;
    const checkpoints: Checkpoint[] = req.body.checkpoints;
    const reasons: Reason[] = validateMovements(operations, checkpoints);
    const isValid: boolean = reasons?.length === 0;
    const message: string = isValid ? 'Accepted' : `I'm a teapot !`;
    const response: ValidationResponse = {isValid, message, reasons};
    console.log('Response = ', response);
    res.json(response);
  } catch {
    res.status(419).json({
      type: 'INTERNAL_ERROR',
      message: 'Wrong parameters, an error occured'
    });
  }
};
