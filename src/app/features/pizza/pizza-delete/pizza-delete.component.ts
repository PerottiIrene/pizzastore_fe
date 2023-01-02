import { ActivatedRoute, Router } from '@angular/router';
import { PizzaService } from './../pizza.service';
import { Pizza } from './../../../model/pizza';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pizza-delete',
  templateUrl: './pizza-delete.component.html',
  styleUrls: ['./pizza-delete.component.css']
})
export class PizzaDeleteComponent implements OnInit{
  pizza?: Pizza
  errorMessage: string = '';

  constructor(private pizzaService:PizzaService,
    private route:ActivatedRoute,
    private router:Router){}

  ngOnInit(): void {
    let idPizza = Number(this.route.snapshot.paramMap.get('id'));
    this.pizzaService.getPizza(idPizza).subscribe((pizzaItem => {
      this.pizza = pizzaItem;
    }))
  }

  deletePizza() {
    this.pizzaService.deletePizza(this.pizza?.id!).subscribe()
    this.router.navigate(["pizza/list"])
}

}
