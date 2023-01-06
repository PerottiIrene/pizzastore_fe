import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Ordine } from './../../../model/ordine';
import { Router } from '@angular/router';
import { ClienteService } from './../cliente.service';
import { Component } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';

// export interface ClienteForm extends FormGroup<{
//   nome: FormControl<string>;
//   cognome: FormControl<string>;
//   id: FormControl<number>;
//   indirizzo: FormControl<string>;
//   attivo: FormControl<any>;
// }>{}

@Component({
  selector: 'app-cliente-search',
  templateUrl: './cliente-search.component.html',
  styleUrls: ['./cliente-search.component.css']
})
export class ClienteSearchComponent {

constructor(private clienteService:ClienteService,
  private router:Router){}
  example?:Cliente
  clienti?:Cliente[]

  searchCliente(searchForm:NgForm){
    // this.clienteService.searchCliente(this.example!).subscribe(clienteListItem => this.clienti = clienteListItem)
  this.clienteService.searchCliente(this.example!).subscribe({
    next: clienteItem => {
      this.clienti = clienteItem;
      // this.errorMessage = '';
    },
    // error: () => this.errorMessage = 'Attenzione! Inserimento fallito!',
    complete: () => {
      // if (!this.errorMessage)
        // this.router.navigate([`cliente/list`])
    }
  });
}
}
