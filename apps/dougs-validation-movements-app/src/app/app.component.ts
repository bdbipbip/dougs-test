import { Component } from '@angular/core';
import {Checkpoint, Operation} from "@dougs-test/movements-validation-lib";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'dougs-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dougs-validation-movements-app';
  httpRes: any;
  operations: Operation[] = [
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
  ];
  checkpoints: Checkpoint[] = [{
    date: '10/03/2021',
    balance: 0,
  }, {
    date: '15/03/2021',
    balance: 100,
  }, {
    date: '20/03/2021',
    balance: 400,
  }];

  constructor(private http: HttpClient) {
  }

  async sendRequest(): Promise<void> {
    const body: any = {
      operations: this.operations,
      checkpoints: this.checkpoints,
    };
    console.log('body = ', body);
    this.httpRes = await this.http.post('http://localhost:3333/api/movements/validation', body).toPromise();
    console.log('res = ', this.httpRes);
  }
}
