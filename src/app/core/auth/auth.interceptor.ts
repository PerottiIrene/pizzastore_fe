import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   //se url non include la login, la request fa una richiesta al token (gli passa il token ad ogni richiesta)
   if(!request.url.includes("login")){
    request=request.clone({
      headers:new HttpHeaders({ Authorization:  `Bearer ${this.authService.getUserToken()}` })
    });
  }
  return next.handle(request);
  }

}
