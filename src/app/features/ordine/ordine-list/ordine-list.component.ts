import { ActivatedRoute } from '@angular/router';
import { OrdineService } from './../ordine.service';
import { Ordine } from './../../../model/ordine';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ordine-list',
  templateUrl: './ordine-list.component.html',
  styleUrls: ['./ordine-list.component.css']
})
export class OrdineListComponent implements OnInit{

  ordini?: Ordine[];
  sub?: Subscription;
  confirmMessage: string = '';

  constructor(private ordineService:OrdineService,
    private route:ActivatedRoute){}

  ngOnInit(): void {
    this.sub = this.ordineService.getOrdini().subscribe(ordineListItem => this.ordini = ordineListItem);

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
