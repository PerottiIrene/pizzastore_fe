import { ActivatedRoute } from '@angular/router';
import { PizzaService } from './../pizza.service';
import { Pizza } from './../../../model/pizza';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pizza-detail',
  templateUrl: './pizza-detail.component.html',
  styleUrls: ['./pizza-detail.component.css']
})
export class PizzaDetailComponent implements OnInit{

  constructor(private pizzaService:PizzaService,private route:ActivatedRoute){}

selectedPizza?: Pizza;
errorMessage: string = '';
confirmMessage: string = '';

  ngOnInit(): void {
    let idParam = Number(this.route.snapshot.paramMap.get('id'));
    this.pizzaService.getPizza(idParam).subscribe({
      next: clienteItem => {
        this.selectedPizza = clienteItem;
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
