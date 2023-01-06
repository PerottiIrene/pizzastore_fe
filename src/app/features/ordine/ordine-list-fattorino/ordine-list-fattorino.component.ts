import { ActivatedRoute } from '@angular/router';
import { OrdineService } from './../ordine.service';
import { Component, OnInit } from '@angular/core';
import { Ordine } from 'src/app/model/ordine';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ordine-list-fattorino',
  templateUrl: './ordine-list-fattorino.component.html',
  styleUrls: ['./ordine-list-fattorino.component.css']
})
export class OrdineListFattorinoComponent implements OnInit{

  ordini?: Ordine[];
  sub?: Subscription;
  confirmMessage: string = '';

  constructor(private ordineService:OrdineService,
    private route:ActivatedRoute){}

  ngOnInit(): void {
    this.sub = this.ordineService.ordiniByfattorino().subscribe(ordineListItem => this.ordini = ordineListItem);

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
