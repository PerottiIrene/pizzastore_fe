import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { AuthModule } from './core/auth/auth.module';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { LayoutModule } from './core/layout/layout.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AuthModule,
    LayoutModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
