import { Router } from '@angular/router';
import { ClienteService } from './../cliente.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cliente-search',
  templateUrl: './cliente-search.component.html',
  styleUrls: ['./cliente-search.component.css']
})
export class ClienteSearchComponent {

constructor(private clienteService:ClienteService,
  private router:Router){}

  searchCliente(){
    this.clienteService.searchCliente().subscribe
    // this.router.navigate(["cliente/list"])
  }

}
