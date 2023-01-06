import { ActivatedRoute, Router } from '@angular/router';
import { OrdineService } from './../ordine.service';
import { Ordine } from './../../../model/ordine';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordine-delete',
  templateUrl: './ordine-delete.component.html',
  styleUrls: ['./ordine-delete.component.css']
})
export class OrdineDeleteComponent implements OnInit{
  ordine?: Ordine
  errorMessage: string = '';

  constructor(private ordineService:OrdineService,
    private route:ActivatedRoute,
    private router:Router){}

  ngOnInit(): void {
    let idOrdine = Number(this.route.snapshot.paramMap.get('id'));
    this.ordineService.getOrdine(idOrdine).subscribe((ordineItem => {
      this.ordine = ordineItem;
    }))
  }

  deleteOrdine() {
    this.ordineService.deleteOrdine(this.ordine?.id!).subscribe()
    this.router.navigate(["ordine/list"])
  }


}
