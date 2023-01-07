import { NgModule } from '@angular/core';
import { IsLoggedDirective } from './directives/is-logged.directive';
import { DecodificaBooleanPipe } from './pipes/decodifica-boolean.pipe';
import { IsRoleDirective } from './directives/is-role.directive';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    IsLoggedDirective,
    DecodificaBooleanPipe,
    IsRoleDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    IsLoggedDirective,
    DecodificaBooleanPipe,
    IsRoleDirective
  ]
})
export class SharedModule { }
