import { Ordine } from './../../../model/ordine';
import { OrdineService } from './../ordine.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ordine-detail',
  templateUrl: './ordine-detail.component.html',
  styleUrls: ['./ordine-detail.component.css']
})
export class OrdineDetailComponent implements OnInit{
  
  constructor(private route: ActivatedRoute, 
    private ordineService: OrdineService,
    private router: Router) { }

  selectedOrdine?: Ordine;
  errorMessage: string = '';
  confirmMessage: string = '';

  ngOnInit(): void {
    let idParam = Number(this.route.snapshot.paramMap.get('id'));
    this.ordineService.getOrdine(idParam).subscribe({
      next: ordineItem => {
        this.selectedOrdine = ordineItem;
        console.log(JSON.stringify(ordineItem))
        console.log(JSON.stringify(ordineItem.cliente?.id))
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
