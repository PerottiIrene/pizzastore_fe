import { Pizza } from './pizza';
import { Cliente } from './cliente';
import { Utente } from './utente';
export interface Ordine {

    id?:number;
    data?:Date;
    codice?:string;
    costoTotale?:number;
    chiuso?:boolean;
    cliente?:Cliente
    fattorino?:Utente;
    pizze?:Pizza[]
}
