import {Request, Response} from "express";
import {ValidationMovementsService} from "../services/validation-movements.service";
import {Operation, Checkpoint, Reason, ValidationResponse} from '@dougs-test/movements-validation-lib';


export const validateMovementsController = async (req: Request, res: Response) => {
  try {
    const operations: Operation[] = req.body.operations;
    const checkpoints: Checkpoint[] = req.body.checkpoints;
    const validationMovementsService: ValidationMovementsService = new ValidationMovementsService(operations, checkpoints);
    const reasons: Reason[] = validationMovementsService.getValidationMovementsReasons();
    const isValid: boolean = reasons.length === 0;
    const message: string = isValid ? 'Accepted' : `I'm a teapot !`;
    const statusCode: number = isValid ? 202 : 418;
    const response: ValidationResponse = {isValid, message, reasons};
    res.status(statusCode);
    res.json(response);
  } catch {
    res.status(419).json({
      type: 'INTERNAL_ERROR',
      message: 'Wrong parameters, an error occured'
    });
  }
};
