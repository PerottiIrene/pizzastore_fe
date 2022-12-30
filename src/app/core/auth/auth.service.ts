import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
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

  login(loginForm:Utente):Observable<Utente>{
    // return of({username:loginForm.username,token:"123456"});
    //settiamo il token all'utente attraverso il map e facciamo una post alla login passandogli il token
    return this.http.post<{'jwt-token': string}>(this.apiServer, JSON.stringify(loginForm),this.httpOptions).pipe(
      map(res => {return ({ username: loginForm.username, token: res['jwt-token'] })}))
  }

  setUserLogged(user:Utente | null){
    this.userLoggedSubject$.next(user)
  }

  getUserLogged():Observable<Utente | null>{
    return this.userLoggedSubject$.asObservable();
  }

  getUserToken():string |null | undefined{
    return this.userLoggedSubject$.value ? this.userLoggedSubject$.value.token:null;
  }

  logout(){
    this.setUserLogged(null)
  }

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getUserInfo():Observable<Utente>{
    return this.http.get<Utente>("http://localhost:8080/api/utente/userInfo",this.httpOptions);
  }
}
