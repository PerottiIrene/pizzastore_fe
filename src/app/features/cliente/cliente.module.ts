import { ClienteService } from './cliente.service';
import { FormsModule } from '@angular/forms';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule,Routes } from '@angular/router';
import { ClienteCreateComponent } from './cliente-create/cliente-create.component';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { ClienteUpdateComponent } from './cliente-update/cliente-update.component';
import { ClienteDeleteComponent } from './cliente-delete/cliente-delete.component';

const routes:Routes=[
  {
    path:'list',
    component:ClienteListComponent
  },
  {
    path:'create',
    component:ClienteCreateComponent
  },
  {
    path:'detail/:id',
    component:ClienteDetailComponent
  },
  {
    path:'edit/:id',
    component:ClienteUpdateComponent
  },
  {
    path:'delete/:id',
    component:ClienteDeleteComponent
  },
  {
    path:'',
    redirectTo:'list',
    pathMatch:'full'
  },
]

@NgModule({
  declarations: [
    ClienteListComponent,
    ClienteCreateComponent,
    ClienteDetailComponent,
    ClienteUpdateComponent,
    ClienteDeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers:[
    ClienteService
  ]
})
export class ClienteModule { }
