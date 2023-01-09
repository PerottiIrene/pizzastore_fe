import { Router } from '@angular/router';
import { PizzaService } from './../../pizza/pizza.service';
import { ClienteService } from './../../cliente/cliente.service';
import { OrdineService } from './../ordine.service';
import { Pizza } from './../../../model/pizza';
import { Cliente } from 'src/app/model/cliente';
import { Ordine } from './../../../model/ordine';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Utente } from 'src/app/model/utente';

@Component({
  selector: 'app-ordine-create',
  templateUrl: './ordine-create.component.html',
  styleUrls: ['./ordine-create.component.css']
})
export class OrdineCreateComponent implements OnInit {

  ordine: Ordine = {
    pizze:[]
  }
  clienteId?: number;
  pizzaIds?: number[] = [];
  clienti: Cliente[] = [];
  pizze: Pizza[] = []
  fattorini: Utente[] = []
  fattorinoId?: number;
  errorMessage: string = '';

  constructor(private ordineService: OrdineService,
    private clienteService: ClienteService,
    private pizzaService: PizzaService,
    private router: Router) { }

  ngOnInit(): void {
    this.clienteService.getClienti().subscribe(clienteListItem => this.clienti = clienteListItem);
    this.pizzaService.getPizze().subscribe(pizzaListItem => this.pizze = pizzaListItem)
    this.ordineService.findAllFattorini().subscribe(result => this.fattorini = result)
  }

  save(ordineForm: NgForm): void {
    console.log('sub ' + JSON.stringify(this.ordine));
    if (ordineForm.valid) {
      this.ordine.cliente = this.clienti.find(clienteItem =>
        this.clienteId == clienteItem.id)
      this.ordine.fattorino = this.fattorini.find(fattorinoItem =>
        this.fattorinoId == fattorinoItem.id)
      this.ordineService.addOrdine(this.ordine).subscribe({
        next: ordineItem => {
          this.ordine = ordineItem;
          this.errorMessage = '';
        },
        error: () => this.errorMessage = 'Attenzione! Inserimento fallito!',
        complete: () => {
          if (!this.errorMessage)
            this.router.navigate([`ordine/list`], { queryParams: { confirmMessage: 'Operazione effettuata correttamente.' } })
        }
      });
    } else
      this.errorMessage = 'Attenzione! Operazione fallita! Il form non è stato validato';
  }

  addPizza(idPizza:any){
    this.pizze.forEach(pizzaItem => {
      if (idPizza == pizzaItem.id) {
        this.ordine.pizze!.push(pizzaItem);
      }
    });
  }


}
