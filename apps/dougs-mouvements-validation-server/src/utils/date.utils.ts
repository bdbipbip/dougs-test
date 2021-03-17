import * as moment from 'moment';

export class DateUtils {
  static dateIsPosterior(stringDate1: string | Date, stringDate2: string | Date): boolean {
    const date1: any = moment(stringDate1, 'DD/MM/YYYY');
    const date2: any = moment(stringDate2, 'DD/MM/YYYY');
    return date1.valueOf() > date2.valueOf();
  }
}


