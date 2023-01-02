import { Router } from '@angular/router';
import { ClienteService } from './../cliente.service';
import { Cliente } from './../../../model/cliente';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent {

  cliente: Cliente={
    // nome:'',
    // cognome:'',
    // indirizzo:'',
    // attivo:true
  }

  errorMessage: string = '';

  constructor(private clienteService:ClienteService, private router:Router){}

  save(clienteForm: NgForm): void {
    console.log('sub ' + JSON.stringify(this.cliente));
    if (clienteForm.valid) {
      this.clienteService.addCliente(this.cliente!).subscribe({
        next: clienteItem => {
          this.cliente = clienteItem;
          this.errorMessage = '';
        },
        error: () => this.errorMessage = 'Attenzione! Inserimento fallito!',
        complete: () => {
          if (!this.errorMessage)
            this.router.navigate([`cliente/list`], { queryParams: { confirmMessage: 'Operazione effettuata correttamente.' } })
        }
      });
    } else
      this.errorMessage = 'Attenzione! Operazione fallita! Il form non è stato validato';
  }

}
