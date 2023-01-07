import { Cliente } from './cliente';
export interface Statistiche{

    ricaviTotali?:number;
    numeroOrdini?:number;
    numeroPizze?:number;
    listaClienti?:Cliente[]
}