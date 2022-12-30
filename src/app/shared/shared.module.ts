import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsLoggedDirective } from './directives/is-logged.directive';



@NgModule({
  declarations: [
    IsLoggedDirective,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    IsLoggedDirective,
  ]
})
export class SharedModule { }
