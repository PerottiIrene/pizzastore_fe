import { Statistiche } from './../../model/statistiche';
import { DateStats } from './../../model/date-stats';
import { Utente } from 'src/app/model/utente';
import { Ordine } from './../../model/ordine';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';

@Injectable({
  providedIn: 'root'
})
export class OrdineService {

  private apiServer = 'http://localhost:8080/api/ordine';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http:HttpClient) { }
  ricaviTotali?:number;
  numeroOrdini?:number
  numeroPizze?:number
  listaClienti:Cliente[]=[]

  /** GET registi from the server */
  getOrdini(): Observable<Ordine[]> {
    return this.http.get<Ordine[]>(this.apiServer)
  }

  /** GET film by id. Will 404 if id not found */
  getOrdine(id: number): Observable<Ordine> {
    const url = `${this.apiServer}/${id}`;
    return this.http.get<Ordine>(url).pipe(
      tap(_ => console.log(`fetched Ordine id=${id}`)),
      catchError(this.handleError<Ordine>(`getOrdine id=${id}`))
    );
  }

   /** POST: add a new regista to the server */
   addOrdine(ordineInput: Ordine): Observable<Ordine> {
    return this.http.post<Ordine>(this.apiServer, ordineInput, this.httpOptions).pipe(
      tap((newOrdine: Ordine) => console.log(`added Ordine w/ id=${newOrdine.id}`)),
      catchError(this.handleError<Ordine>('addOrdine'))
    );
  }

   //PUT: update 
   updateOrdine(ordineInput:Ordine):Observable<Ordine>{
    return this.http.put<Ordine>(this.apiServer + '/' + ordineInput.id?.toString(), ordineInput, this.httpOptions).pipe(
      tap((newOrdine: Ordine) => console.log(`update Ordine w/ id=${newOrdine.id}`)),
      catchError(this.handleError<Ordine>('updateOrdine'))
    );
  }

   //DELETE 
   deleteOrdine(idInput:number):Observable<boolean>{
    return this.http.delete<boolean>(this.apiServer + '/' + idInput.toString(), this.httpOptions)
  }

  findAllFattorini(){
    return this.http.get<Utente[]>('http://localhost:8080/api/utente/fattorini');
  }

   //search 
   searchOrdine(example:Ordine): Observable<Ordine[]> {
    return this.http.post<Ordine[]>(this.apiServer + '/search',example, this.httpOptions)
  }

  ordiniByfattorino():Observable<Ordine[]>{
    return this.http.get<Ordine[]>(this.apiServer + '/ordiniFattorino', this.httpOptions)
  }

  getStatistiche(dateInput: DateStats) {
    return this.http.post<Statistiche>(this.apiServer +'/statistiche', dateInput,this.httpOptions);
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


