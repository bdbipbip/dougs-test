import * as express from 'express';
import {Router} from "express";
import {validateMovementsController} from "../controllers/validation-movements.controller";
import * as bodyParser from "body-parser";
import * as cors from 'cors';

const router: Router = express.Router();

router.use(cors());
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post('/api/movements/validation', validateMovementsController);

router.use('*', (req, res) => {
  res.send({ message: 'The only available route is on POST /api/movements/validation, check the README for more details' });
});



export default router;
