import {Checkpoint, Operation} from "../../../../../libs/movements-validation-lib/src";

export const MINIMUM_BODY: {operations: Operation[], checkpoints: Checkpoint[]} = {
  operations: [],
  checkpoints: [
    {
      date: '10/03/2021',
      balance: 0,
    }, {
      date: '11/03/2021',
      balance: 0,
    }
  ],
};

export const VALID_BODY: {operations: Operation[], checkpoints: Checkpoint[]} = {
  operations: [
    {
      date: '12/03/2021',
      id: 'id1',
      amount: 40,
    },
  ],
  checkpoints: [
    {
      date: '10/03/2021',
      balance: 0,
    }, {
      date: '15/03/2021',
      balance: 40,
    }
  ],
};

export const WRONG_BODY: {operations: Operation[], checkpoints: Checkpoint[]} = {
  operations: [
    {
      date: '12/03/2021',
      id: 'id1',
      amount: 40,
    },
    {
      date: '12/03/2021',
      id: 'id1',
      amount: 40,
    },
    {
      date: '13/03/2021',
      id: 'id2',
      amount: 60,
    },
    {
      date: '13/03/2021',
      id: 'id3',
      amount: 20,
    },
    {
      date: '16/03/2021',
      id: 'id4',
      amount: 100,
    },
    {
      date: '17/03/2021',
      id: 'id5',
      amount: 200,
    },
    {
      date: '18/03/2021',
      id: 'id6',
      amount: -600,
    },
  ],
  checkpoints: [
    {
      date: '10/03/2021',
      balance: 0,
    }, {
      date: '11/03/2021',
      balance: 0,
    },
    {
      date: '15/03/2021',
      balance: 100,
    }, {
      date: '20/03/2021',
      balance: 400,
    },
    {
      date: '25/03/2021',
      balance: 500,
    }
  ],
};
