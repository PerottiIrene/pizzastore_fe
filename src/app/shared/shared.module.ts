import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsLoggedDirective } from './directives/is-logged.directive';
import { DecodificaBooleanPipe } from './pipes/decodifica-boolean.pipe';



@NgModule({
  declarations: [
    IsLoggedDirective,
    DecodificaBooleanPipe,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    IsLoggedDirective,
    DecodificaBooleanPipe
  ]
})
export class SharedModule { }
