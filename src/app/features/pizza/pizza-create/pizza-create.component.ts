import { Router } from '@angular/router';
import { PizzaService } from './../pizza.service';
import { Pizza } from './../../../model/pizza';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pizza-create',
  templateUrl: './pizza-create.component.html',
  styleUrls: ['./pizza-create.component.css']
})
export class PizzaCreateComponent {

  pizza:Pizza={}
  errorMessage: string = '';

  constructor(private pizzaService:PizzaService,private router:Router){}

  save(pizzaForm: NgForm): void {
    console.log('sub ' + JSON.stringify(this.pizza));
    if (pizzaForm.valid) {
      this.pizzaService.addPizza(this.pizza!).subscribe({
        next: clienteItem => {
          this.pizza = clienteItem;
          this.errorMessage = '';
        },
        error: () => this.errorMessage = 'Attenzione! Inserimento fallito!',
        complete: () => {
          if (!this.errorMessage)
            this.router.navigate([`pizza/list`], { queryParams: { confirmMessage: 'Operazione effettuata correttamente.' } })
        }
      });
    } else
      this.errorMessage = 'Attenzione! Operazione fallita! Il form non è stato validato';
  }

}
