import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Utente } from 'src/app/model/utente';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServer = 'http://localhost:8080/api/auth/login';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http:HttpClient) { }

  private userLoggedSubject$:BehaviorSubject<Utente | null>=new BehaviorSubject<Utente | null>(null)

  isLoggedIn():boolean{
    return this.userLoggedSubject$.value ? !!this.userLoggedSubject$.value.token :false;
  }
}
