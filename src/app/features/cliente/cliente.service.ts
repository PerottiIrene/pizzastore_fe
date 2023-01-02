import { Cliente } from './../../model/cliente';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiServer = 'http://localhost:8080/api/cliente';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  /** GET clienti from the server */
  getClienti(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiServer)
  }

  /** GET cliente by id. Will 404 if id not found */
  getCliente(id: number): Observable<Cliente> {
    const url = `${this.apiServer}/${id}`;
    return this.http.get<Cliente>(url).pipe(
      tap(_ => console.log(`fetched Cliente id=${id}`)),
      catchError(this.handleError<Cliente>(`getCliente id=${id}`))
    );
  }

  /** POST: add a new regista to the server */
  addCliente(clienteInput: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiServer, clienteInput, this.httpOptions).pipe(
      tap((newCliente: Cliente) => console.log(`added Cliente w/ id=${newCliente.id}`)),
      catchError(this.handleError<Cliente>('addCliente'))
    );
  }

  //PUT: update 
  updateCliente(clienteInput: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.apiServer + '/' + clienteInput.id?.toString(), clienteInput, this.httpOptions).pipe(
      tap((newCliente: Cliente) => console.log(`update Cliente w/ id=${newCliente.id}`)),
      catchError(this.handleError<Cliente>('updateCliente'))
    );
  }

  //DELETE 
  deleteCliente(idInput: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiServer + '/' + idInput.toString(), this.httpOptions)
  }

    //search 
    searchCliente(): Observable<Cliente> {
      return this.http.get<Cliente>(this.apiServer + '/search', this.httpOptions)
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
