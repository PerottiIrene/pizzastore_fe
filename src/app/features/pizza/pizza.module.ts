import { PizzaService } from './pizza.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { PizzaCreateComponent } from './pizza-create/pizza-create.component';

const routes:Routes=[
  {
    path:'list',
    component:PizzaListComponent
  },
  {
    path:'create',
    component:PizzaCreateComponent
  },
  {
    path:'',
    redirectTo:'list',
    pathMatch:'full'
  },
]

@NgModule({
  declarations: [
    PizzaListComponent,
    PizzaCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers:[
    PizzaService
  ]
})
export class PizzaModule { }
