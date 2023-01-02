import { ActivatedRoute } from '@angular/router';
import { PizzaService } from './../pizza.service';
import { Pizza } from './../../../model/pizza';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit{

  pizze?: Pizza[];
  sub?: Subscription;
  confirmMessage: string = '';

  constructor(private pizzaService:PizzaService,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.sub = this.pizzaService.getPizze().subscribe(pizzaListItem => this.pizze = pizzaListItem);

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
