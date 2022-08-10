import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatirajString'
})
export class FormatirajStringPipe implements PipeTransform {

  transform(value: string): string {
    if(!value) return '/';
    else return value;
  }

}
