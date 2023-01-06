import { Cliente } from './../../../model/cliente';
import { ClienteService } from './../../cliente/cliente.service';
import { Ordine } from './../../../model/ordine';
import { OrdineService } from './../ordine.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Utente } from 'src/app/model/utente';

@Component({
  selector: 'app-ordine-search',
  templateUrl: './ordine-search.component.html',
  styleUrls: ['./ordine-search.component.css']
})
export class OrdineSearchComponent implements OnInit{

  constructor(private ordineService:OrdineService,
    private clienteService:ClienteService){}

  ngOnInit(): void {
    this.clienteService.getClienti().subscribe(clienteListItem => this.clienti = clienteListItem);
    this.ordineService.findAllFattorini().subscribe(result => this.fattorini=result)
  }

  example?:Ordine={
    cliente: {
      // id:0
    },
    fattorino:{
      // id:0
    }
  }
 
  ordini?:Ordine[]=[]
  clienti:Cliente[]=[]
  fattorini:Utente[]=[]

  searchOrdine(searchForm:NgForm){
    // console.log(this.example?.cliente?.id)
  this.ordineService.searchOrdine(this.example!).subscribe({
    next: ordineItem => {
      this.ordini = ordineItem;
      // this.example!.cliente!.id!=0
      // this.example!.fattorino!.id!=0
    },
    
  });
  }

  ripulisciRisultati(){
    this.ordini=[]
  }

}
