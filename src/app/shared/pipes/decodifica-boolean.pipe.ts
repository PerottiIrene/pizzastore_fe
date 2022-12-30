import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodificaBoolean'
})
export class DecodificaBooleanPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    return value ? "Si" : "No";
  }

}
