import { RegistrationComponent } from './../components/user/registration/registration.component';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from '../util/constants';

@Pipe({
  name: 'DateFormatPipe',
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    // return super.transform(value, Constants.DATE_TIME_FMT);
    // let result = value.match(/(\d{4})-(\d{2})-(\d{2})-(\d{2}):(\d{2}):(\d{2}):(\d{3})/).map(x => parseInt(x, 10));

    // result.shift();

    // //let aux = new Date(...result ).toLocaleString();
    // console.log(result)
    // return super.transform(result, Constants.DATE_TIME_FMT);
    return super.transform(value, Constants.DATE_TIME_FMT);
  }
}
