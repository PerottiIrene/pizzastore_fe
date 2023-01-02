import { ActivatedRoute } from '@angular/router';
import { Cliente } from './../../../model/cliente';
import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.css']
})
export class ClienteDetailComponent implements OnInit{

constructor(private clienteService:ClienteService,private route:ActivatedRoute){}

selectedCliente?: Cliente;
errorMessage: string = '';
confirmMessage: string = '';

  ngOnInit(): void {
    let idParam = Number(this.route.snapshot.paramMap.get('id'));
    this.clienteService.getCliente(idParam).subscribe({
      next: clienteItem => {
        this.selectedCliente = clienteItem;
        console.log(JSON.stringify(clienteItem))
      },
      error: err => this.errorMessage = err
    });

    //verifico presenza messaggio nei query params
    this.route
      .queryParams
      .subscribe(params => {
        // se non è presente il confirmMessage non faccio nulla
        this.confirmMessage = params['confirmMessage'] ? params['confirmMessage'] : '';
      });
  }

}
