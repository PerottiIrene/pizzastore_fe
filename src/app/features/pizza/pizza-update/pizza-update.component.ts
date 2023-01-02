import { PizzaService } from './../pizza.service';
import { Pizza } from './../../../model/pizza';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pizza-update',
  templateUrl: './pizza-update.component.html',
  styleUrls: ['./pizza-update.component.css']
})
export class PizzaUpdateComponent implements OnInit{
  pizza!:Pizza
  errorMessage:string=''

constructor(private pizzaService:PizzaService,private route:ActivatedRoute,private router:Router){}

  ngOnInit(): void {
    let idPizza=Number(this.route.snapshot.paramMap.get('id'));
    this.pizzaService.getPizza(idPizza).subscribe((pizzaItem : Pizza) => {
      this.pizza = pizzaItem;
  })
  }

  updatePizza(pizzaForm:NgForm){
    if (pizzaForm.valid){
        this.pizzaService.updatePizza(this.pizza).subscribe(
          pizzaItem => {
          console.log('modificato ' + JSON.stringify(pizzaItem));
          this.pizza = pizzaItem;
        },
        
        err => this.errorMessage = err,
        () => this.router.navigate([`/pizza/list`], { queryParams: { confirmMessage: 'Operazione effettuata correttamente.' } })
      );
    } else {
      this.errorMessage = 'Attenzione! Operazione fallita! Il form non è stato validato'
    }
  }

}
