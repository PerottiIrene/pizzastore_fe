import { Pizza } from './../../model/pizza';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  private apiServer = 'http://localhost:8080/api/pizza';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http:HttpClient) { }

  /** GET clienti from the server */
  getPizze(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.apiServer)
  }

  /** GET cliente by id. Will 404 if id not found */
  getPizza(id: number): Observable<Pizza> {
    const url = `${this.apiServer}/${id}`;
    return this.http.get<Pizza>(url).pipe(
      tap(_ => console.log(`fetched Pizza id=${id}`)),
      catchError(this.handleError<Pizza>(`getPizza id=${id}`))
    );
  }

  /** POST: add a new regista to the server */
  addPizza(pizzaInput: Pizza): Observable<Pizza> {
    return this.http.post<Pizza>(this.apiServer, pizzaInput, this.httpOptions).pipe(
      tap((newPizza: Pizza) => console.log(`added Pizza w/ id=${newPizza.id}`)),
      catchError(this.handleError<Pizza>('addPizza'))
    );
  }

  //PUT: update 
  updatePizza(pizzaInput: Pizza): Observable<Pizza> {
    return this.http.put<Pizza>(this.apiServer + '/' + pizzaInput.id?.toString(), pizzaInput, this.httpOptions).pipe(
      tap((newPizza: Pizza) => console.log(`update Pizza w/ id=${newPizza.id}`)),
      catchError(this.handleError<Pizza>('updatePizza'))
    );
  }

  //DELETE 
  deletePizza(idInput: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiServer + '/' + idInput.toString(), this.httpOptions)
  }

  //search 
  searchPizza(example:Pizza): Observable<Pizza[]> {
    return this.http.post<Pizza[]>(this.apiServer + '/search',example, this.httpOptions)
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
}
