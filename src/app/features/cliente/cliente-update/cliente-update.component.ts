import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from './../cliente.service';
import { Cliente } from './../../../model/cliente';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit{
  cliente!:Cliente
  errorMessage:string=''

constructor(private clienteService:ClienteService,private route:ActivatedRoute,private router:Router){}

  ngOnInit(): void {
    let idRegista=Number(this.route.snapshot.paramMap.get('id'));
    this.clienteService.getCliente(idRegista).subscribe((clienteItem : Cliente) => {
      this.cliente = clienteItem;
  })
}

updateCliente(clienteForm:NgForm){
  if (clienteForm.valid){
      this.clienteService.updateCliente(this.cliente).subscribe(
        clienteItem => {
        console.log('modificato ' + JSON.stringify(clienteItem));
        this.cliente = clienteItem;
      },
      
      err => this.errorMessage = err,
      () => this.router.navigate([`/cliente/list`], { queryParams: { confirmMessage: 'Operazione effettuata correttamente.' } })
    );
  } else {
    this.errorMessage = 'Attenzione! Operazione fallita! Il form non è stato validato'
  }
}

}
