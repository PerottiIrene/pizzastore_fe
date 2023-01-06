import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Ordine } from './../../../model/ordine';
import { Router } from '@angular/router';
import { ClienteService } from './../cliente.service';
import { Component } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';

@Component({
  selector: 'app-cliente-search',
  templateUrl: './cliente-search.component.html',
  styleUrls: ['./cliente-search.component.css']
})
export class ClienteSearchComponent {

constructor(private clienteService:ClienteService,
  private router:Router){}
  example?:Cliente={}
  clienti?:Cliente[]

  searchCliente(searchForm:NgForm){
    console.log(this.example)
  this.clienteService.searchCliente(this.example!).subscribe({
    next: clienteItem => {
      this.clienti = clienteItem;
      // this.errorMessage = '';
    },
    // error: () => this.errorMessage = 'Attenzione! Inserimento fallito!',
  });
  }

  ripulisciRisultati(){
    this.clienti=[]
  }
}
