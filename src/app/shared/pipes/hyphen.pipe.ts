import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hyphen',
})
export class HyphenPipe implements PipeTransform {
  constructor() {}
  transform(strCheck: string): any {
    if (!strCheck) {
      return '-';
    }
    return strCheck;
  }
}