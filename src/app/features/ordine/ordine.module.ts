import { OrdineService } from './ordine.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrdineListComponent } from './ordine-list/ordine-list.component';
import { OrdineDetailComponent } from './ordine-detail/ordine-detail.component';
import { OrdineDeleteComponent } from './ordine-delete/ordine-delete.component';
import { OrdineCreateComponent } from './ordine-create/ordine-create.component';
import { OrdineUpdateComponent } from './ordine-update/ordine-update.component';
import { OrdineSearchComponent } from './ordine-search/ordine-search.component';
import { OrdineListFattorinoComponent } from './ordine-list-fattorino/ordine-list-fattorino.component';
import { StatisticheComponent } from './statistiche/statistiche.component';

const routes:Routes=[
  {
    path:'list',
    component:OrdineListComponent
  },
  {
    path:'create',
    component:OrdineCreateComponent
  },
  {
    path:'edit/:id',
    component:OrdineUpdateComponent
  },
  {
    path:'detail/:id',
    component:OrdineDetailComponent
  },
  {
    path:'delete/:id',
    component:OrdineDeleteComponent
  },
  {
    path:'search',
    component:OrdineSearchComponent
  },
  {
    path:'ordiniFattorino',
    component:OrdineListFattorinoComponent
  },
  {
    path:'statistiche',
    component:StatisticheComponent
  },
  {
    path:'',
    redirectTo:'list',
    pathMatch:'full'
  },
]


@NgModule({
  declarations: [
    OrdineListComponent,
    OrdineDetailComponent,
    OrdineDeleteComponent,
    OrdineCreateComponent,
    OrdineUpdateComponent,
    OrdineSearchComponent,
    OrdineListFattorinoComponent,
    StatisticheComponent
  ],
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
