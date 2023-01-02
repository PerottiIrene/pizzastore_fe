import { OrdineService } from './ordine.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes=[
  {
    path:'',
    redirectTo:'list',
    pathMatch:'full'
  },
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers:[
    OrdineService
  ]
})
export class OrdineModule { }
