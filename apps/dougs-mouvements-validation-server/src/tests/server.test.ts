import * as express from 'express';
import {Express, Response} from 'express';
import * as request from 'supertest';
import router from "../routes/router";

const server: Express = express();
server.use('/', router);


describe('test movements validation route', () => {
  it('POST /movements-validation valid', async () => {
    const {body} = await request(server)
      .post('/api/movements/validation')
      .send({
        operations: [{
          date: '12/03/2021',
          id: 'id1',
          amount: 100,
        }],
        checkpoints: [{
          date: '10/03/2021',
          balance: 0,
        }, {
          date: '11/03/2021',
          balance: 0,
        },
          {
            date: '15/03/2021',
            balance: 100,
          }],
      });
    expect(body).toEqual({
      isValid: true,
      message: 'Accepted',
      reasons: [],
    });
  });

  it('POST /movements-validation doublons + missing', async () => {
    const {body} = await request(server)
      .post('/api/movements/validation')
      .send({
        operations: [{
          date: '12/03/2021',
          id: 'id1',
          amount: 100,
        }, {
          date: '12/03/2021',
          id: 'id1',
          amount: 100,
        }],
        checkpoints: [{
          date: '10/03/2021',
          balance: 0,
        }, {
          date: '15/03/2021',
          balance: 120,
        }],
      });
    expect(body).toEqual({
      isValid: false,
      message: `I'm a teapot !`,
      reasons: [
        {
          type: 'DUPLICATED_OPERATION',
          message: 'Opération dupliquée',
          duplicatedOperation: {
            date: '12/03/2021',
            id: 'id1',
            amount: 100,
          },
        }, {
          type: 'WRONG_BALANCE',
          message: 'Opérations manquantes, balance incorrecte',
          missingOperations: {
            startDate: '10/03/2021',
            endDate: '15/03/2021',
            difference: -20,
          }
        }
      ],
    });
  });

  it('POST /movements-validation wrong parameters', async () => {
    const response: Response = await request(server)
      .post('/api/movements/validation')
      .send({
        operations: [],
        checkpoints: [1 as any, 2 as any],
      });
    expect(response.status).toEqual(419);
  });

  it('use any route', async () => {
    const response: any = await request(server)
      .get('/');
    expect(response.body.message).toEqual('The only available route is on POST /api/movements/validation, check the README for more details');
  });
});
