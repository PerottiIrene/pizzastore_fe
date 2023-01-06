import { Pizza } from './../../../model/pizza';
import { PizzaService } from './../pizza.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pizza-search',
  templateUrl: './pizza-search.component.html',
  styleUrls: ['./pizza-search.component.css']
})
export class PizzaSearchComponent {

  constructor(private pizzaService:PizzaService){}

  example?:Pizza={}
  pizze?:Pizza[]

  searchPizza(searchForm:NgForm){
    console.log(this.example)
  this.pizzaService.searchPizza(this.example!).subscribe({
    next: pizzaItem => {
      this.pizze = pizzaItem;
    },
  });
  }

  ripulisciRisultati(){
    this.pizze=[]
  }

}
