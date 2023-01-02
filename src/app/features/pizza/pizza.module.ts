import { PizzaService } from './pizza.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { PizzaCreateComponent } from './pizza-create/pizza-create.component';
import { PizzaDetailComponent } from './pizza-detail/pizza-detail.component';
import { PizzaUpdateComponent } from './pizza-update/pizza-update.component';
import { PizzaDeleteComponent } from './pizza-delete/pizza-delete.component';

const routes:Routes=[
  {
    path:'list',
    component:PizzaListComponent
  },
  {
    path:'detail/:id',
    component:PizzaDetailComponent
  },
  {
    path:'edit/:id',
    component:PizzaUpdateComponent
  },
  {
    path:'delete/:id',
    component:PizzaDeleteComponent
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
    PizzaCreateComponent,
    PizzaDetailComponent,
    PizzaUpdateComponent,
    PizzaDeleteComponent
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
