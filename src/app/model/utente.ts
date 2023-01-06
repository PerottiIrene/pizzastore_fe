export interface Utente {

    id?:number;
    username?:string;
    password?:string;
    nome?:string;
    cognome?:string;
    token?:string;
    email?:string;
    dateCreated?:Date;
    ruoli?: any;

}
