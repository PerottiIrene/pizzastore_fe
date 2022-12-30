import { ActivatedRoute } from '@angular/router';
import { ClienteService } from './../cliente.service';
import { Cliente } from './../../../model/cliente';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit{

  clienti?: Cliente[];
  sub?: Subscription;
  confirmMessage: string = '';

  constructor(private clienteService:ClienteService,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.sub = this.clienteService.getClienti().subscribe(clienteListItem => this.clienti = clienteListItem);

    //verifico presenza messaggio nei query params
    this.route
      .queryParams
      .subscribe(params => {
        // se non è presente il confirmMessage non faccio nulla
        this.confirmMessage = params['confirmMessage'] ? params['confirmMessage'] : '';
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
