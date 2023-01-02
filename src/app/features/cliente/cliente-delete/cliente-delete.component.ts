import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from './../cliente.service';
import { Cliente } from './../../../model/cliente';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit{
  cliente?: Cliente
  errorMessage: string = '';

  constructor(private clienteService:ClienteService,
    private route:ActivatedRoute,
    private router:Router){}

  ngOnInit(): void {
    let idCliente = Number(this.route.snapshot.paramMap.get('id'));
    this.clienteService.getCliente(idCliente).subscribe((clienteItem => {
      this.cliente = clienteItem;
    }))
  }

  deleteCliente() {
        this.clienteService.deleteCliente(this.cliente?.id!).subscribe()
        this.router.navigate(["cliente/list"])
  }

}
