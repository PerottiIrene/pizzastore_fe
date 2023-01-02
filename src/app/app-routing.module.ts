import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
    {
    path:'welcome',
    loadChildren:()=> import('./features/welcome/welcome.module' ).then(m => m.WelcomeModule),
    canActivate:[AuthGuard]
    },
    {
      path:'cliente',
      loadChildren:()=> import('./features/cliente/cliente.module' ).then(m => m.ClienteModule),
    },
    {
      path:'pizza',
      loadChildren:()=> import('./features/pizza/pizza.module' ).then(m => m.PizzaModule),
    },
    {
      path:'login',
      loadChildren:()=> import('./core/auth/auth.module' ).then(m => m.AuthModule),
    },

{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: '*', redirectTo: '/welcome' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
