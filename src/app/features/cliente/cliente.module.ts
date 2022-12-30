import { ClienteService } from './cliente.service';
import { FormsModule } from '@angular/forms';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule,Routes } from '@angular/router';

const routes:Routes=[
  {
    path:'list',
    component:ClienteListComponent
  },
  {
    path:'',
    redirectTo:'list',
    pathMatch:'full'
  },
]

@NgModule({
  declarations: [
    ClienteListComponent
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
